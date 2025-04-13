
import { useState, useEffect } from 'react';
import { getRandomQuote } from '@/utils/quotes';
import { motion } from 'framer-motion';

const ElvisQuote = () => {
  const [quote, setQuote] = useState("");
  
  // Get random Elvis quote on component mount
  useEffect(() => {
    setQuote(getRandomQuote());
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto mb-10 text-center"
    >
      <blockquote className="italic text-elvis-gold border-l-4 pl-6 py-4 border-elvis-gold/30">
        <span className="text-4xl leading-none font-serif text-elvis-gold/20 absolute -left-2 -top-2">"</span>
        <p className="text-xl md:text-2xl relative">"{quote}"</p>
        <footer className="text-right text-elvis-cream/80 mt-4 font-medium">— Elvis Presley</footer>
      </blockquote>
    </motion.div>
  );
};

export default ElvisQuote;
