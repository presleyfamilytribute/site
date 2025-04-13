
import { useState, useEffect } from 'react';
import { getRandomQuote } from '@/utils/quotes';

const ElvisQuote = () => {
  const [quote, setQuote] = useState("");
  
  // Get random Elvis quote on component mount
  useEffect(() => {
    setQuote(getRandomQuote());
  }, []);

  return (
    <div className="max-w-2xl mx-auto mb-8 text-center">
      <blockquote className="italic text-elvis-gold border-l-4 pl-4 py-2 border-elvis-gold/30">
        "{quote}"
        <footer className="text-right text-elvis-cream mt-2">— Elvis Presley</footer>
      </blockquote>
    </div>
  );
};

export default ElvisQuote;
