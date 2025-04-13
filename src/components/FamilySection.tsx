
import { Card, CardContent } from "@/components/ui/card";

const FamilySection = () => {
  const familyMembers = [
    {
      name: "Priscilla Presley",
      relation: "Wife (1967-1973)",
      description: "Met Elvis while he was stationed in Germany during his military service. She was the only woman Elvis ever married and had a profound impact on his life and legacy.",
      image: "https://images.unsplash.com/photo-1651870845862-c97ca36f1c5c?auto=format&fit=crop&q=80"
    },
    {
      name: "Lisa Marie Presley",
      relation: "Daughter (1968-2023)",
      description: "Elvis and Priscilla's only child, born on February 1, 1968. Lisa Marie followed in her father's musical footsteps and was the sole heir to the Presley estate.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
    },
    {
      name: "Vernon Presley",
      relation: "Father (1916-1979)",
      description: "Elvis's father who supported his son's career and later helped manage his business affairs after Elvis achieved fame.",
      image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&q=80"
    },
    {
      name: "Gladys Presley",
      relation: "Mother (1912-1958)",
      description: "Elvis was extremely close to his mother, whose death deeply affected him. Their tight-knit relationship influenced many aspects of his life and career.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80"
    }
  ];

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
              <div className="h-60 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <CardContent className="pt-5">
                <h3 className="font-playfair text-xl font-semibold text-elvis-navy mb-1">{member.name}</h3>
                <p className="text-sm text-elvis-red font-medium mb-3">{member.relation}</p>
                <p className="text-sm text-gray-700">{member.description}</p>
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
