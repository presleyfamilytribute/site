
import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

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

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled 
          ? "bg-elvis-navy bg-opacity-95 shadow-md py-2" 
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl md:text-3xl font-playfair font-bold text-elvis-gold">
              The Presley Legacy
            </h1>
          </div>
          
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li><a href="#elvis" className="text-elvis-cream hover:text-elvis-gold transition-colors">Elvis</a></li>
              <li><a href="#family" className="text-elvis-cream hover:text-elvis-gold transition-colors">Family</a></li>
              <li><a href="#music" className="text-elvis-cream hover:text-elvis-gold transition-colors">Music</a></li>
              <li><a href="#timeline" className="text-elvis-cream hover:text-elvis-gold transition-colors">Timeline</a></li>
              <li><a href="#gallery" className="text-elvis-cream hover:text-elvis-gold transition-colors">Gallery</a></li>
            </ul>
          </nav>
          
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden text-elvis-cream"
          >
            <Menu size={24} />
          </button>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <ul className="flex flex-col space-y-4">
              <li><a href="#elvis" className="block text-elvis-cream hover:text-elvis-gold transition-colors">Elvis</a></li>
              <li><a href="#family" className="block text-elvis-cream hover:text-elvis-gold transition-colors">Family</a></li>
              <li><a href="#music" className="block text-elvis-cream hover:text-elvis-gold transition-colors">Music</a></li>
              <li><a href="#timeline" className="block text-elvis-cream hover:text-elvis-gold transition-colors">Timeline</a></li>
              <li><a href="#gallery" className="block text-elvis-cream hover:text-elvis-gold transition-colors">Gallery</a></li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
