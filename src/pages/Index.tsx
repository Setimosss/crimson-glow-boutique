import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import ScrollProgress from "@/components/ScrollProgress";
import HeroSection from "@/components/sections/HeroSection";
import MarqueeBanner from "@/components/sections/MarqueeBanner";
import FeaturesSection from "@/components/sections/FeaturesSection";
import ProductsSection from "@/components/sections/ProductsSection";
import LookbookSection from "@/components/sections/LookbookSection";
import StatsCounter from "@/components/sections/StatsCounter";
import AboutSection from "@/components/sections/AboutSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import InstagramSection from "@/components/sections/InstagramSection";
import NewsletterSection from "@/components/sections/NewsletterSection";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <ScrollProgress />
      <AnimatedBackground />
      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />
          <MarqueeBanner />
          <FeaturesSection />
          <ProductsSection />
          <LookbookSection />
          <StatsCounter />
          <AboutSection />
          <TestimonialsSection />
          <InstagramSection />
          <NewsletterSection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
