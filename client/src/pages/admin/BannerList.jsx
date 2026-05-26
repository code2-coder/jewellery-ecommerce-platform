import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBanners, deleteBanner, createBanner, resetBannerState } from "../../redux/slices/bannerSlice";
import { FiEdit2, FiTrash2, FiPlus, FiCheck, FiX } from "react-icons/fi";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const BannerList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { banners, loading, error, successCreate, banner } = useSelector((state) => state.banner);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(resetBannerState());

    if (!userInfo || userInfo.role !== "admin") {
      navigate("/login");
    }

    if (successCreate) {
      navigate(`/admin/banner/${banner._id}/edit`);
    } else {
      dispatch(fetchAllBanners());
    }
  }, [dispatch, navigate, userInfo, successCreate, banner]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      dispatch(deleteBanner(id)).then(() => dispatch(fetchAllBanners()));
    }
  };

  const createBannerHandler = () => {
    dispatch(createBanner());
  };

  return (
    <div className="min-h-screen bg-tanishq-cream flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-32 px-8 max-w-7xl mx-auto w-full pb-20">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-serif text-3xl text-gray-800">Banners Directory</h1>
          <button 
            onClick={createBannerHandler}
            className="flex items-center bg-[#832729] text-white px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#6c1e20] transition-all duration-300 shadow-md"
          >
            <FiPlus className="mr-2" /> Add Campaign Banner
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-[#832729] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <p className="text-red-500 bg-red-50 p-4">{error}</p>
        ) : (
          <div className="bg-white shadow-sm overflow-hidden border border-gray-100 rounded">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">ID</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Thumbnail (Category Style)</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Campaign Title</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {banners.map((banner) => (
                  <tr key={banner._id} className="hover:bg-gray-50/55 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-xs font-mono text-gray-400">{banner._id.substring(0, 8)}...</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {/* Shop By Category Rounded Gold Circle Style */}
                      <div className="w-14 h-14 rounded-full border-2 border-transparent hover:border-[#c5a880] p-0.5 overflow-hidden bg-gray-50 flex items-center justify-center shadow-sm transition-all duration-500 cursor-pointer">
                        <div className="w-full h-full rounded-full overflow-hidden bg-[#fbf9f4] flex items-center justify-center">
                          <img src={banner.image} alt={banner.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{banner.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {banner.isActive ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                          <FiCheck /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                          <FiX /> Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={`/admin/banner/${banner._id}/edit`} className="text-[#832729] hover:text-[#6c1e20] mr-5 inline-block transition-colors duration-300">
                        <FiEdit2 className="text-lg" />
                      </Link>
                      <button onClick={() => deleteHandler(banner._id)} className="text-red-500 hover:text-red-700 transition-colors duration-300">
                        <FiTrash2 className="text-lg" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BannerList;
