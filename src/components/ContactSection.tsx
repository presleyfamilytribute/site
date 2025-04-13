
import ElvisQuote from './contact/ElvisQuote';
import ContactForm from './contact/ContactForm';
import { motion } from 'framer-motion';

const ContactSection = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-elvis-navy/80 to-black text-elvis-cream relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-elvis-gold/30 to-transparent"></div>
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-elvis-gold/5 blur-2xl"></div>
      <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-elvis-gold/5 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          className="text-center"
        >
          <motion.h2 
            variants={fadeIn}
            className="font-playfair text-4xl md:text-5xl font-bold text-elvis-gold mb-3"
          >
            Contact Us
          </motion.h2>
          <motion.p 
            variants={fadeIn}
            className="text-center font-medium mb-8 max-w-2xl mx-auto"
          >
            Share your thoughts or inquiries about the Presley legacy. We value your connection to this timeless musical heritage.
          </motion.p>
        </motion.div>
        
        {/* Elvis Quote */}
        <ElvisQuote />
        
        {/* Contact Form */}
        <ContactForm />

        <motion.div 
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 text-center opacity-80"
        >
          <p className="flex items-center justify-center gap-2">
            <span className="text-elvis-gold">•</span>
            <span>presleyfamilytribute@gmail.com</span>
            <span className="text-elvis-gold">•</span>
          </p>
          <p className="mt-4 text-sm opacity-70">We aim to respond to all inquiries within 48 hours.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
