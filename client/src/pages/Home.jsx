import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import { fetchActiveBanners } from "../redux/slices/bannerSlice";
import Navbar from "../components/Navbar";
import CuratedCollections from "../components/CuratedCollections";
import CategoryGrid from "../components/CategoryGrid";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import BannerSlider from "../components/BannerSlider";

const Home = () => {
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  const { banners, loading: loadingBanners } = useSelector((state) => state.banner);

  useEffect(() => {
    dispatch(fetchProducts(keyword));
    if (!keyword) {
      dispatch(fetchActiveBanners());
    }
  }, [dispatch, keyword]);

  return (
    <div className="min-h-screen bg-tanishq-cream">
      <Navbar />
      
      {/* Dynamic Shop by Category strip directly below the header */}
      {!keyword && <CategoryGrid />}
      
      {/* Conditional Sections: Hide on Search */}
      {!keyword ? (
        loadingBanners ? (
          <div className="h-[400px] flex items-center justify-center bg-[#fbf9f4]">
             <div className="w-12 h-12 border-4 border-[#832729] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <BannerSlider banners={banners} />
        )
      ) : (
        <div className="pt-32 pb-8 text-center px-8">
          <Link to="/" className="text-xs uppercase tracking-widest text-gray-400 hover:text-[#832729] transition-colors inline-block mb-4">
            &larr; Back to all collections
          </Link>
          <h2 className="font-serif text-3xl text-aurelia-dark">Search Results for "{keyword}"</h2>
        </div>
      )}

      {/* Featured Products / Search Results Section */}
      <section className={keyword ? "pb-24 px-8 max-w-7xl mx-auto" : "py-16 px-8 max-w-7xl mx-auto"}>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-[#c2a773] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <p className="text-red-500 text-center py-20">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Home;
