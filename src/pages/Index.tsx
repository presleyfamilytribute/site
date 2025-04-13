
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ElvisSection from '@/components/ElvisSection';
import FamilySection from '@/components/FamilySection';
import MusicSection from '@/components/MusicSection';
import TimelineSection from '@/components/TimelineSection';
import GallerySection from '@/components/GallerySection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <ElvisSection />
      <FamilySection />
      <MusicSection />
      <TimelineSection />
      <GallerySection />
      <Footer />
    </div>
  );
};

export default Index;
