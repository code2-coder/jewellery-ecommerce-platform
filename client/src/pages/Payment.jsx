import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../redux/slices/cartSlice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CheckoutSteps from "../components/CheckoutSteps";

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <div className="min-h-screen bg-aurelia-light flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto px-8 py-32 w-full">
        <CheckoutSteps step1 step2 step3 />

        <div className="bg-white p-8 md:p-12 border border-gray-100 shadow-sm mt-8">
          <h1 className="font-serif text-3xl text-aurelia-dark mb-2">Payment Method</h1>
          <p className="text-gray-500 text-sm mb-8">Select your preferred secure payment method.</p>

          <form onSubmit={submitHandler} className="space-y-6">
            <div className="space-y-4">
              <label className="flex items-center space-x-4 cursor-pointer p-4 border border-gray-200 hover:border-aurelia-gold transition-colors">
                <input
                  type="radio"
                  className="w-5 h-5 accent-aurelia-gold"
                  id="PayPal"
                  name="paymentMethod"
                  value="PayPal"
                  checked={paymentMethod === "PayPal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="font-medium text-aurelia-dark text-lg">PayPal or Credit Card</span>
              </label>

              <label className="flex items-center space-x-4 cursor-pointer p-4 border border-gray-200 hover:border-aurelia-gold transition-colors">
                <input
                  type="radio"
                  className="w-5 h-5 accent-aurelia-gold"
                  id="Stripe"
                  name="paymentMethod"
                  value="Stripe"
                  checked={paymentMethod === "Stripe"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="font-medium text-aurelia-dark text-lg">Stripe</span>
              </label>
            </div>

            <button type="submit" className="btn-gold w-full mt-8">
              Continue to Review Order
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Payment;
