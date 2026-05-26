import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById, fetchProducts, clearProductDetails } from "../redux/slices/productSlice";
import { addToCart } from "../redux/slices/cartSlice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState("");
  const [zoomStyle, setZoomStyle] = useState({ transformOrigin: "center center", transform: "scale(1)" });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2.2)",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transformOrigin: "center center",
      transform: "scale(1)",
    });
  };

  const { product, products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProductById(id));
    dispatch(fetchProducts(""));
    return () => {
      dispatch(clearProductDetails());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (product && product.image) {
      setActiveImage(product.image);
      setQty(1); // Reset quantity selector when loading a new product
    }
  }, [product]);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-tanishq-cream">
        <div className="w-16 h-16 border-4 border-[#832729] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-tanishq-cream">
        <p className="text-red-500 font-medium">{error}</p>
      </div>
    );
  }

  if (!product) return null;

  // Compile list of gallery images (fallback to product.image if product.images is empty)
  const galleryImages = product.images && product.images.length > 0 
    ? product.images 
    : (product.image ? [product.image] : []);

  // Filter out the current product from the list to suggest relevant related products
  const relatedProducts = products
    ? products
        .filter((p) => p._id !== product._id)
        .filter((p) => !product.category || p.category === product.category)
        .slice(0, 4)
    : [];

  // Fallback to any products in catalog if there are no exact category matches
  const fallbackRelatedProducts = relatedProducts.length > 0
    ? relatedProducts
    : (products ? products.filter((p) => p._id !== product._id).slice(0, 4) : []);

  return (
    <div className="min-h-screen bg-tanishq-cream flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-8 py-32 w-full">
        <div className="mb-8">
          <Link to="/" className="text-xs uppercase tracking-widest text-gray-500 hover:text-[#832729] mb-8 inline-block transition-colors">
            &larr; Back to Collections
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mb-24">
          {/* Product Image Gallery */}
          <div className="flex flex-col">
            {/* Main Active View with Dynamic Hover Magnifier Zoom */}
            <div 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="bg-white p-8 md:p-12 border border-gray-100 rounded relative overflow-hidden shadow-sm flex items-center justify-center min-h-[400px] cursor-zoom-in z-20"
            >
              <img
                src={activeImage || product.image}
                alt={product.name}
                style={zoomStyle}
                className="w-full max-h-[450px] object-contain drop-shadow-xl transition-transform duration-200 ease-out pointer-events-none"
              />
            </div>

            {/* Clickable Image Gallery Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="flex flex-wrap gap-4 mt-6">
                {galleryImages.map((imgUrl, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`w-20 h-20 bg-white border p-1 rounded overflow-hidden shadow-sm flex-shrink-0 transition-all duration-300 cursor-pointer ${
                      activeImage === imgUrl 
                        ? "border-[#832729] scale-105 ring-2 ring-[#832729]/10" 
                        : "border-gray-200 hover:border-[#c5a880]"
                    }`}
                    aria-label={`View angle ${index + 1}`}
                  >
                    <img src={imgUrl} alt={`Angle ${index + 1}`} className="w-full h-full object-cover rounded" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details Section */}
          <div className="bg-white p-8 md:p-12 border border-gray-100 rounded shadow-sm">
            <p className="text-[10px] tracking-[0.25em] uppercase font-bold text-[#c5a880] mb-3">{product.brand || "Atelier Shreeharikripa"}</p>
            <h1 className="font-serif text-3xl md:text-4xl text-gray-800 mb-6 leading-tight font-bold">{product.name}</h1>
            
            <p className="text-2xl text-[#832729] font-serif font-bold mb-8">
              ${product.price?.toLocaleString()}
            </p>
            
            <div className="w-full h-px bg-gray-200 mb-8"></div>
            
            <p className="text-gray-500 text-sm leading-relaxed mb-10">
              {product.description}
            </p>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-semibold text-gray-700">Availability:</span>
                <span className={`text-sm font-semibold ${product.countInStock > 0 ? "text-green-600" : "text-red-500"}`}>
                  {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              {product.countInStock > 0 && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 pt-4">
                  {/* Luxury Plus/Minus Qty Selector */}
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-semibold text-gray-700 mr-2">Qty:</span>
                    <div className="flex items-center bg-white border border-gray-200 rounded overflow-hidden shadow-[inset_0_1px_3px_rgba(0,0,0,0.01)]">
                      {/* Minus Button */}
                      <button
                        type="button"
                        onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                        disabled={qty <= 1}
                        className="w-10 h-10 flex items-center justify-center text-xs font-bold text-gray-500 hover:bg-gray-50 hover:text-[#832729] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-500 transition-colors cursor-pointer border-r border-gray-100 select-none"
                      >
                        —
                      </button>

                      {/* Current Quantity */}
                      <span className="w-12 text-center text-sm font-bold text-gray-800 select-none">
                        {qty}
                      </span>

                      {/* Plus Button */}
                      <button
                        type="button"
                        onClick={() => setQty((prev) => Math.min(product.countInStock, prev + 1))}
                        disabled={qty >= product.countInStock}
                        className="w-10 h-10 flex items-center justify-center text-xs font-bold text-gray-500 hover:bg-gray-50 hover:text-[#832729] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-500 transition-colors cursor-pointer border-l border-gray-100 select-none"
                      >
                        ＋
                      </button>
                    </div>
                  </div>
                  
                  <button 
                    onClick={addToCartHandler}
                    className="w-full sm:w-auto bg-[#832729] hover:bg-[#6c1e20] text-white hover:text-[#c5a880] px-12 py-4 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-500 shadow-md rounded animate-pulse"
                  >
                    Add to Shopping Bag
                  </button>
                </div>
              )}
            </div>

            <div className="mt-12 text-xs text-gray-400 space-y-2 border-t border-gray-100 pt-8 tracking-wide">
              <p>✓ Insured express delivery with secure royal packaging.</p>
              <p>✓ Includes a certified Shreeharikripa Authenticity Card and luxury presentation box.</p>
            </div>
          </div>
        </div>

        {/* Premium Related Products Section */}
        {fallbackRelatedProducts.length > 0 && (
          <div className="border-t border-[#c5a880]/30 pt-16 mt-8">
            <div className="text-center mb-12">
              <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#c5a880] mb-2">Curated Recommendation</p>
              <h2 className="font-serif text-3xl text-gray-800 font-bold">You May Also Exquisite</h2>
              <div className="w-24 h-[2px] bg-[#832729] mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {fallbackRelatedProducts.map((item) => (
                <div key={item._id} className="group relative bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 flex flex-col h-full">
                  <Link to={`/product/${item._id}`} className="block relative aspect-square overflow-hidden bg-[#fbf9f4] p-6 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-[180px] object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-[9px] tracking-widest uppercase font-bold text-[#c5a880] mb-1">{item.brand || "Atelier"}</p>
                      <Link to={`/product/${item._id}`} className="font-serif text-sm font-bold text-gray-800 group-hover:text-[#832729] transition-colors line-clamp-1 block mb-2">
                        {item.name}
                      </Link>
                    </div>

                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-50">
                      <span className="text-[#832729] font-serif font-bold text-sm">
                        ${item.price?.toLocaleString()}
                      </span>
                      <Link to={`/product/${item._id}`} className="text-[10px] uppercase font-bold text-[#c5a880] tracking-widest hover:text-[#832729] transition-colors">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetails;
