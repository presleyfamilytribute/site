
import { useState } from 'react';
import { X } from 'lucide-react';

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    {
      url: "https://images.unsplash.com/photo-1598387993243-a5d36da31470?auto=format&fit=crop&q=80",
      caption: "Elvis on stage during one of his electrifying performances"
    },
    {
      url: "https://images.unsplash.com/photo-1598387993240-951d9f5f45a6?auto=format&fit=crop&q=80",
      caption: "Elvis in his iconic white jumpsuit era"
    },
    {
      url: "https://images.unsplash.com/photo-1605647533135-51b5805d6cdd?auto=format&fit=crop&q=80",
      caption: "Graceland estate, Elvis's beloved home in Memphis"
    },
    {
      url: "https://images.unsplash.com/photo-1704253143457-034f1418d2c6?auto=format&fit=crop&q=80",
      caption: "Elvis and Priscilla during their wedding day"
    },
    {
      url: "https://images.unsplash.com/photo-1620161448706-99df1a8d722d?auto=format&fit=crop&q=80",
      caption: "Young Elvis at the beginning of his career"
    },
    {
      url: "https://images.unsplash.com/photo-1598387993282-7b275fabbb10?auto=format&fit=crop&q=80",
      caption: "Elvis's influence continues to inspire generations"
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-elvis-cream">
      <div className="container mx-auto px-4">
        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-elvis-navy text-center mb-3">
          Family Gallery
        </h2>
        <p className="text-center text-elvis-red font-medium mb-12">Moments captured in time</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div 
              key={index}
              className="relative overflow-hidden rounded-lg shadow-md cursor-pointer group"
              onClick={() => setSelectedImage(image.url)}
            >
              <img 
                src={image.url} 
                alt={`Presley family moment ${index + 1}`} 
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-elvis-navy bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-end">
                <div className="p-4 w-full transform translate-y-full group-hover:translate-y-0 transition-transform">
                  <p className="text-white text-sm font-medium">{image.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
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
              />
              <p className="text-white text-center mt-4">
                {images.find(img => img.url === selectedImage)?.caption}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
