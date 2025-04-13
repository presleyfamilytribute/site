
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ElvisSection from '@/components/ElvisSection';
import FamilySection from '@/components/FamilySection';
import MusicSection from '@/components/MusicSection';
import TimelineSection from '@/components/TimelineSection';
import GallerySection from '@/components/GallerySection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    // Welcome notification
    toast({
      title: "Welcome to The Presley Legacy",
      description: "Explore the rich history of America's most iconic musical family.",
      duration: 5000,
    });
  }, [toast]);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-elvis-navy to-black text-elvis-cream overflow-hidden">
      <Header />
      <main>
        <Hero />
        <ElvisSection />
        <FamilySection />
        <MusicSection />
        <TimelineSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
