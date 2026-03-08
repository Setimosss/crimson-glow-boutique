import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailPayload {
  type: "confirmation" | "status_update" | "tracking";
  orderId: string;
  customerEmail: string;
  customerName: string;
  orderTotal?: number;
  status?: string;
  trackingNumber?: string;
  items?: Array<{ name: string; quantity: number; price: number; size?: string; color?: string }>;
}

const statusLabels: Record<string, string> = {
  pending: "Pendente",
  confirmed: "Confirmado",
  processing: "Em Preparação",
  shipped: "Enviado",
  delivered: "Entregue",
  cancelled: "Cancelado",
};

function buildConfirmationEmail(payload: EmailPayload): string {
  const itemsHtml = payload.items
    ?.map(
      (item) =>
        `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;">${item.name}${item.size ? ` (${item.size})` : ""}${item.color ? ` - ${item.color}` : ""}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center;">${item.quantity}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right;">€${(item.price * item.quantity).toFixed(2)}</td>
        </tr>`
    )
    .join("") || "";

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#000;color:#fff;border-radius:12px;overflow:hidden;">
      <div style="background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:32px;text-align:center;">
        <h1 style="margin:0;font-size:24px;color:#fff;">✅ Encomenda Confirmada!</h1>
        <p style="margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:14px;">Obrigado pela tua compra, ${payload.customerName}!</p>
      </div>
      <div style="padding:24px;">
        <p style="color:#aaa;font-size:13px;margin:0 0 16px;">Encomenda #${payload.orderId.slice(0, 8).toUpperCase()}</p>
        <table style="width:100%;border-collapse:collapse;color:#fff;font-size:14px;">
          <thead>
            <tr style="border-bottom:2px solid #333;">
              <th style="padding:8px 12px;text-align:left;color:#aaa;">Produto</th>
              <th style="padding:8px 12px;text-align:center;color:#aaa;">Qtd</th>
              <th style="padding:8px 12px;text-align:right;color:#aaa;">Preço</th>
            </tr>
          </thead>
          <tbody>${itemsHtml}</tbody>
        </table>
        <div style="border-top:2px solid #333;margin-top:16px;padding-top:16px;text-align:right;">
          <p style="font-size:20px;font-weight:bold;color:#8b5cf6;margin:0;">Total: €${payload.orderTotal?.toFixed(2)}</p>
        </div>
        <p style="color:#aaa;font-size:13px;margin-top:24px;text-align:center;">
          Receberás atualizações sobre o estado da tua encomenda neste email.
        </p>
      </div>
    </div>`;
}

function buildStatusUpdateEmail(payload: EmailPayload): string {
  const statusLabel = statusLabels[payload.status || ""] || payload.status;
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#000;color:#fff;border-radius:12px;overflow:hidden;">
      <div style="background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:32px;text-align:center;">
        <h1 style="margin:0;font-size:24px;color:#fff;">📦 Atualização da Encomenda</h1>
      </div>
      <div style="padding:24px;text-align:center;">
        <p style="color:#aaa;font-size:13px;">Encomenda #${payload.orderId.slice(0, 8).toUpperCase()}</p>
        <p style="font-size:14px;color:#fff;margin:16px 0;">Olá ${payload.customerName},</p>
        <p style="font-size:16px;color:#fff;">O estado da tua encomenda foi atualizado para:</p>
        <div style="display:inline-block;background:#8b5cf6;color:#fff;padding:12px 24px;border-radius:8px;font-size:18px;font-weight:bold;margin:16px 0;">
          ${statusLabel}
        </div>
        <p style="color:#aaa;font-size:13px;margin-top:24px;">Qualquer questão, responde a este email.</p>
      </div>
    </div>`;
}

function buildTrackingEmail(payload: EmailPayload): string {
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#000;color:#fff;border-radius:12px;overflow:hidden;">
      <div style="background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:32px;text-align:center;">
        <h1 style="margin:0;font-size:24px;color:#fff;">🚚 A tua encomenda foi enviada!</h1>
      </div>
      <div style="padding:24px;text-align:center;">
        <p style="color:#aaa;font-size:13px;">Encomenda #${payload.orderId.slice(0, 8).toUpperCase()}</p>
        <p style="font-size:14px;color:#fff;margin:16px 0;">Olá ${payload.customerName},</p>
        <p style="font-size:16px;color:#fff;">A tua encomenda já foi expedida! Aqui está o código de rastreio:</p>
        <div style="background:#111;border:1px solid #333;border-radius:8px;padding:16px;margin:16px 0;">
          <p style="font-size:22px;font-weight:bold;color:#8b5cf6;letter-spacing:2px;margin:0;">${payload.trackingNumber}</p>
        </div>
        <p style="color:#aaa;font-size:13px;">
          Podes acompanhar a encomenda em <a href="https://www.ctt.pt/feapl_2/app/open/cttexpresso/objectSearch/objectSearch.jspx" style="color:#8b5cf6;">CTT Expresso</a> 
          ou na transportadora correspondente.
        </p>
      </div>
    </div>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY not configured");
    }

    const payload: EmailPayload = await req.json();
    
    let subject: string;
    let html: string;

    switch (payload.type) {
      case "confirmation":
        subject = `✅ Encomenda #${payload.orderId.slice(0, 8).toUpperCase()} Confirmada!`;
        html = buildConfirmationEmail(payload);
        break;
      case "status_update":
        subject = `📦 Encomenda #${payload.orderId.slice(0, 8).toUpperCase()} - ${statusLabels[payload.status || ""] || payload.status}`;
        html = buildStatusUpdateEmail(payload);
        break;
      case "tracking":
        subject = `🚚 Código de rastreio - Encomenda #${payload.orderId.slice(0, 8).toUpperCase()}`;
        html = buildTrackingEmail(payload);
        break;
      default:
        throw new Error("Invalid email type");
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Loja <onboarding@resend.dev>",
        to: [payload.customerEmail],
        subject,
        html,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.warn("Resend error (non-critical):", data);
      // Return 200 with warning instead of 500 — email delivery is non-critical
      return new Response(JSON.stringify({ success: false, warning: data.message || "Email not sent", data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Email error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
