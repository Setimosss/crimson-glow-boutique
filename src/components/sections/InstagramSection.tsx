import { Instagram } from "lucide-react";

const posts = [
  "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop"
];

const InstagramSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
          >
            <Instagram className="w-6 h-6" />
            <span className="text-2xl font-bold tracking-wide">@BRANDX</span>
          </a>
          <p className="text-muted-foreground mt-2">Segue-nos para mais inspiração</p>
        </div>
      </div>

      {/* Full-width Instagram Grid */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-1">
        {posts.map((post, index) => (
          <a 
            key={index}
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="relative aspect-square overflow-hidden group"
          >
            <img 
              src={post} 
              alt={`Instagram post ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center">
              <Instagram className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default InstagramSection;
