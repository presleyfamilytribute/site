
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserMenu from './auth/UserMenu';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-sm py-2 shadow-lg'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="font-playfair text-xl md:text-2xl font-bold text-elvis-gold">
          The Presley Legacy
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#elvis" className="text-elvis-cream hover:text-elvis-gold transition-colors">
            Elvis
          </a>
          <a href="#family" className="text-elvis-cream hover:text-elvis-gold transition-colors">
            Family
          </a>
          <a href="#music" className="text-elvis-cream hover:text-elvis-gold transition-colors">
            Music
          </a>
          <a href="#timeline" className="text-elvis-cream hover:text-elvis-gold transition-colors">
            Timeline
          </a>
          <a href="#contact" className="text-elvis-cream hover:text-elvis-gold transition-colors">
            Contact
          </a>
          <UserMenu />
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <UserMenu />
          <button
            onClick={toggleMobileMenu}
            className="text-elvis-cream focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
              <a
                href="#elvis"
                className="text-elvis-cream hover:text-elvis-gold transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Elvis
              </a>
              <a
                href="#family"
                className="text-elvis-cream hover:text-elvis-gold transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Family
              </a>
              <a
                href="#music"
                className="text-elvis-cream hover:text-elvis-gold transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Music
              </a>
              <a
                href="#timeline"
                className="text-elvis-cream hover:text-elvis-gold transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Timeline
              </a>
              <a
                href="#contact"
                className="text-elvis-cream hover:text-elvis-gold transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
