import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBannerDetails, updateBanner, resetBannerState } from "../../redux/slices/bannerSlice";
import api from "../../services/api";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const BannerEdit = () => {
  const { id: bannerId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [uploading, setUploading] = useState(false);

  const { banner, loading, error, successUpdate } = useSelector((state) => state.banner);

  useEffect(() => {
    if (successUpdate) {
      dispatch(resetBannerState());
      navigate("/admin/banners");
    } else {
      if (!banner || banner._id !== bannerId) {
        dispatch(getBannerDetails(bannerId));
      } else {
        setImage(banner.image);
        setLink(banner.link);
        setIsActive(banner.isActive);
      }
    }
  }, [dispatch, navigate, bannerId, banner, successUpdate]);

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
      updateBanner({
        _id: bannerId,
        image,
        link,
        isActive,
      })
    );
  };

  return (
    <div className="min-h-screen bg-tanishq-cream flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-32 px-8 max-w-3xl mx-auto w-full pb-20">
        <Link to="/admin/banners" className="text-xs uppercase tracking-widest text-gray-500 hover:text-[#832729] mb-8 inline-block">
          &larr; Go Back to Directory
        </Link>
        
        <h1 className="font-serif text-3xl text-gray-800 mb-8">Edit Campaign Banner</h1>
        
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
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Campaign Image URL</label>
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
                {uploading && <span className="text-xs text-[#832729] ml-2 animate-pulse">Uploading to Cloudinary...</span>}
                
                {image && (
                  <div className="mt-6 border border-gray-100 p-2 bg-gray-50/50">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2 font-bold">Banner Live Preview:</p>
                    <img src={image} alt="Preview" className="w-full max-h-60 object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Campaign Redirect Link URL</label>
                <input
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-[#c5a880]"
                  placeholder="e.g. /search/rings"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="mr-2 accent-[#832729]"
                />
                <label htmlFor="isActive" className="text-xs uppercase tracking-wider font-semibold text-gray-600">Display this banner on homepage</label>
              </div>

              <button type="submit" className="w-full bg-[#832729] text-white py-4 text-xs font-semibold uppercase tracking-widest hover:bg-[#6c1e20] transition-colors shadow-md">
                Update Campaign Banner
              </button>
            </form>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BannerEdit;
