import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FiSearch, FiHeart, FiShoppingBag, FiUser, FiLogOut, FiMenu } from "react-icons/fi";
import { logout } from "../redux/slices/authSlice";
import { fetchWishlist, clearWishlist } from "../redux/slices/wishlistSlice";
import api from "../services/api";
import SearchBox from "./SearchBox";

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistIds } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (userInfo) {
      dispatch(fetchWishlist());
    } else {
      dispatch(clearWishlist());
    }
  }, [userInfo, dispatch]);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      dispatch(clearWishlist());
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="sticky top-0 w-full z-50 flex flex-col transition-all duration-500 bg-white">
      {/* Main Navbar */}
      <div className={`w-full transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-b border-gray-100/50 py-3.5' : 'bg-white border-b border-gray-100 py-6'}`}>
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-6 lg:px-8">
          
          {/* Left - Mobile Menu Icon & Logo */}
          <div className="flex-1 flex items-center justify-start">
            <button className="lg:hidden text-gray-800 hover:text-[#832729] transition-colors p-2 -ml-2 mr-2">
              <FiMenu className="text-2xl" />
            </button>
            <Link to="/" className="flex flex-col items-start select-none group">
              <span className="font-serif text-lg sm:text-xl md:text-2xl font-bold tracking-[0.22em] text-[#832729] group-hover:text-[#6c1e20] transition-colors duration-300">
                SHREEHARIKRIPA
              </span>
              <span className="text-[7.5px] font-sans font-bold text-[#c5a880] tracking-[0.55em] uppercase -mt-0.5 ml-[1.5px] transition-colors duration-300 group-hover:text-[#832729]">
                FINE JEWELLERY
              </span>
            </Link>
          </div>

          {/* Center - Search Bar */}
          <div className="flex-shrink-0 text-center mx-4 flex-1 lg:flex-none flex justify-center">
            <SearchBox />
          </div>

          {/* Right - Icons */}
          <div className="flex-1 flex items-center space-x-4 justify-end">
            <Link 
              to="/wishlist" 
              className="w-10 h-10 rounded-full bg-[#fbf9f4]/60 hover:bg-[#832729]/5 border border-gray-200/50 hover:border-[#c5a880]/30 flex items-center justify-center text-gray-700 hover:text-[#832729] relative group hidden sm:flex transition-all duration-300"
              title="View Wishlist"
            >
              <FiHeart className="text-[17px] group-hover:scale-110 transition-transform duration-300" />
              {wishlistIds.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#832729] text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {wishlistIds.length}
                </span>
              )}
            </Link>

            <Link 
              to="/cart" 
              className="w-10 h-10 rounded-full bg-[#fbf9f4]/60 hover:bg-[#832729]/5 border border-gray-200/50 hover:border-[#c5a880]/30 flex items-center justify-center text-gray-700 hover:text-[#832729] relative group transition-all duration-300"
              title="View Shopping Bag"
            >
              <FiShoppingBag className="text-[17px] group-hover:scale-110 transition-transform duration-300" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#832729] text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              )}
            </Link>
            
            {userInfo ? (
              <div className="group relative flex items-center">
                <button className="w-10 h-10 rounded-full bg-[#fbf9f4]/60 hover:bg-[#832729]/5 border border-gray-200/50 hover:border-[#c5a880]/30 flex items-center justify-center text-gray-700 hover:text-[#832729] transition-all duration-300">
                  <FiUser className="text-[17px]" />
                </button>
                
                <div className="absolute right-0 top-10 mt-2 w-56 bg-white border border-gray-100 shadow-2xl opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 z-50 transform origin-top-right scale-95 group-hover:scale-100 rounded-lg overflow-hidden">
                  <div className="p-4 bg-gray-50 border-b border-gray-100">
                    <p className="text-xs text-gray-400 tracking-widest uppercase mb-1">Welcome</p>
                    <p className="text-sm font-medium text-gray-800 truncate">{userInfo.name}</p>
                  </div>
                  
                  <div className="py-2">
                    <Link to="/profile" className="block px-5 py-2.5 text-sm text-gray-600 hover:text-[#832729] hover:bg-gray-50 transition-colors">My Profile & Orders</Link>
                    
                    {userInfo.role === "admin" && (
                      <div className="mt-2 pt-2 border-t border-gray-100">
                        <div className="px-5 py-2 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Admin Controls</div>
                        <Link to="/admin/dashboard" className="block px-5 py-2.5 text-sm text-gray-600 hover:text-[#832729] hover:bg-gray-50 transition-colors">Dashboard</Link>
                        <Link to="/admin/products" className="block px-5 py-2.5 text-sm text-gray-600 hover:text-[#832729] hover:bg-gray-50 transition-colors">Manage Products</Link>
                        <Link to="/admin/banners" className="block px-5 py-2.5 text-sm text-gray-600 hover:text-[#832729] hover:bg-gray-50 transition-colors">Manage Banners</Link>
                        <Link to="/admin/categories" className="block px-5 py-2.5 text-sm text-gray-600 hover:text-[#832729] hover:bg-gray-50 transition-colors">Manage Categories</Link>
                        <Link to="/admin/orders" className="block px-5 py-2.5 text-sm text-gray-600 hover:text-[#832729] hover:bg-gray-50 transition-colors">Manage Orders</Link>
                        <Link to="/admin/users" className="block px-5 py-2.5 text-sm text-gray-600 hover:text-[#832729] hover:bg-gray-50 transition-colors">Manage Users</Link>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-2 border-t border-gray-100 bg-gray-50">
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors flex items-center rounded"
                    >
                      <FiLogOut className="mr-2" /> Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="w-10 h-10 rounded-full bg-[#fbf9f4]/60 hover:bg-[#832729]/5 border border-gray-200/50 hover:border-[#c5a880]/30 flex items-center justify-center text-gray-700 hover:text-[#832729] transition-all duration-300"
                title="Sign In"
              >
                <FiUser className="text-[17px]" />
              </Link>
            )}
          </div>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;
