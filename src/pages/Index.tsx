 import Header from "@/components/layout/Header";
 import Footer from "@/components/layout/Footer";
 import AnimatedBackground from "@/components/AnimatedBackground";
 import HeroSection from "@/components/sections/HeroSection";
 import ProductsSection from "@/components/sections/ProductsSection";
 import FeaturesSection from "@/components/sections/FeaturesSection";
 import AboutSection from "@/components/sections/AboutSection";
 import TestimonialsSection from "@/components/sections/TestimonialsSection";
 import InstagramSection from "@/components/sections/InstagramSection";
 import NewsletterSection from "@/components/sections/NewsletterSection";
 
 const Index = () => {
   return (
     <div className="min-h-screen relative">
       <AnimatedBackground />
       <div className="relative z-10">
         <Header />
         <main>
           <HeroSection />
           <FeaturesSection />
           <ProductsSection />
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
