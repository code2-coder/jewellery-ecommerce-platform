import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../redux/slices/cartSlice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CheckoutSteps from "../components/CheckoutSteps";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || "");
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <div className="min-h-screen bg-aurelia-light flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto px-8 py-32 w-full">
        <CheckoutSteps step1 step2 />

        <div className="bg-white p-8 md:p-12 border border-gray-100 shadow-sm mt-8">
          <h1 className="font-serif text-3xl text-aurelia-dark mb-2">Shipping Address</h1>
          <p className="text-gray-500 text-sm mb-8">Please enter your delivery details for your bespoke items.</p>

          <form onSubmit={submitHandler} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Address</label>
              <input
                type="text"
                placeholder="123 Luxury Lane"
                className="input-elegant"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">City</label>
                <input
                  type="text"
                  placeholder="Paris"
                  className="input-elegant"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Postal Code</label>
                <input
                  type="text"
                  placeholder="75001"
                  className="input-elegant"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Country</label>
              <input
                type="text"
                placeholder="France"
                className="input-elegant"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-gold w-full mt-8">
              Continue to Payment
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shipping;
