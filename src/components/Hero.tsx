
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const scrollToSection = () => {
    const elvisSection = document.getElementById('elvis');
    if (elvisSection) {
      elvisSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-elvis-navy/90 z-10"></div>
      
      {/* Background image with parallax effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 scale-110 transform"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?auto=format&fit=crop&q=80')",
          transform: "scale(1.1)",
        }}
      ></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-20 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          <motion.span 
            variants={fadeInUp}
            className="inline-block text-elvis-gold uppercase tracking-wider mb-2 font-medium"
          >
            A Musical Legacy
          </motion.span>
          
          <motion.h1 
            variants={fadeInUp}
            className="font-playfair font-bold text-5xl md:text-7xl lg:text-8xl mb-6 text-white"
          >
            The <span className="text-elvis-gold">Presley</span> Family
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="font-roboto text-xl md:text-2xl max-w-2xl mx-auto text-elvis-cream mb-8 leading-relaxed"
          >
            Celebrating a lasting legacy in music, style, and American culture that continues to inspire generations.
          </motion.p>
          
          <motion.div variants={fadeInUp}>
            <Button 
              onClick={scrollToSection}
              className="bg-elvis-gold hover:bg-elvis-gold/80 text-elvis-navy font-medium rounded-full px-8 py-6 transition-all duration-300"
            >
              Explore the Legacy
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-0 right-0 flex justify-center z-20"
      >
        <button 
          onClick={scrollToSection}
          className="text-elvis-cream hover:text-elvis-gold transition-colors focus:outline-none"
          aria-label="Scroll down"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown size={32} />
          </motion.div>
        </button>
      </motion.div>
      
      {/* Decorative elements */}
      <div className="hidden lg:block absolute -bottom-32 -right-32 w-64 h-64 border-8 border-elvis-gold rounded-full animate-record-spin opacity-20 z-10"></div>
      <div className="hidden lg:block absolute -top-20 -left-20 w-40 h-40 border-4 border-elvis-gold rounded-full animate-record-spin opacity-10 z-10" style={{ animationDirection: 'reverse', animationDuration: '15s' }}></div>
    </section>
  );
};

export default Hero;
