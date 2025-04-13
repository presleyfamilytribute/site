
import { useState, useEffect } from 'react';
import { Menu, X, Music } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const menuItems = [
    { name: "Elvis", href: "#elvis" },
    { name: "Family", href: "#family" },
    { name: "Music", href: "#music" },
    { name: "Timeline", href: "#timeline" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" }
  ];

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled 
          ? "bg-elvis-navy bg-opacity-95 shadow-lg py-2" 
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Music className="text-elvis-gold mr-2" size={24} />
            <h1 className="text-2xl md:text-3xl font-playfair font-bold">
              <span className="text-elvis-gold">The</span> <span className="text-elvis-cream">Presley Legacy</span>
            </h1>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Button 
                    variant="ghost" 
                    className="text-elvis-cream hover:text-elvis-gold hover:bg-transparent focus:bg-transparent transition-colors"
                    onClick={() => scrollToSection(item.href)}
                  >
                    {item.name}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Mobile menu button */}
          <Button 
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden text-elvis-cream hover:text-elvis-gold hover:bg-transparent"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
        
        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden mt-4 pb-4"
            >
              <ul className="flex flex-col space-y-3 bg-elvis-navy bg-opacity-95 p-4 rounded-lg">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <Button 
                      variant="ghost" 
                      className="w-full text-left justify-start text-elvis-cream hover:text-elvis-gold hover:bg-elvis-navy/30"
                      onClick={() => scrollToSection(item.href)}
                    >
                      {item.name}
                    </Button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
