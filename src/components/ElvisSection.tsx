
import { Separator } from "@/components/ui/separator";

const ElvisSection = () => {
  return (
    <section id="elvis" className="py-20 bg-elvis-cream">
      <div className="container mx-auto px-4">
        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-elvis-navy text-center mb-3">
          Elvis Presley
        </h2>
        <p className="text-center text-elvis-red font-medium mb-12">The King of Rock and Roll</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-lg mb-6 text-gray-800">
              Born on January 8, 1935, in Tupelo, Mississippi, Elvis Aaron Presley rose from humble beginnings to become one of the most iconic and influential figures in music history. Known as the "King of Rock and Roll," Elvis revolutionized popular music and became a defining cultural symbol of the 20th century.
            </p>
            <p className="text-lg mb-6 text-gray-800">
              With his unique voice, charismatic stage presence, and fusion of musical styles, Elvis bridged the gap between black and white music in a segregated America. His energetic performances, characterized by his famous hip movements, scandalized some but enthralled millions worldwide.
            </p>
            <p className="text-lg text-gray-800">
              Beyond music, Elvis starred in 31 films, served in the U.S. Army, and created his beloved estate, Graceland. Though he passed away on August 16, 1977, his legacy continues to inspire generations of musicians and fans alike.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-full max-w-md h-96 bg-cover bg-center rounded-lg shadow-lg transform rotate-2" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1598387993240-951d9f5f45a6?auto=format&fit=crop&q=80')" }}></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-elvis-gold flex items-center justify-center shadow-lg">
                <span className="font-playfair font-bold text-elvis-navy">1935-1977</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12">
          <Separator className="bg-elvis-navy opacity-20" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 text-center">
            <div>
              <p className="font-playfair text-3xl font-bold text-elvis-gold">18</p>
              <p className="text-elvis-navy">Grammy Nominations</p>
            </div>
            <div>
              <p className="font-playfair text-3xl font-bold text-elvis-gold">3</p>
              <p className="text-elvis-navy">Grammy Wins</p>
            </div>
            <div>
              <p className="font-playfair text-3xl font-bold text-elvis-gold">31</p>
              <p className="text-elvis-navy">Movies</p>
            </div>
            <div>
              <p className="font-playfair text-3xl font-bold text-elvis-gold">150M+</p>
              <p className="text-elvis-navy">Records Sold</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ElvisSection;
