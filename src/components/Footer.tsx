
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-elvis-navy py-10 text-elvis-cream">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="font-playfair text-2xl font-bold text-elvis-gold">The Presley Legacy</h2>
            <p className="mt-2 text-sm opacity-70">
              Celebrating the enduring legacy of the Presley family
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <button 
              onClick={scrollToTop}
              className="mb-4 bg-elvis-gold bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp size={20} className="text-elvis-gold" />
            </button>
            <p className="text-sm opacity-70">
              © {new Date().getFullYear()} Presley Family Tribute
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-elvis-gold border-opacity-20 text-center">
          <p className="text-sm opacity-70">
            "Elvis has left the building, but his legacy lives on forever."
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
