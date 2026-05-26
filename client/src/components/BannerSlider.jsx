import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const BannerSlider = ({ banners }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!banners || banners.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 6000);

    return () => clearInterval(interval);
  }, [banners]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  if (!banners || banners.length === 0) {
    // Elegant fallback banner matching Tanishq style
    const defaultBanners = [
      {
        _id: "default-1",
        title: "The Gemstone Symphony",
        subtitle: "HUES - Natural Gemstone Jewellery",
        image: "/images/large_gold_ring.png",
        link: "/search/gold",
        buttonText: "Explore Hues Collection",
      }
    ];
    banners = defaultBanners;
  }

  return (
    <section className="relative h-[280px] sm:h-[350px] md:h-[400px] lg:h-[450px] w-full overflow-hidden bg-[#fbf9f4] border-b border-gray-100 z-10 px-4 md:px-8 py-4">
      <div className="w-full h-full relative rounded-2xl overflow-hidden border border-[#c5a880]/30 shadow-md">
        {banners.map((banner, index) => {
          const isActive = index === currentSlide;
          const bannerImage = (
            <img 
              src={banner.image} 
              alt={banner.title} 
              className={`w-full h-full object-cover object-center absolute inset-0 z-[-1] transition-transform duration-[8000ms] ease-out ${isActive ? 'scale-105' : 'scale-100'}`}
            />
          );

          return (
            <div 
              key={banner._id} 
              className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${isActive ? 'opacity-100 z-10 animate-fade-in' : 'opacity-0 z-0 pointer-events-none'}`}
            >
              {/* High-End Background Shading */}
              <div className="absolute inset-0 z-[-2] bg-[#fbf9f4]"></div>

              {banner.link ? (
                <Link to={banner.link} className="absolute inset-0 cursor-pointer block z-10">
                  {bannerImage}
                </Link>
              ) : (
                <div className="absolute inset-0 z-10">
                  {bannerImage}
                </div>
              )}
            </div>
          );
        })}

        {/* Navigation Arrows */}
        {banners.length > 1 && (
          <>
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-25 w-10 h-10 md:w-12 md:h-12 bg-white/70 hover:bg-[#832729] hover:text-white rounded-full flex items-center justify-center text-gray-800 shadow-md transition-all duration-300 pointer-events-auto cursor-pointer"
              aria-label="Previous slide"
            >
              <FiChevronLeft className="text-xl md:text-2xl" />
            </button>
            
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-25 w-10 h-10 md:w-12 md:h-12 bg-white/70 hover:bg-[#832729] hover:text-white rounded-full flex items-center justify-center text-gray-800 shadow-md transition-all duration-300 pointer-events-auto cursor-pointer"
              aria-label="Next slide"
            >
              <FiChevronRight className="text-xl md:text-2xl" />
            </button>
          </>
        )}

        {/* Tanishq Capsule Indicators */}
        {banners.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-3.5 z-20 px-4">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className="py-2 cursor-pointer"
                aria-label={`Go to slide ${index + 1}`}
              >
                <div className={`h-[3px] rounded-full transition-all duration-500 ${index === currentSlide ? 'w-10 bg-[#832729]' : 'w-4 bg-gray-300 hover:bg-gray-400'}`} />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BannerSlider;
