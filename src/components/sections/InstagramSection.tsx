import { Instagram } from "lucide-react";
import { motion } from "framer-motion";

// Using the actual Instagram post image from @_tread.trendz_
const postImage = "/images/insta-post.jpg";

const InstagramSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <a 
            href="https://www.instagram.com/_tread.trendz_/" 
            target="_blank" 
            rel="noopener noreferrer nofollow"
            className="inline-flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
          >
            <Instagram className="w-6 h-6" />
            <span className="text-2xl font-bold tracking-wide">@_tread.trendz_</span>
          </a>
          <p className="text-muted-foreground mt-2">Segue-nos para mais inspiração</p>
        </motion.div>
      </div>

      {/* Full-width Instagram Grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-3 md:grid-cols-6 gap-1"
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <motion.a 
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            href="https://www.instagram.com/_tread.trendz_/"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="relative aspect-square overflow-hidden group"
          >
            <img 
              src={postImage} 
              alt={`Tread Trendz Instagram`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500 flex items-center justify-center">
              <Instagram className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75 group-hover:scale-100" />
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
};

export default InstagramSection;
