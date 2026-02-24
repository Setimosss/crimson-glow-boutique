import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// In-memory rate limiter (per IP, 5 requests per minute)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;

// In-memory payment token store (paymentIntentId -> token)
// Tokens are used to verify ownership when checking payment status
const paymentTokens = new Map<string, { token: string; createdAt: number }>();
const TOKEN_TTL_MS = 10 * 60 * 1000; // 10 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

function generateToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
}

// Cleanup expired tokens periodically
function cleanupTokens() {
  const now = Date.now();
  for (const [key, val] of paymentTokens) {
    if (now - val.createdAt > TOKEN_TTL_MS) {
      paymentTokens.delete(key);
    }
  }
}

// Export for use by check-payment-status (shared via globalThis)
(globalThis as any).__paymentTokens = paymentTokens;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(clientIp)) {
      return new Response(
        JSON.stringify({ error: "Demasiados pedidos. Tenta novamente em breve." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY not configured");
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
      httpClient: Stripe.createFetchHttpClient(),
    });

    const { amount, phone } = await req.json();

    if (!amount || !phone) {
      return new Response(
        JSON.stringify({ error: "amount and phone are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate phone number
    const phoneStr = String(phone).replace(/\s/g, "");
    const phoneRegex = /^(91|92|93|96)\d{7}$/;
    if (!phoneRegex.test(phoneStr)) {
      return new Response(
        JSON.stringify({ error: "Número de telemóvel inválido. Deve ter 9 dígitos e começar por 91, 92, 93 ou 96." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate amount
    if (typeof amount !== "number" || amount <= 0 || amount > 999999) {
      return new Response(
        JSON.stringify({ error: "Valor inválido." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "eur",
      payment_method_types: ["mb_way"],
      payment_method_data: {
        type: "mb_way",
        billing_details: {
          phone: `+351${phoneStr}`,
        },
      },
      confirm: true,
    });

    // Generate a session token for this payment
    const sessionToken = generateToken();
    cleanupTokens();
    paymentTokens.set(paymentIntent.id, { token: sessionToken, createdAt: Date.now() });

    return new Response(
      JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        status: paymentIntent.status,
        id: paymentIntent.id,
        sessionToken,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Payment creation failed");
    const message = error instanceof Error ? error.message : "Erro interno";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
