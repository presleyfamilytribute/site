
import { Disc3 } from "lucide-react";

const MusicSection = () => {
  const iconicSongs = [
    {
      title: "Heartbreak Hotel",
      year: 1956,
      description: "Elvis's first #1 hit on Billboard's pop charts that established him as a rock and roll icon."
    },
    {
      title: "Hound Dog",
      year: 1956,
      description: "One of his most recognizable songs, showcasing his energetic performance style."
    },
    {
      title: "Love Me Tender",
      year: 1956,
      description: "A tender ballad showcasing Elvis's versatility, also the title of his first film."
    },
    {
      title: "Jailhouse Rock",
      year: 1957,
      description: "Featured in the film of the same name with one of Elvis's most memorable performances."
    },
    {
      title: "Can't Help Falling in Love",
      year: 1961,
      description: "A romantic ballad that became one of Elvis's most enduring love songs."
    },
    {
      title: "Suspicious Minds",
      year: 1969,
      description: "Part of Elvis's comeback, becoming his last #1 single during his lifetime."
    }
  ];

  return (
    <section id="music" className="py-20 bg-gradient-to-b from-elvis-cream to-white">
      <div className="container mx-auto px-4">
        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-elvis-navy text-center mb-3">
          Iconic Music
        </h2>
        <p className="text-center text-elvis-red font-medium mb-12">The songs that defined an era</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {iconicSongs.map((song, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow border border-gray-100">
              <div className="flex items-center mb-4">
                <Disc3 className="text-elvis-gold mr-3" size={24} />
                <div>
                  <h3 className="font-playfair text-xl font-semibold text-elvis-navy">{song.title}</h3>
                  <p className="text-sm text-elvis-red">{song.year}</p>
                </div>
              </div>
              <p className="text-gray-700">{song.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 flex flex-col md:flex-row items-center justify-center bg-elvis-navy bg-opacity-5 rounded-xl p-6">
          <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
            <div className="w-40 h-40 rounded-full bg-elvis-gold flex items-center justify-center animate-record-spin">
              <div className="w-16 h-16 rounded-full bg-elvis-navy"></div>
            </div>
          </div>
          <div className="md:w-2/3 md:pl-8">
            <h3 className="font-playfair text-2xl font-semibold text-elvis-navy mb-4">Musical Legacy</h3>
            <p className="text-gray-700 mb-4">
              Elvis Presley's musical contributions span rock and roll, gospel, country, and blues. His ability to blend genres and infuse personal emotion into his performances revolutionized popular music.
            </p>
            <p className="text-gray-700">
              With over 150 albums and singles sold, 149 songs on the Billboard Hot 100 charts, and countless cover versions of his songs, Elvis's musical legacy continues to resonate with audiences worldwide, influencing countless artists across generations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicSection;
