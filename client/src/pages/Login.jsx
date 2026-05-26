import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice";
import api from "../services/api";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      if (userInfo.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await api.post("/auth/login", { email, password });
      dispatch(setCredentials(data));
      toast.success("Successfully logged in!");
      if (data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-tanishq-cream flex flex-col">
      <Navbar />
      <Toaster position="top-center" />
      
      <div className="flex-1 flex mt-20">
        {/* Left Side - Luxury Image Backdrop */}
        <div className="hidden lg:flex w-1/2 bg-[#832729]/10 relative items-center justify-center overflow-hidden border-r border-gray-100">
          <div className="absolute inset-0 bg-gradient-to-t from-[#832729]/75 to-transparent z-10" />
          <img src="/images/large_gold_ring.png" className="absolute inset-0 w-full h-full object-cover opacity-85 blur-sm scale-110" alt="" />
          <h2 className="z-20 font-serif text-5xl text-white max-w-md text-center leading-tight drop-shadow-lg tracking-wide">
            Welcome Back to Elegance
          </h2>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 bg-tanishq-cream">
          <div className="w-full max-w-md">
            <h1 className="font-serif text-4xl mb-2 text-gray-800 font-bold">Sign In</h1>
            <p className="text-gray-500 mb-10 text-sm">Access your Shreeharikripa account to view bespoke collections and past orders.</p>

            <form onSubmit={submitHandler} className="space-y-8">
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="input-elegant"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Password"
                  className="input-elegant"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center justify-between mt-2">
                <label className="flex items-center text-sm text-gray-500">
                  <input type="checkbox" className="mr-2 accent-[#832729]" />
                  Remember me
                </label>
                <a href="#" className="text-sm text-[#832729] hover:underline font-semibold">Forgot password?</a>
              </div>

              <button 
                type="submit" 
                className="btn-gold w-full mt-8"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link to="/register" className="text-[#832729] hover:underline font-semibold">
                Create an Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
