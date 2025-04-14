
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loadedImagesCount, setLoadedImagesCount] = useState(0);

  // Reliable Elvis Presley images with direct links
  const images = [
    {
      url: "https://i.ibb.co/wRBkdYK/elvis-jailhouse-rock.jpg",
      caption: "Elvis Presley promoting 'Jailhouse Rock' (1957)",
      alt: "Elvis Presley in a promotional photo for Jailhouse Rock",
      credit: "Metro-Goldwyn-Mayer, Public domain"
    },
    {
      url: "https://i.ibb.co/ZKpNHXN/elvis-priscilla-wedding.jpg",
      caption: "Elvis and Priscilla on their wedding day, May 1, 1967",
      alt: "Elvis and Priscilla Presley wedding photograph",
      credit: "Intercontinental Hotels Group, Public domain"
    },
    {
      url: "https://i.ibb.co/CbYKJPf/graceland.jpg",
      caption: "Graceland, Elvis Presley's mansion in Memphis, Tennessee",
      alt: "Front view of Graceland mansion",
      credit: "Public domain"
    },
    {
      url: "https://i.ibb.co/KL8HD97/lisa-marie-presley.jpg",
      caption: "Lisa Marie Presley (2010)",
      alt: "Lisa Marie Presley portrait",
      credit: "Public domain"
    },
    {
      url: "https://i.ibb.co/VYQqPdK/elvis-young-family.jpg", 
      caption: "Young Elvis with parents Vernon and Gladys Presley (1937)",
      alt: "Elvis Presley as a child with his parents",
      credit: "Public domain"
    },
    {
      url: "https://i.ibb.co/18WKZLT/elvis-performing.jpg",
      caption: "Elvis performing in 1970 during his comeback era",
      alt: "Elvis Presley performing in 1970",
      credit: "Public domain"
    }
  ];

  useEffect(() => {
    // Reset state on mount
    setLoadError(null);
    setIsLoading(true);
    setLoadedImagesCount(0);
    
    // Track visit using session storage
    try {
      const visitCount = parseInt(sessionStorage.getItem('galleryViews') || '0');
      sessionStorage.setItem('galleryViews', (visitCount + 1).toString());
    } catch (e) {
      // Session storage not available - silent fail
    }

    // Track individual image loading
    const totalImages = images.length;

    // Preload images with better error handling
    const imagePromises = images.map((image, index) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          console.log(`Gallery image loaded successfully: ${index + 1}/${totalImages}`);
          setLoadedImagesCount(prevCount => prevCount + 1);
          resolve(true);
        };
        img.onerror = () => {
          console.error(`Failed to load gallery image: ${index + 1}`);
          resolve(false);
        };
        img.src = image.url;
      });
    });

    Promise.all(imagePromises)
      .then(() => {
        console.log("All gallery image promises resolved");
        setIsLoading(false);
      })
      .catch(() => {
        setLoadError("Some images couldn't be loaded. Please try again later.");
        setIsLoading(false);
      });
  }, [images.length]);

  // Calculate loading progress
  const loadingProgress = images.length > 0 ? (loadedImagesCount / images.length) * 100 : 0;

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-black to-elvis-navy">
      <div className="container mx-auto px-4">
        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-elvis-gold text-center mb-3">
          Historical Gallery
        </h2>
        <p className="text-center text-elvis-cream font-medium mb-12 italic">Moments captured in time</p>
        
        {loadError && (
          <Alert variant="destructive" className="mb-8">
            <AlertDescription>{loadError}</AlertDescription>
          </Alert>
        )}

        {/* Featured carousel */}
        <div className="mb-16">
          <h3 className="text-2xl font-playfair text-elvis-cream mb-6 text-center">Featured Memories</h3>
          <Carousel className="max-w-3xl mx-auto">
            <CarouselContent>
              {images.slice(0, 3).map((image, index) => (
                <CarouselItem key={`carousel-${index}`}>
                  <AspectRatio ratio={16/9} className="bg-black">
                    {isLoading ? (
                      <Skeleton className="h-full w-full" />
                    ) : (
                      <img 
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-contain"
                        onClick={() => setSelectedImage(image.url)}
                      />
                    )}
                  </AspectRatio>
                  <p className="text-elvis-cream text-center mt-2">{image.caption}</p>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-1 bg-elvis-gold/20 text-elvis-cream hover:bg-elvis-gold/40" />
            <CarouselNext className="right-1 bg-elvis-gold/20 text-elvis-cream hover:bg-elvis-gold/40" />
          </Carousel>
        </div>
        
        <h3 className="text-2xl font-playfair text-elvis-cream mb-6 text-center">Full Collection</h3>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, index) => (
              <div key={index} className="h-64 rounded-lg overflow-hidden">
                <Skeleton className="h-full w-full" />
                <div className="h-6 mt-2">
                  <Skeleton className="h-full w-3/4 mx-auto" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <div 
                key={index}
                className="relative overflow-hidden rounded-lg shadow-md cursor-pointer group"
                onClick={() => setSelectedImage(image.url)}
              >
                <AspectRatio ratio={4/3} className="h-64">
                  <img 
                    src={image.url} 
                    alt={image.alt} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      console.error(`Gallery image failed to render: ${index + 1}`);
                      e.currentTarget.src = "https://placehold.co/600x400/e2e8f0/64748b?text=Elvis+Gallery";
                    }}
                  />
                </AspectRatio>
                <div className="absolute inset-0 bg-elvis-navy bg-opacity-0 group-hover:bg-opacity-60 transition-opacity flex items-end">
                  <div className="p-4 w-full transform translate-y-full group-hover:translate-y-0 transition-transform">
                    <p className="text-white text-sm font-medium">{image.caption}</p>
                    <p className="text-white/70 text-xs mt-1">Credit: {image.credit}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Lightbox */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50">
            <button 
              className="absolute top-4 right-4 text-white hover:text-elvis-gold transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            <div className="max-w-4xl max-h-screen p-4">
              <img 
                src={selectedImage} 
                alt="Enlarged view" 
                className="max-w-full max-h-[80vh] object-contain"
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/800x600/e2e8f0/64748b?text=Image+unavailable";
                }}
              />
              <p className="text-white text-center mt-4">
                {images.find(img => img.url === selectedImage)?.caption}
              </p>
              <p className="text-white/70 text-center text-xs mt-1">
                {images.find(img => img.url === selectedImage)?.credit}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
