import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUser } from "../../redux/slices/authSlice";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const UserEdit = () => {
  const { id: userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user || user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.role === "admin");
    }
  }, [dispatch, userId, user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        updateUser({
          _id: userId,
          name,
          email,
          role: isAdmin ? "admin" : "user",
        })
      ).unwrap();
      toast.success("User updated successfully");
      navigate("/admin/users");
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-aurelia-light flex flex-col">
      <Navbar />
      <Toaster position="top-center" />

      <main className="flex-1 max-w-2xl mx-auto px-8 py-32 w-full">
        <Link to="/admin/users" className="text-xs uppercase tracking-widest text-gray-400 hover:text-aurelia-gold transition-colors mb-8 inline-block">
          &larr; Go Back
        </Link>

        <div className="bg-white p-8 md:p-12 border border-gray-100 shadow-sm">
          <h1 className="font-serif text-3xl text-aurelia-dark mb-8">Edit User</h1>

          {loading ? (
            <div className="flex justify-center py-10">
              <div className="w-8 h-8 border-4 border-[#c2a773] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <p className="text-red-500 bg-red-50 p-4">{error}</p>
          ) : (
            <form onSubmit={submitHandler} className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Name</label>
                <input type="text" className="input-elegant" value={name} onChange={(e) => setName(e.target.value)} />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email</label>
                <input type="email" className="input-elegant" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="pt-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-aurelia-gold rounded border-gray-300"
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                  />
                  <span className="font-medium text-aurelia-dark">Is Admin</span>
                </label>
              </div>

              <button type="submit" className="btn-gold w-full mt-8">
                Update User
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserEdit;
