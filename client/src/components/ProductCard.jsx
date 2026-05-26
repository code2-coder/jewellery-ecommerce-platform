import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleWishlistItem } from "../redux/slices/wishlistSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { wishlistIds } = useSelector((state) => state.wishlist);

  const isLiked = Array.isArray(wishlistIds) && wishlistIds.includes(String(product._id));

  const handleWishlistClick = () => {
    if (!userInfo) {
      navigate("/login");
      return;
    }
    dispatch(toggleWishlistItem(product._id));
  };

  return (
    <div className="group flex flex-col h-full bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(131,39,41,0.08)] border border-gray-100 hover:border-[#c5a880]/30 overflow-hidden relative rounded">
      {/* Image Area - wrapper div contains both the Link and the heart button as siblings */}
      <div className="relative overflow-hidden h-80 bg-[#fbf9f4]">
        <Link to={`/product/${product._id}`} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          />
          
          {/* Luxury Gold Border Frame Hover Effect */}
          <div className="absolute inset-3 border border-transparent group-hover:border-[#c5a880]/30 transition-all duration-700 pointer-events-none z-10"></div>

          {/* Premium Details Overlay */}
          <div className="absolute inset-0 bg-[#832729]/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-0">
            <span className="bg-[#832729] text-white text-[10px] tracking-[0.2em] uppercase px-5 py-3 font-semibold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              Explore Now
            </span>
          </div>
        </Link>

        {/* Wishlist Heart - OUTSIDE the Link, sibling element with higher z-index */}
        <button 
          type="button"
          onClick={handleWishlistClick}
          className="absolute top-4 right-4 z-30 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white hover:scale-110 transition-all duration-300 cursor-pointer"
          aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
        >
          <FiHeart 
            className={`text-lg transition-all duration-300 ${
              isLiked 
                ? 'fill-[#832729] text-[#832729]' 
                : 'text-gray-400 hover:text-[#832729]'
            }`} 
          />
        </button>
      </div>

      <div className="p-6 text-center flex-1 flex flex-col justify-between bg-white z-10">
        <div>
          <p className="text-[#c5a880] text-[10px] font-semibold tracking-[0.2em] uppercase mb-1.5">
            {product.category}
          </p>
          
          {/* Star Ratings */}
          <div className="flex items-center justify-center gap-0.5 mb-2 text-xs text-[#c5a880]">
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            <span className="text-gray-400 text-[10px] font-sans ml-1">(4.8)</span>
          </div>

          <Link to={`/product/${product._id}`}>
            <h3 className="font-serif text-base text-gray-800 group-hover:text-[#832729] transition-colors duration-300 mb-2 leading-relaxed">
              {product.name}
            </h3>
          </Link>
        </div>
        
        <p className="text-[#832729] font-serif font-bold text-lg mt-3">
          ${product.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
