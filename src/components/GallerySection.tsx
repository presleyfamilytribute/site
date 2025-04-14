
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { detectBasicBot } from '@/utils/security';

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loadedImagesCount, setLoadedImagesCount] = useState(0);

  // Better quality, properly attributed Elvis Presley family images
  const images = [
    {
      url: "https://upload.wikimedia.org/wikipedia/commons/9/99/Elvis_Presley_promoting_Jailhouse_Rock.jpg",
      caption: "Elvis Presley promoting 'Jailhouse Rock'",
      alt: "Elvis Presley in a promotional photo for Jailhouse Rock",
      credit: "Metro-Goldwyn-Mayer, Public domain"
    },
    {
      url: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Elvis_Presley_and_Priscilla_Beaulieu_on_their_wedding_day%2C_May_1%2C_1967.jpg",
      caption: "Elvis and Priscilla on their wedding day, May 1, 1967",
      alt: "Elvis and Priscilla Presley wedding photograph",
      credit: "Intercontinental Hotels Group, Public domain"
    },
    {
      url: "https://upload.wikimedia.org/wikipedia/commons/5/55/Graceland_Memphis_Tennessee.jpg",
      caption: "Graceland, Elvis Presley's mansion in Memphis, Tennessee",
      alt: "Front view of Graceland mansion",
      credit: "Lindsey Turner, CC BY 2.0"
    },
    {
      url: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Lisa_Marie_Presley_%282010%29.jpg",
      caption: "Lisa Marie Presley at the Daytona 500, February 2010",
      alt: "Lisa Marie Presley portrait",
      credit: "Rusty Jarrett, CC BY 3.0"
    },
    {
      url: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Elvis_Presley_with_his_parents_-_1937.jpg", 
      caption: "Young Elvis with parents Vernon and Gladys Presley, 1937",
      alt: "Elvis Presley as a child with his parents",
      credit: "Public domain"
    },
    {
      url: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Elvis_Presley_1970.jpg",
      caption: "Elvis performing in 1970 during his comeback era",
      alt: "Elvis Presley performing in 1970",
      credit: "MGM, Public domain"
    }
  ];

  useEffect(() => {
    // Basic bot detection (for educational purposes)
    const possiblyBot = detectBasicBot();
    if (possiblyBot) {
      setLoadError("Unusual browsing pattern detected. If you're a real visitor, please refresh.");
      return;
    }

    // Track visit using session storage
    try {
      const visitCount = parseInt(sessionStorage.getItem('galleryViews') || '0');
      sessionStorage.setItem('galleryViews', (visitCount + 1).toString());
    } catch (e) {
      // Session storage not available
    }

    // Track individual image loading
    setLoadedImagesCount(0);
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
    <section id="gallery" className="py-20 bg-elvis-cream">
      <div className="container mx-auto px-4">
        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-elvis-navy text-center mb-3">
          Family Gallery
        </h2>
        <p className="text-center text-elvis-red font-medium mb-12">Moments captured in time</p>
        
        {loadError && (
          <Alert variant="destructive" className="mb-8">
            <AlertDescription>{loadError}</AlertDescription>
          </Alert>
        )}
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array(6).fill(0).map((_, index) => (
              <div key={index} className="h-64 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Loading... {Math.round(loadingProgress)}%</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                      e.currentTarget.src = "https://placehold.co/600x400/e2e8f0/64748b?text=Image+unavailable";
                    }}
                  />
                </AspectRatio>
                <div className="absolute inset-0 bg-elvis-navy bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-end">
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
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
            <button 
              className="absolute top-4 right-4 text-white hover:text-elvis-gold"
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
