import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist } from "../redux/slices/wishlistSlice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { wishlistItems, loading, error } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-tanishq-cream flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-32 px-8 max-w-7xl mx-auto w-full pb-20">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl text-gray-800 mb-4 font-bold">My Wishlist</h1>
          <div className="h-0.5 w-16 bg-[#c5a880] mx-auto"></div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-[#832729] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-500 p-6 rounded text-center">
            {error}
          </div>
        ) : wishlistItems && wishlistItems.length === 0 ? (
          <div className="text-center py-20 bg-white border border-gray-100 rounded-xl shadow-sm">
            <FiHeart className="text-6xl text-gray-200 mx-auto mb-6" />
            <h2 className="text-2xl font-serif text-gray-800 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8">Save your favorite pieces here to easily find them later.</p>
            <Link to="/" className="btn-gold">
              Discover Jewelry
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {wishlistItems.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Wishlist;
