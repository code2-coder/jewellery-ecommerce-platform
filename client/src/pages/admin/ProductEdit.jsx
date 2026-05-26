import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById, updateProduct } from "../../redux/slices/productSlice";
import { fetchCategories } from "../../redux/slices/categorySlice";
import toast, { Toaster } from "react-hot-toast";
import { FiUploadCloud, FiTrash2, FiX } from "react-icons/fi";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../services/api";

const ProductEdit = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const { product, loading, error } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
    if (!product || product._id !== productId) {
      dispatch(fetchProductById(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
      // Fallback to product.image if product.images is undefined or empty
      setImages(product.images && product.images.length > 0 ? product.images : (product.image ? [product.image] : []));
    }
  }, [dispatch, productId, product]);

  const uploadMultipleFilesHandler = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    const uploadedUrls = [];

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      for (const file of files) {
        const formData = new FormData();
        formData.append("image", file);
        const { data } = await api.post("/upload", formData, config);
        uploadedUrls.push(data.image); // Cloudinary URL
      }

      setImages((prev) => [...prev, ...uploadedUrls]);
      setUploading(false);
      toast.success(`${files.length} image(s) uploaded successfully!`);
    } catch (err) {
      console.error(err);
      setUploading(false);
      toast.error("Failed to upload one or more images");
    }
  };

  const removeImageHandler = (indexToRemove) => {
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    toast.success("Image removed from gallery");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    try {
      await dispatch(
        updateProduct({
          _id: productId,
          name,
          price,
          images, // Array of strings
          brand,
          category,
          description,
          countInStock,
        })
      ).unwrap();
      toast.success("Product updated successfully");
      navigate("/admin/products");
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-tanishq-cream flex flex-col">
      <Navbar />
      <Toaster position="top-center" />

      <main className="flex-1 max-w-3xl mx-auto px-8 py-32 w-full">
        <Link to="/admin/products" className="text-xs uppercase tracking-widest text-gray-500 hover:text-[#832729] mb-8 inline-block">
          &larr; Go Back to Inventory
        </Link>

        <div className="bg-white p-8 md:p-12 border border-gray-100 shadow-sm rounded">
          <h1 className="font-serif text-3xl text-gray-800 mb-8">Edit Product</h1>

          {loading ? (
            <div className="flex justify-center py-10">
              <div className="w-8 h-8 border-4 border-[#832729] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <p className="text-red-500 bg-red-50 p-4">{error}</p>
          ) : (
            <form onSubmit={submitHandler} className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold">Product Name</label>
                <input type="text" className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-[#c5a880] rounded" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold">Price ($)</label>
                  <input type="number" className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-[#c5a880] rounded" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold">Count In Stock</label>
                  <input type="number" className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-[#c5a880] rounded" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} required />
                </div>
              </div>

              {/* Multiple Image Uploader & Preview Panel */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-3 font-bold">Product Image Gallery</label>
                
                {/* Upload Zone */}
                <div className="border-2 border-dashed border-gray-200 hover:border-[#c5a880] hover:bg-[#fbf9f4]/45 rounded-xl p-8 text-center cursor-pointer transition-all duration-300 relative">
                  <input
                    type="file"
                    id="images-file"
                    multiple
                    onChange={uploadMultipleFilesHandler}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                    accept="image/*"
                  />
                  <FiUploadCloud className="text-3xl text-gray-400 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-600 mb-1">Click or drag images here to upload</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Supports multiple file selections (Cloudinary)</p>
                </div>

                {uploading && (
                  <p className="text-xs text-[#832729] font-medium mt-3 animate-pulse">Uploading files to Cloudinary...</p>
                )}

                {/* Horizontal list preview of uploaded images */}
                {images.length > 0 && (
                  <div className="mt-6 border border-gray-100 p-4 bg-gray-50/50 rounded">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-3">Gallery Preview ({images.length}):</p>
                    <div className="flex flex-wrap gap-4">
                      {images.map((imgUrl, index) => (
                        <div key={index} className="relative w-20 h-20 bg-white border border-gray-200 rounded p-1 group flex items-center justify-center">
                          <img src={imgUrl} alt={`Product ${index}`} className="w-full h-full object-cover rounded" />
                          <button
                            type="button"
                            onClick={() => removeImageHandler(index)}
                            className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center shadow-md hover:bg-red-600 transition-colors cursor-pointer"
                            title="Remove image"
                          >
                            <FiX className="text-xs" />
                          </button>
                          {index === 0 && (
                            <span className="absolute bottom-0 inset-x-0 bg-[#832729] text-white text-[8px] font-bold text-center py-0.5 rounded-b uppercase tracking-wider">Cover</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold">Brand</label>
                  <input type="text" className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-[#c5a880] rounded" value={brand} onChange={(e) => setBrand(e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold">Category Selection</label>
                  <select 
                    className="w-full border border-gray-200 p-3.5 text-sm focus:outline-none focus:border-[#c5a880] bg-white rounded cursor-pointer"
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="">Select Category...</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold">Description</label>
                <textarea rows="4" className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-[#c5a880] rounded" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
              </div>

              <button type="submit" className="w-full bg-[#832729] text-white py-4 text-xs font-semibold uppercase tracking-widest hover:bg-[#6c1e20] transition-colors shadow-md rounded">
                Update Product Details
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductEdit;
