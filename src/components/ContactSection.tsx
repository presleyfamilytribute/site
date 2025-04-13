
import ElvisQuote from './contact/ElvisQuote';
import ContactForm from './contact/ContactForm';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-elvis-navy text-elvis-cream">
      <div className="container mx-auto px-4">
        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-elvis-gold text-center mb-3">
          Contact Us
        </h2>
        <p className="text-center font-medium mb-4">Share your thoughts or inquiries about the Presley legacy</p>
        
        {/* Elvis Quote */}
        <ElvisQuote />
        
        {/* Contact Form */}
        <ContactForm />

        <div className="mt-12 text-center opacity-70">
          <p>You can also reach us at: <span className="text-elvis-gold">presleyfamilytribute@yahoo.com</span></p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
