import React from "react";
import { Link } from "react-router-dom";

const CuratedCollections = () => {
  return (
    <section className="py-24 px-8 max-w-7xl mx-auto bg-white">
      <div className="text-center mb-20">
        <h3 className="font-serif text-4xl text-aurelia-dark mb-4">Curated Collections</h3>
        <div className="w-12 h-px bg-[#c2a773] mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
        
        {/* Left Column: Large Ring Image */}
        <div className="lg:col-span-7 relative h-full min-h-[600px] bg-[#f0ede6] p-8 md:p-16 flex items-center justify-center">
          <img 
            src="/images/large_gold_ring.png" 
            alt="The Heritage Ring" 
            className="w-full max-w-md object-contain drop-shadow-2xl z-10"
          />
          
          {/* Floating Inset Image */}
          <div className="absolute -bottom-8 -left-4 md:bottom-12 md:-left-12 bg-white border border-gray-100 p-6 shadow-2xl w-48 h-48 md:w-64 md:h-64 z-20">
            <img 
              src="/images/large_gold_ring.png" 
              alt="Ring Detail" 
              className="w-full h-full object-contain"
            />
            {/* Decorative Gold Accent Lines */}
            <div className="absolute -bottom-3 -left-3 w-full h-full border-b-2 border-l-2 border-[#c2a773] pointer-events-none"></div>
          </div>
        </div>

        {/* Right Column: Cards & Text */}
        <div className="lg:col-span-5 flex flex-col space-y-12 mt-16 lg:mt-0 relative">
          
          {/* Fine Earrings Card */}
          <div className="relative group overflow-hidden w-full lg:w-4/5 ml-auto shadow-lg h-[300px]">
            <img 
              src="/images/fine_earrings.png" 
              alt="Fine Earrings" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <h4 className="text-white font-serif text-2xl mb-1">Fine Earrings</h4>
              <Link to="/" className="text-[#c2a773] text-xs tracking-widest uppercase flex items-center group-hover:text-white transition-colors duration-300">
                VIEW <span className="ml-1 text-lg leading-none">+</span>
              </Link>
            </div>
          </div>

          {/* Artisan Bracelets Card */}
          <div className="relative group overflow-hidden w-full lg:w-full shadow-lg h-[400px]">
            <img 
              src="/images/artisan_bracelet.png" 
              alt="Artisan Bracelets" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <h4 className="text-white font-serif text-2xl mb-1">Artisan Bracelets</h4>
              <Link to="/" className="text-[#c2a773] text-xs tracking-widest uppercase flex items-center group-hover:text-white transition-colors duration-300">
                VIEW <span className="ml-1 text-lg leading-none">+</span>
              </Link>
            </div>
          </div>

          {/* Descriptive Text Block - Overlapping dynamically on large screens */}
          <div className="lg:absolute lg:-left-32 lg:bottom-16 bg-white/95 backdrop-blur p-8 lg:p-10 shadow-xl border border-gray-50 max-w-md z-30">
            <h3 className="font-serif text-2xl mb-4 text-[#1c1c1c]">The Pinnacle of Craftsmanship</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Each piece is meticulously handcrafted in our historic atelier, utilizing only ethically sourced stones of exceptional clarity.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              We believe that fine jewelry is more than adornment; it is a wearable sculpture, an intimate talisman, and a timeless legacy passed through generations.
            </p>
            <Link to="/" className="inline-block text-xs uppercase tracking-widest text-[#1c1c1c] border-b border-[#1c1c1c] pb-1 hover:text-[#c2a773] hover:border-[#c2a773] transition-colors duration-300 font-medium">
              READ OUR STORY
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CuratedCollections;
