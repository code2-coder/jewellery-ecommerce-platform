import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import { fetchProducts, createProduct, deleteProduct } from "../../redux/slices/productSlice";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await dispatch(deleteProduct(id)).unwrap();
        toast.success("Product deleted successfully");
        dispatch(fetchProducts());
      } catch (err) {
        toast.error(err);
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        const newProduct = await dispatch(createProduct()).unwrap();
        toast.success("Product created successfully");
        navigate(`/admin/product/${newProduct._id}/edit`);
      } catch (err) {
        toast.error(err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-aurelia-light flex flex-col">
      <Navbar />
      <Toaster position="top-center" />

      <main className="flex-1 max-w-7xl mx-auto px-8 py-32 w-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-serif text-4xl text-aurelia-dark">Products Dashboard</h1>
          <button onClick={createProductHandler} className="btn-gold flex items-center text-xs">
            <FiPlus className="mr-2 text-lg" /> Create Product
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-[#c2a773] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <p className="text-red-500 text-center py-20 bg-red-50">{error}</p>
        ) : (
          <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f9f8f6] text-xs uppercase tracking-widest text-gray-500 border-b border-gray-100">
                    <th className="px-6 py-4 font-medium">ID</th>
                    <th className="px-6 py-4 font-medium">Name</th>
                    <th className="px-6 py-4 font-medium">Price</th>
                    <th className="px-6 py-4 font-medium">Category</th>
                    <th className="px-6 py-4 font-medium">Brand</th>
                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {products.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-gray-400 font-mono text-xs">{product._id.substring(0, 8)}...</td>
                      <td className="px-6 py-4 font-serif text-aurelia-dark">{product.name}</td>
                      <td className="px-6 py-4">${product.price.toLocaleString()}</td>
                      <td className="px-6 py-4">{product.category}</td>
                      <td className="px-6 py-4">{product.brand}</td>
                      <td className="px-6 py-4 text-right">
                        <Link to={`/admin/product/${product._id}/edit`} className="inline-block p-2 text-gray-400 hover:text-aurelia-gold transition-colors">
                          <FiEdit className="text-lg" />
                        </Link>
                        <button 
                          onClick={() => deleteHandler(product._id)} 
                          className="inline-block p-2 text-gray-400 hover:text-red-500 transition-colors ml-2"
                        >
                          <FiTrash2 className="text-lg" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductList;
