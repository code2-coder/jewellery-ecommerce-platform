import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit, FiTrash2, FiCheck, FiX } from "react-icons/fi";
import { getAllUsers, deleteUser } from "../../redux/slices/authSlice";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const UserList = () => {
  const dispatch = useDispatch();

  const { users, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await dispatch(deleteUser(id)).unwrap();
        toast.success("User deleted successfully");
        dispatch(getAllUsers());
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
        <h1 className="font-serif text-4xl text-aurelia-dark mb-8">Users Dashboard</h1>

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
                    <th className="px-6 py-4 font-medium">Email</th>
                    <th className="px-6 py-4 font-medium">Admin</th>
                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-gray-400 font-mono text-xs">{user._id.substring(0, 8)}...</td>
                      <td className="px-6 py-4 font-medium text-aurelia-dark">{user.name}</td>
                      <td className="px-6 py-4 text-gray-500">
                        <a href={`mailto:${user.email}`} className="hover:text-aurelia-gold">{user.email}</a>
                      </td>
                      <td className="px-6 py-4">
                        {user.role === "admin" ? (
                          <FiCheck className="text-green-500 text-xl" />
                        ) : (
                          <FiX className="text-red-500 text-xl" />
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link to={`/admin/user/${user._id}/edit`} className="inline-block p-2 text-gray-400 hover:text-aurelia-gold transition-colors">
                          <FiEdit className="text-lg" />
                        </Link>
                        <button 
                          onClick={() => deleteHandler(user._id)} 
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

export default UserList;
