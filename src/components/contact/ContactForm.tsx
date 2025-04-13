
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, ShieldCheck } from 'lucide-react';
import { createRateLimiter, sanitizeInput } from '@/utils/security';
import ReCaptchaComponent from '../auth/ReCaptcha';

// Create a rate limiter for the contact form
const contactFormRateLimiter = createRateLimiter(3, 300000); // 3 attempts per 5 minutes

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const { toast } = useToast();

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Check if reCAPTCHA is completed
    if (!recaptchaToken) {
      toast({
        variant: "destructive",
        title: "Please complete the CAPTCHA",
        description: "We need to verify that you're not a robot."
      });
      return;
    }
    
    // Rate limiting check
    if (!contactFormRateLimiter('form-submission')) {
      toast({
        variant: "destructive",
        title: "Too many attempts",
        description: "Please wait a few minutes before sending another message."
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Sanitize inputs to prevent XSS
      const sanitizedData = {
        name: sanitizeInput(name),
        email: sanitizeInput(email),
        subject: sanitizeInput(subject),
        message: sanitizeInput(message),
        recaptchaToken
      };
      
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: sanitizedData
      });

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "Thank you for contacting us. We'll respond shortly."
      });

      // Reset form
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setRecaptchaToken(null);
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Message failed to send",
        description: error.message || "There was an error sending your message. Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-elvis-navy/30 p-6 md:p-8 rounded-lg shadow-xl border border-elvis-gold/20">
        <div className="flex items-center justify-center md:col-span-2 mb-2">
          <ShieldCheck className="text-elvis-gold mr-2" size={24} />
          <span className="font-medium text-elvis-gold">Secured by reCAPTCHA</span>
        </div>
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="bg-elvis-navy/40 border-elvis-gold/30 text-elvis-cream placeholder:text-elvis-cream/50 focus:border-elvis-gold"
            placeholder="Your name"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-elvis-navy/40 border-elvis-gold/30 text-elvis-cream placeholder:text-elvis-cream/50 focus:border-elvis-gold"
            placeholder="Your email"
          />
        </div>
        
        <div className="md:col-span-2">
          <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
          <Input
            id="subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="bg-elvis-navy/40 border-elvis-gold/30 text-elvis-cream placeholder:text-elvis-cream/50 focus:border-elvis-gold"
            placeholder="Message subject"
          />
        </div>
        
        <div className="md:col-span-2">
          <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={5}
            className="w-full rounded-md border border-elvis-gold/30 bg-elvis-navy/40 p-3 text-elvis-cream placeholder:text-elvis-cream/50 focus:border-elvis-gold focus:outline-none"
            placeholder="Your message"
          />
        </div>
        
        <div className="md:col-span-2 flex justify-center">
          <ReCaptchaComponent onChange={handleRecaptchaChange} />
        </div>
        
        <div className="md:col-span-2 flex justify-center">
          <Button 
            type="submit" 
            disabled={isSubmitting || !recaptchaToken}
            className="bg-elvis-gold hover:bg-elvis-gold/90 text-elvis-navy font-medium rounded-md px-8 py-3"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
              </>
            ) : (
              "Send Message"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
