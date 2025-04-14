import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

const FamilySection = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const familyMembers = [
    {
      name: "Priscilla Presley",
      relation: "Wife (1967-1973)",
      description: "Met Elvis while he was stationed in Germany during his military service. She was the only woman Elvis ever married and had a profound impact on his life and legacy.",
      image: "/assets/ai-priscilla-presley.png",
      alt: "AI-generated portrait of Priscilla Presley",
      credit: "AI Generated Image"
    },
    {
      name: "Lisa Marie Presley",
      relation: "Daughter (1968-2023)",
      description: "Elvis and Priscilla's only child, born on February 1, 1968. Lisa Marie followed in her father's musical footsteps and was the sole heir to the Presley estate.",
      image: "/assets/ai-lisa-marie-presley.png",
      alt: "AI-generated portrait of Lisa Marie Presley",
      credit: "AI Generated Image"
    },
    {
      name: "Vernon Presley",
      relation: "Father (1916-1979)",
      description: "Elvis's father who supported his son's career and later helped manage his business affairs after Elvis achieved fame.",
      image: "/assets/ai-vernon-presley.png",
      alt: "AI-generated portrait of Vernon Presley",
      credit: "AI Generated Image"
    },
    {
      name: "Gladys Presley",
      relation: "Mother (1912-1958)",
      description: "Elvis was extremely close to his mother, whose death deeply affected him. Their tight-knit relationship influenced many aspects of his life and career.",
      image: "/assets/ai-gladys-presley.png",
      alt: "AI-generated portrait of Gladys Presley",
      credit: "AI Generated Image"
    }
  ];

  useEffect(() => {
    // Improved image preloading
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

    Promise.all(imagePromises)
      .then(() => {
        console.log("All image promises resolved");
        setImagesLoaded(true);
      })
      .catch(error => {
        console.error("Error loading images:", error);
        // Still set images as loaded to show fallbacks
        setImagesLoaded(true);
      });
  }, []);

  return (
    <section id="family" className="py-20 bg-gradient-to-b from-elvis-navy to-black">
      <div className="container mx-auto px-4">
        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-elvis-gold text-center mb-3">
          The Presley Family
        </h2>
        <p className="text-center text-elvis-cream font-medium mb-12 italic">The loved ones behind the legend</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {familyMembers.map((member, index) => (
            <Card key={index} className="bg-elvis-cream/95 border-none hover:shadow-2xl transition-shadow duration-300 overflow-hidden rounded-lg">
              <AspectRatio ratio={1/1} className="h-60 relative">
                {!imagesLoaded ? (
                  <Skeleton className="h-full w-full" />
                ) : (
                  <img 
                    src={member.image} 
                    alt={member.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    onLoad={() => console.log(`Image rendered in DOM: ${member.name}`)}
                    onError={(e) => {
                      console.error(`Image failed to render: ${member.name}`);
                      e.currentTarget.src = "https://placehold.co/400x400/e2e8f0/64748b?text=Elvis+Family";
                    }}
                  />
                )}
              </AspectRatio>
              <CardContent className="pt-5">
                <h3 className="font-playfair text-xl font-semibold text-elvis-navy mb-1">{member.name}</h3>
                <p className="text-sm text-elvis-red font-medium mb-3">{member.relation}</p>
                <p className="text-sm text-gray-700">{member.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-block p-6 rounded-lg bg-elvis-cream bg-opacity-20 transform hover:scale-[1.01] transition-transform duration-300">
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
