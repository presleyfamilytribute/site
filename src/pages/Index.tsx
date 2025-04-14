
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ElvisSection from '@/components/ElvisSection';
import FamilySection from '@/components/FamilySection';
import MusicSection from '@/components/MusicSection';
import TimelineSection from '@/components/TimelineSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { useToast } from "@/hooks/use-toast";
import { trackVisit } from '@/utils/security';

const Index = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    // Track the visit without bot detection
    trackVisit();
    
    // Simple welcome notification
    toast({
      title: "Welcome to The Presley Legacy",
      description: "Explore the rich history of America's most iconic musical family.",
      duration: 5000,
    });

    // Add smooth scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href') || '');
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  }, [toast]);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-elvis-navy/90 to-black text-elvis-cream overflow-hidden">
      <Header />
      <main>
        <Hero />
        <ElvisSection />
        <FamilySection />
        <MusicSection />
        <TimelineSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
