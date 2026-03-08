import { motion } from "framer-motion";

const words = [
  "STREETWEAR",
  "•",
  "PREMIUM",
  "•",
  "CULTURA",
  "•",
  "ESTILO",
  "•",
  "TENDÊNCIA",
  "•",
  "EXCLUSIVO",
  "•",
  "URBANO",
  "•",
  "ATITUDE",
  "•",
];

const MarqueeBanner = () => {
  const repeatedWords = [...words, ...words, ...words];

  return (
    <section className="py-6 overflow-hidden border-y border-primary/10 bg-primary/[0.03]">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {repeatedWords.map((word, i) => (
          <span
            key={i}
            className={`text-sm md:text-base font-bold uppercase tracking-[0.3em] ${
              word === "•"
                ? "text-primary"
                : "text-foreground/20 hover:text-primary/60 transition-colors duration-500"
            }`}
          >
            {word}
          </span>
        ))}
      </motion.div>
    </section>
  );
};

export default MarqueeBanner;
