
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Mail, MapPin, Phone } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message received",
        description: "Thank you for your interest in the Presley legacy. We'll be in touch soon.",
      });
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-elvis-navy bg-opacity-80">
      <div className="container mx-auto px-4">
        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-elvis-gold text-center mb-3">
          Get in Touch
        </h2>
        <p className="text-center text-elvis-cream font-medium mb-12 max-w-xl mx-auto">
          Have questions about the Presley legacy or want to share your story? We'd love to hear from you.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-elvis-cream bg-opacity-10 p-8 rounded-lg backdrop-blur-sm border border-elvis-gold border-opacity-20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-elvis-cream">Your Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-white bg-opacity-10 border-elvis-gold border-opacity-30 text-elvis-cream placeholder:text-elvis-cream placeholder:opacity-50"
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-elvis-cream">Email Address</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-white bg-opacity-10 border-elvis-gold border-opacity-30 text-elvis-cream placeholder:text-elvis-cream placeholder:opacity-50"
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message" className="text-elvis-cream">Your Message</Label>
                <Textarea 
                  id="message" 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-white bg-opacity-10 border-elvis-gold border-opacity-30 text-elvis-cream placeholder:text-elvis-cream placeholder:opacity-50 min-h-[120px]"
                  placeholder="Share your thoughts or questions about the Presley legacy..."
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-elvis-gold hover:bg-elvis-gold/80 text-elvis-navy font-medium transition-all duration-300"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
          
          <div className="flex flex-col justify-center">
            <div className="mb-8">
              <h3 className="font-playfair text-2xl font-bold text-elvis-gold mb-6">Visit Graceland</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="text-elvis-gold mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-elvis-cream">3764 Elvis Presley Blvd</p>
                    <p className="text-elvis-cream">Memphis, TN 38116</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="text-elvis-gold mr-4 mt-1 flex-shrink-0" />
                  <p className="text-elvis-cream">(901) 332-3322</p>
                </div>
                <div className="flex items-start">
                  <Mail className="text-elvis-gold mr-4 mt-1 flex-shrink-0" />
                  <p className="text-elvis-cream">info@graceland.com</p>
                </div>
              </div>
            </div>
            
            <div className="bg-elvis-gold p-6 rounded-lg transform rotate-2 shadow-xl">
              <p className="font-playfair text-elvis-navy text-xl italic">
                "Ambition is a dream with a V8 engine."
              </p>
              <p className="text-right mt-2 font-medium text-elvis-navy">— Elvis Presley</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
