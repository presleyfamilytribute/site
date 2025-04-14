
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";

const FamilySection = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const familyMembers = [
    {
      name: "Priscilla Presley",
      relation: "Wife (1967-1973)",
      description: "Met Elvis while he was stationed in Germany during his military service. She was the only woman Elvis ever married and had a profound impact on his life and legacy.",
      image: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Priscilla_Presley_in_2022.jpg",
      alt: "Priscilla Presley in 2022",
      credit: "Jernej Furman, CC BY 2.0"
    },
    {
      name: "Lisa Marie Presley",
      relation: "Daughter (1968-2023)",
      description: "Elvis and Priscilla's only child, born on February 1, 1968. Lisa Marie followed in her father's musical footsteps and was the sole heir to the Presley estate.",
      image: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Lisa_Marie_Presley_%282010%29.jpg",
      alt: "Lisa Marie Presley in 2010",
      credit: "Rusty Jarrett, CC BY 3.0"
    },
    {
      name: "Vernon Presley",
      relation: "Father (1916-1979)",
      description: "Elvis's father who supported his son's career and later helped manage his business affairs after Elvis achieved fame.",
      image: "https://upload.wikimedia.org/wikipedia/commons/8/89/Vernon_Presley.jpg",
      alt: "Vernon Presley portrait",
      credit: "Public domain"
    },
    {
      name: "Gladys Presley",
      relation: "Mother (1912-1958)",
      description: "Elvis was extremely close to his mother, whose death deeply affected him. Their tight-knit relationship influenced many aspects of his life and career.",
      image: "https://upload.wikimedia.org/wikipedia/commons/0/05/Gladys_Love_Smith_Presley.jpg",
      alt: "Gladys Presley portrait",
      credit: "Public domain"
    }
  ];

  useEffect(() => {
    // Preload images with better error handling
    const imagePromises = familyMembers.map(member => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          console.log(`Image loaded successfully: ${member.name}`);
          resolve(true);
        };
        img.onerror = () => {
          console.error(`Failed to load image: ${member.name}`);
          resolve(false);
        }; 
        img.src = member.image;
      });
    });

    Promise.all(imagePromises).then(() => {
      console.log("All image promises resolved");
      setImagesLoaded(true);
    });
  }, []);

  return (
    <section id="family" className="py-20 bg-elvis-navy">
      <div className="container mx-auto px-4">
        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-elvis-gold text-center mb-3">
          The Presley Family
        </h2>
        <p className="text-center text-elvis-cream font-medium mb-12">The loved ones behind the legend</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {familyMembers.map((member, index) => (
            <Card key={index} className="bg-elvis-cream border-none hover:shadow-xl transition-shadow overflow-hidden">
              <AspectRatio ratio={1/1} className="h-60 relative">
                {!imagesLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
                    <span className="text-gray-500 text-sm">Loading...</span>
                  </div>
                )}
                <img 
                  src={member.image} 
                  alt={member.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  style={{ opacity: imagesLoaded ? 1 : 0 }}
                  onLoad={() => console.log(`Image rendered in DOM: ${member.name}`)}
                  onError={(e) => {
                    console.error(`Image failed to render: ${member.name}`);
                    e.currentTarget.src = "https://placehold.co/400x400/e2e8f0/64748b?text=Image+unavailable";
                  }}
                />
              </AspectRatio>
              <CardContent className="pt-5">
                <h3 className="font-playfair text-xl font-semibold text-elvis-navy mb-1">{member.name}</h3>
                <p className="text-sm text-elvis-red font-medium mb-3">{member.relation}</p>
                <p className="text-sm text-gray-700">{member.description}</p>
                <p className="text-xs text-gray-500 mt-2">Image: {member.credit}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-block p-6 rounded-lg bg-elvis-cream bg-opacity-10">
            <p className="text-elvis-cream italic font-playfair text-lg">
              "The Presley family's story is one of extraordinary talent, deep bonds, and enduring legacy that continues to captivate the world."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FamilySection;
