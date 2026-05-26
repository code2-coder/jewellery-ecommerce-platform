import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryDetails, updateCategory, resetCategoryState } from "../../redux/slices/categorySlice";
import api from "../../services/api";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const CategoryEdit = () => {
  const { id: categoryId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const [uploading, setUploading] = useState(false);

  const { category, loading, error, successUpdate } = useSelector((state) => state.category);

  useEffect(() => {
    if (successUpdate) {
      dispatch(resetCategoryState());
      navigate("/admin/categories");
    } else {
      if (!category || category._id !== categoryId) {
        dispatch(fetchCategoryDetails(categoryId));
      } else {
        setName(category.name);
        setImage(category.image);
        setLink(category.link);
      }
    }
  }, [dispatch, navigate, categoryId, category, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await api.post("/upload", formData, config);
      setImage(data.image); // Cloudinary URL
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateCategory({
        _id: categoryId,
        name,
        image,
        link,
      })
    );
  };

  return (
    <div className="min-h-screen bg-tanishq-cream flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-32 px-8 max-w-3xl mx-auto w-full pb-20">
        <Link to="/admin/categories" className="text-xs uppercase tracking-widest text-gray-500 hover:text-[#832729] mb-8 inline-block">
          &larr; Go Back to Directory
        </Link>
        
        <h1 className="font-serif text-3xl text-gray-800 mb-8">Edit Category</h1>
        
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-[#832729] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <p className="text-red-500 bg-red-50 p-4 mb-6">{error}</p>
        ) : (
          <div className="bg-white shadow-sm border border-gray-100 p-8 rounded">
            <form onSubmit={submitHandler} className="space-y-6">
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Category Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-[#c5a880]"
                  placeholder="e.g. Rings"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Category Round Icon Image URL</label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-[#c5a880] mb-3"
                  placeholder="Enter image URL or upload file below"
                  required
                />
                
                <input
                  type="file"
                  id="image-file"
                  onChange={uploadFileHandler}
                  className="text-xs text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:border-0 file:text-[10px] file:font-semibold file:uppercase file:tracking-widest file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100 cursor-pointer"
                />
                {uploading && <span className="text-xs text-[#832729] ml-2 animate-pulse">Uploading...</span>}
                
                {image && (
                  <div className="mt-6 flex justify-center border border-gray-100 p-4 bg-gray-50/50">
                    <div className="text-center">
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2 font-bold">Rounded Icon Preview:</p>
                      {/* Shop By Category Rounded Circle Preview */}
                      <div className="w-24 h-24 mx-auto rounded-full border-2 border-[#c5a880] p-1 overflow-hidden bg-white flex items-center justify-center shadow-md">
                        <img src={image} alt="Preview" className="w-full h-full rounded-full object-cover" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Redirect Search Path URL</label>
                <input
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-[#c5a880]"
                  placeholder="e.g. /search/rings"
                />
              </div>

              <button type="submit" className="w-full bg-[#832729] text-white py-4 text-xs font-semibold uppercase tracking-widest hover:bg-[#6c1e20] transition-colors shadow-md">
                Update Category
              </button>
            </form>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CategoryEdit;
