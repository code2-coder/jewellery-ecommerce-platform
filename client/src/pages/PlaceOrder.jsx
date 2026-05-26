import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, resetOrder } from "../redux/slices/orderSlice";
import { clearCartItems } from "../redux/slices/cartSlice";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CheckoutSteps from "../components/CheckoutSteps";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { order, success, error, loading } = useSelector((state) => state.order);

  useEffect(() => {
    if (success) {
      navigate(`/`); // Typically redirects to /order/:id, redirecting to home for now as placeholder
      dispatch(resetOrder());
      dispatch(clearCartItems());
      toast.success("Order Placed Successfully!");
    }
  }, [success, navigate, dispatch]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <div className="min-h-screen bg-aurelia-light flex flex-col">
      <Navbar />
      <Toaster position="top-center" />

      <main className="flex-1 max-w-7xl mx-auto px-8 py-32 w-full">
        <CheckoutSteps step1 step2 step3 step4 />

        <div className="flex flex-col lg:flex-row gap-16 items-start mt-8">
          {/* Order Details */}
          <div className="w-full lg:w-2/3 divide-y divide-gray-100">
            <div className="pb-8">
              <h2 className="font-serif text-2xl mb-4 text-aurelia-dark">Shipping</h2>
              <p className="text-gray-500">
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
              </p>
            </div>

            <div className="py-8">
              <h2 className="font-serif text-2xl mb-4 text-aurelia-dark">Payment Method</h2>
              <p className="text-gray-500">
                <strong>Method: </strong>
                {cart.paymentMethod}
              </p>
            </div>

            <div className="py-8">
              <h2 className="font-serif text-2xl mb-6 text-aurelia-dark">Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                <div className="space-y-6">
                  {cart.cartItems.map((item, index) => (
                    <div key={index} className="flex items-center space-x-6">
                      <div className="w-20 h-20 bg-[#f9f8f6] border border-gray-50 p-2">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <Link to={`/product/${item.product}`} className="flex-1 font-serif text-lg hover:text-aurelia-gold transition-colors">
                        {item.name}
                      </Link>
                      <div className="text-gray-500 text-sm">
                        {item.qty} x ${item.price.toLocaleString()} = ${(item.qty * item.price).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3 bg-white p-8 border border-gray-100 shadow-sm sticky top-32">
            <h2 className="font-serif text-2xl border-b border-gray-100 pb-4 mb-6">Order Summary</h2>

            <div className="space-y-4 mb-8 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Items</span>
                <span>${cart.itemsPrice}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span>${cart.shippingPrice}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Tax (15%)</span>
                <span>${cart.taxPrice}</span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6 mb-8 flex justify-between items-center">
              <span className="font-serif text-lg">Total</span>
              <span className="font-serif text-2xl text-aurelia-gold">${cart.totalPrice}</span>
            </div>

            {error && <p className="text-red-500 text-sm mb-4 bg-red-50 p-3">{error}</p>}

            <button
              type="button"
              className="btn-gold w-full"
              disabled={cart.cartItems === 0 || loading}
              onClick={placeOrderHandler}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PlaceOrder;
