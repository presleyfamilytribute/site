
import React from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const VideoSection = () => {
  const familyVideos = [
    {
      name: "Elvis Presley",
      videoId: "gj0Rz-uP4Mk", // Elvis Presley - Jailhouse Rock
      title: "Elvis Presley - Jailhouse Rock (Official Video)",
      description: "One of Elvis's most iconic performances from the 1957 film 'Jailhouse Rock'."
    },
    {
      name: "Priscilla Presley",
      videoId: "UJOdYkw7JEQ", // Priscilla Presley Interview
      title: "Priscilla Presley Interview About Life with Elvis",
      description: "Priscilla shares insights about her marriage and life with Elvis Presley."
    },
    {
      name: "Lisa Marie Presley",
      videoId: "8q61rTm0OCY", // Lisa Marie Presley performing
      title: "Lisa Marie Presley - Lights Out (Official Video)",
      description: "Lisa Marie's tribute to her famous father in her own music career."
    },
    {
      name: "Family Archives",
      videoId: "eOTbm-NvLII", // Elvis with parents
      title: "Elvis Presley with Vernon and Gladys Presley",
      description: "Rare footage of Elvis with his parents Vernon and Gladys Presley."
    }
  ];

  return (
    <section id="videos" className="py-20 bg-gradient-to-b from-elvis-navy to-black">
      <div className="container mx-auto px-4">
        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-elvis-gold text-center mb-3">
          Presley Family Videos
        </h2>
        <p className="text-center text-elvis-cream font-medium mb-12 italic">
          Watch rare footage and performances
        </p>

        <Tabs defaultValue={familyVideos[0].name} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 bg-elvis-navy/50 mb-8">
            {familyVideos.map((video) => (
              <TabsTrigger 
                key={video.name} 
                value={video.name}
                className="data-[state=active]:bg-elvis-gold data-[state=active]:text-black"
              >
                {video.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {familyVideos.map((video) => (
            <TabsContent key={video.videoId} value={video.name} className="mt-4">
              <Card className="border-none bg-elvis-cream/10">
                <CardContent className="pt-6">
                  <div className="max-w-3xl mx-auto">
                    <AspectRatio ratio={16 / 9} className="bg-black mb-4 overflow-hidden rounded-lg">
                      <iframe
                        src={`https://www.youtube.com/embed/${video.videoId}?rel=0`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full border-0"
                      ></iframe>
                    </AspectRatio>
                    <h3 className="text-xl font-playfair text-elvis-gold mb-2">{video.title}</h3>
                    <p className="text-elvis-cream/90">{video.description}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-12 text-center">
          <p className="text-elvis-cream/80 italic">
            "Music was my first love and it will be my last." - Elvis Presley
          </p>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
