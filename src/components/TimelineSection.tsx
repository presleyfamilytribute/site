
const TimelineSection = () => {
  const events = [
    {
      year: "1935",
      event: "Birth of Elvis Aaron Presley",
      description: "Born on January 8 in Tupelo, Mississippi to Vernon and Gladys Presley."
    },
    {
      year: "1954",
      event: "First Professional Recording",
      description: "Recorded \"That's All Right\" at Sun Records, launching his music career."
    },
    {
      year: "1956",
      event: "Breakthrough Success",
      description: "Released \"Heartbreak Hotel\" and appeared on The Ed Sullivan Show, becoming a national sensation."
    },
    {
      year: "1958-1960",
      event: "Military Service",
      description: "Served in the United States Army, stationed primarily in Germany where he met Priscilla Beaulieu."
    },
    {
      year: "1967",
      event: "Marriage to Priscilla",
      description: "Married Priscilla Beaulieu on May 1 at the Aladdin Hotel in Las Vegas, Nevada."
    },
    {
      year: "1968",
      event: "Birth of Lisa Marie & Comeback Special",
      description: "Welcomed daughter Lisa Marie on February 1 and revitalized his career with the '68 Comeback Special on NBC."
    },
    {
      year: "1973",
      event: "Divorce & Aloha from Hawaii",
      description: "Divorced from Priscilla and performed the first globally broadcast concert satellite \"Aloha from Hawaii.\""
    },
    {
      year: "1977",
      event: "Final Performance & Passing",
      description: "Performed his final concert in Indianapolis on June 26 and passed away on August 16 at Graceland."
    },
    {
      year: "1982",
      event: "Graceland Opens to the Public",
      description: "Graceland opened its doors to visitors, becoming one of the most visited private homes in America."
    },
    {
      year: "2023",
      event: "Lisa Marie's Passing",
      description: "Lisa Marie Presley passed away on January 12, leaving behind a legacy as Elvis's only child."
    }
  ];

  return (
    <section id="timeline" className="py-20 bg-elvis-navy">
      <div className="container mx-auto px-4">
        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-elvis-gold text-center mb-3">
          Family Timeline
        </h2>
        <p className="text-center text-elvis-cream font-medium mb-12">Key moments in the Presley family history</p>
        
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-elvis-gold"></div>
          
          <div className="space-y-12">
            {events.map((item, index) => (
              <div key={index} className="relative">
                {/* Circle marker */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-elvis-gold border-4 border-elvis-navy z-10"></div>
                
                <div className={`flex items-center justify-between ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} md:w-full`}>
                  {/* Year */}
                  <div className="w-24 md:w-32 text-elvis-gold font-playfair font-bold text-xl md:text-2xl">
                    {item.year}
                  </div>
                  
                  {/* Content */}
                  <div className={`w-full md:w-5/12 p-5 rounded-lg ${index % 2 === 0 ? 'ml-8 md:ml-0' : 'mr-8 md:mr-0'}`}>
                    <div className="bg-elvis-cream bg-opacity-10 p-5 rounded-lg animate-fade-in">
                      <h3 className="font-playfair text-xl text-elvis-gold font-bold mb-2">{item.event}</h3>
                      <p className="text-elvis-cream">{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
