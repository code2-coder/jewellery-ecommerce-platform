import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice";
import api from "../services/api";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    try {
      setLoading(true);
      const { data } = await api.post("/auth/register", { name, email, password });
      dispatch(setCredentials(data));
      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-aurelia-light flex flex-col">
      <Navbar />
      <Toaster position="top-center" />
      
      <div className="flex-1 flex mt-20">
        {/* Left Side - Image */}
        <div className="hidden lg:flex w-1/2 bg-[#514337] relative items-center justify-center overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent z-10" />
          <h2 className="z-20 font-serif text-5xl text-white max-w-md text-center leading-tight">
            Begin Your Aurelia Journey
          </h2>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
          <div className="w-full max-w-md">
            <h1 className="font-serif text-4xl mb-2 text-aurelia-dark">Register</h1>
            <p className="text-gray-500 mb-10 text-sm">Join Shreeharikripa to track orders, save favorites, and enjoy bespoke services.</p>

            <form onSubmit={submitHandler} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="input-elegant"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

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

              <div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="input-elegant"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button 
                type="submit" 
                className="btn-gold w-full mt-6"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-aurelia-gold hover:underline font-medium">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
