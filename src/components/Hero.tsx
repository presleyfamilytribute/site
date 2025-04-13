
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const scrollToSection = () => {
    const elvisSection = document.getElementById('elvis');
    if (elvisSection) {
      elvisSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center bg-elvis-navy overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
      
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?auto=format&fit=crop&q=80')" }}
      ></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-20 text-center">
        <h1 className="font-playfair font-bold text-5xl md:text-7xl mb-4 text-elvis-gold">
          The Presley Family
        </h1>
        <p className="font-roboto text-xl md:text-2xl max-w-2xl mx-auto text-elvis-cream mb-8">
          A lasting legacy in music, style, and American culture
        </p>
        <div className="inline-block p-1 border-2 border-elvis-gold rounded-full animate-pulse mt-8">
          <button 
            onClick={scrollToSection}
            className="text-elvis-cream hover:text-elvis-gold transition-colors"
            aria-label="Scroll down"
          >
            <ChevronDown size={32} />
          </button>
        </div>
      </div>
      
      {/* Decorative record element */}
      <div className="hidden lg:block absolute -bottom-32 -right-32 w-64 h-64 border-8 border-elvis-gold rounded-full animate-record-spin opacity-20 z-10"></div>
    </section>
  );
};

export default Hero;
