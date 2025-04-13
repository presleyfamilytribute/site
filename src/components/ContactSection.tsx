
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription } from '@/components/ui/alert-dialog';
import { createRateLimiter } from '@/utils/security';

// Create a rate limiter instance (5 submissions per 2 minutes)
const checkRateLimit = createRateLimiter(5, 120000);

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }).max(50),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }).max(500)
});

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSecurityDialog, setShowSecurityDialog] = useState(false);
  
  // Generate a simple identifier based on browser data for rate limiting
  const getIdentifier = () => {
    return `${window.navigator.userAgent.slice(0, 20)}-${window.screen.width}`;
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Check for rate limiting
    const identifier = getIdentifier();
    if (!checkRateLimit(identifier)) {
      setShowSecurityDialog(true);
      setIsSubmitting(false);
      return;
    }

    // Add small delay to simulate sending
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Here you would typically send the form data to a server
    console.log('Form submitted with values:', values);
    
    toast({
      title: 'Message sent!',
      description: 'Thank you for your message. We will get back to you soon.',
      duration: 5000
    });
    
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-20 bg-elvis-navy text-elvis-cream">
      <div className="container mx-auto px-4">
        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-elvis-gold text-center mb-3">
          Contact Us
        </h2>
        <p className="text-center font-medium mb-12">Share your thoughts or inquiries about the Presley legacy</p>
        
        <div className="max-w-2xl mx-auto bg-elvis-navy/50 p-8 rounded-lg shadow-xl border border-elvis-gold/20">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-elvis-cream">Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your name" 
                          className="bg-elvis-navy/30 border-elvis-gold/30 text-elvis-cream" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-elvis-cream">Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="youremail@example.com" 
                          className="bg-elvis-navy/30 border-elvis-gold/30 text-elvis-cream" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-elvis-cream">Subject</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Subject of your message" 
                        className="bg-elvis-navy/30 border-elvis-gold/30 text-elvis-cream" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-elvis-cream">Message</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Your message..." 
                        className="bg-elvis-navy/30 border-elvis-gold/30 text-elvis-cream min-h-[150px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-2">
                <Button 
                  type="submit" 
                  className="w-full bg-elvis-gold hover:bg-elvis-gold/80 text-elvis-navy font-medium"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
            </form>
          </Form>
        </div>

        <div className="mt-12 text-center opacity-70">
          <p>You can also reach us at: <span className="text-elvis-gold">contact@presleyfamily.example</span></p>
        </div>
      </div>
      
      {/* Security Alert Dialog */}
      <AlertDialog open={showSecurityDialog} onOpenChange={setShowSecurityDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Rate Limit Exceeded</AlertDialogTitle>
            <AlertDialogDescription>
              Too many form submissions detected. Please wait a few minutes before trying again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end mt-4">
            <Button variant="outline" onClick={() => setShowSecurityDialog(false)}>
              Close
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default ContactSection;
