import { Link } from "react-router-dom";
import { FiInstagram, FiTwitter } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-[#832729] text-white border-t border-red-950/20 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="font-serif text-2xl font-bold tracking-[0.25em] text-[#c5a880] mb-6">
              SHREEHARIKRIPA
            </h2>
            <p className="text-white/70 text-xs leading-relaxed mb-6">
              Crafting luminous legacies and timeless Indian heritage since 1924. Elevate
              your everyday with our bespoke collections.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-[#c5a880] hover:border-[#c5a880] transition-colors bg-white/5">
                <FiInstagram />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-[#c5a880] hover:border-[#c5a880] transition-colors bg-white/5">
                <FiTwitter />
              </a>
            </div>
          </div>

          {/* Discover Column */}
          <div>
            <h3 className="text-xs font-bold tracking-widest uppercase mb-6 text-[#c5a880]">Discover</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="text-xs text-white/70 hover:text-[#c5a880] transition-colors">High Jewelry</Link></li>
              <li><Link to="/" className="text-xs text-white/70 hover:text-[#c5a880] transition-colors">Bespoke Design</Link></li>
              <li><Link to="/" className="text-xs text-white/70 hover:text-[#c5a880] transition-colors">Bridal Collection</Link></li>
              <li><Link to="/" className="text-xs text-white/70 hover:text-[#c5a880] transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Assistance Column */}
          <div>
            <h3 className="text-xs font-bold tracking-widest uppercase mb-6 text-[#c5a880]">Assistance</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="text-xs text-white/70 hover:text-[#c5a880] transition-colors">Contact Us</Link></li>
              <li><Link to="/" className="text-xs text-white/70 hover:text-[#c5a880] transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/" className="text-xs text-white/70 hover:text-[#c5a880] transition-colors">Jewelry Care</Link></li>
              <li><Link to="/" className="text-xs text-white/70 hover:text-[#c5a880] transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="text-xs font-bold tracking-widest uppercase mb-6 text-[#c5a880]">Newsletter</h3>
            <p className="text-white/70 text-xs mb-4 leading-relaxed">
              Subscribe to receive exclusive invitations, collection launches, and royal updates.
            </p>
            <div className="flex border-b border-white/20 py-2">
              <input type="email" placeholder="Your Email Address" className="bg-transparent text-white placeholder-white/40 text-xs focus:outline-none w-full font-light" />
              <button className="text-[#c5a880] hover:text-white uppercase tracking-widest text-[10px] font-bold transition-colors">Join</button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-[10px] text-white/40 tracking-[0.2em] uppercase">
            &copy; 2026 SHREEHARIKRIPA FINE JEWELLERY. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
