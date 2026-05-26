import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../redux/slices/authSlice";
import { getMyOrders } from "../redux/slices/orderSlice";
import toast, { Toaster } from "react-hot-toast";
import { FiPackage, FiSettings, FiX } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { myOrders, loading: loadingOrders, error: errorOrders } = useSelector((state) => state.order);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPhone(userInfo.phone || "");
      setAddress(userInfo.address || "");
      dispatch(getMyOrders());
    }
  }, [dispatch, navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        await dispatch(
          updateUserProfile({
            _id: userInfo._id,
            name,
            email,
            password,
            phone,
            address,
          })
        ).unwrap();
        toast.success("Profile Updated Successfully");
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
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* User Settings Form */}
          <div className="w-full lg:w-1/3">
            <h2 className="font-serif text-3xl text-aurelia-dark mb-8 flex items-center">
              <FiSettings className="mr-3 text-aurelia-gold" /> Account Settings
            </h2>
            
            {userInfo && userInfo.role === "admin" && (
              <Link to="/admin/dashboard" className="block w-full bg-[#1c1c1c] text-[#c2a773] border border-[#c2a773] text-center py-4 mb-8 text-xs font-medium uppercase tracking-widest hover:bg-[#c2a773] hover:text-white transition-colors">
                Open Admin Dashboard
              </Link>
            )}

            <div className="bg-white p-8 border border-gray-100 shadow-sm">
              <form onSubmit={submitHandler} className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Name</label>
                  <input type="text" className="input-elegant" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                  <input type="email" className="input-elegant" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Phone Number</label>
                  <input type="tel" className="input-elegant" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (555) 000-0000" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Default Address</label>
                  <textarea rows="3" className="input-elegant" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 Luxury Lane, Paris, 75001, France"></textarea>
                </div>
                <div className="border-t border-gray-100 pt-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <input type="password" placeholder="New Password" className="input-elegant" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input type="password" placeholder="Confirm New Password" className="input-elegant" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                  </div>
                </div>
                <button type="submit" className="btn-gold w-full mt-8">Update Profile</button>
              </form>
            </div>
          </div>

          {/* Order History */}
          <div className="w-full lg:w-2/3">
            <h2 className="font-serif text-3xl text-aurelia-dark mb-8 flex items-center">
              <FiPackage className="mr-3 text-aurelia-gold" /> Order History
            </h2>
            
            {loadingOrders ? (
              <div className="flex justify-center py-20">
                <div className="w-8 h-8 border-4 border-[#c2a773] border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : errorOrders ? (
              <p className="text-red-500 bg-red-50 p-4 border border-red-100">{errorOrders}</p>
            ) : myOrders.length === 0 ? (
              <div className="bg-white p-12 border border-gray-100 shadow-sm text-center">
                <p className="text-gray-500 mb-6">You have not placed any orders yet.</p>
                <Link to="/" className="btn-gold">Discover Collections</Link>
              </div>
            ) : (
              <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#f9f8f6] text-xs uppercase tracking-widest text-gray-500 border-b border-gray-100">
                        <th className="px-6 py-4 font-medium">Order ID</th>
                        <th className="px-6 py-4 font-medium">Date</th>
                        <th className="px-6 py-4 font-medium">Total</th>
                        <th className="px-6 py-4 font-medium">Status</th>
                        <th className="px-6 py-4 font-medium">Delivery</th>
                        <th className="px-6 py-4 font-medium text-right">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                      {myOrders.map((order) => (
                        <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-gray-400 font-mono text-xs">{order._id.substring(0, 8)}...</td>
                          <td className="px-6 py-4 text-gray-600">{order.createdAt.substring(0, 10)}</td>
                          <td className="px-6 py-4 font-serif">${order.totalPrice.toLocaleString()}</td>
                          <td className="px-6 py-4">
                            {order.isPaid ? (
                              <span className="text-green-600 font-medium">Paid</span>
                            ) : (
                              <span className="text-amber-500 font-medium">Pending</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {order.isDelivered ? (
                              <span className="text-green-600 font-medium">Delivered</span>
                            ) : (
                              <span className="text-amber-500 font-medium">Processing</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Link to={`/order/${order._id}`} className="text-xs font-medium uppercase tracking-widest text-aurelia-gold hover:underline">
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
