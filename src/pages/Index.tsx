import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ProductsSection from "@/components/sections/ProductsSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import NewsletterSection from "@/components/sections/NewsletterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-radial">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ProductsSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
