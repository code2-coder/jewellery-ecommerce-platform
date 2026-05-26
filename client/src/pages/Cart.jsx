import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiTrash2 } from "react-icons/fi";
import { addToCart, removeFromCart } from "../redux/slices/cartSlice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="min-h-screen bg-aurelia-light flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-8 py-32 w-full">
        <h1 className="font-serif text-4xl text-aurelia-dark mb-12">Shopping Bag</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-white border border-gray-100 shadow-sm">
            <h2 className="font-serif text-2xl mb-4 text-gray-500">Your bag is empty</h2>
            <p className="text-sm text-gray-400 mb-8">Discover our fine jewelry collections to find your next masterpiece.</p>
            <Link to="/" className="btn-outline">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            {/* Cart Items List */}
            <div className="w-full lg:w-2/3 divide-y divide-gray-100">
              {cartItems.map((item) => (
                <div key={item._id} className="py-8 flex flex-col sm:flex-row items-center gap-8">
                  <div className="w-32 h-32 bg-[#f9f8f6] border border-gray-50 p-2 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <Link to={`/product/${item._id}`} className="font-serif text-lg text-aurelia-dark hover:text-aurelia-gold transition-colors">
                      {item.name}
                    </Link>
                    <p className="text-gray-400 text-xs tracking-widest uppercase mt-2">{item.brand}</p>
                    <p className="text-aurelia-gold font-medium mt-4">${item.price.toLocaleString()}</p>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="flex items-center bg-white border border-gray-200 rounded overflow-hidden shadow-[inset_0_1px_3px_rgba(0,0,0,0.01)]">
                      {/* Minus Button */}
                      <button
                        type="button"
                        onClick={() => addToCartHandler(item, Math.max(1, item.qty - 1))}
                        disabled={item.qty <= 1}
                        className="w-8 h-8 flex items-center justify-center text-xs font-bold text-gray-500 hover:bg-gray-50 hover:text-[#832729] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-500 transition-colors cursor-pointer border-r border-gray-100 select-none"
                      >
                        —
                      </button>

                      {/* Current Quantity */}
                      <span className="w-10 text-center text-xs font-bold text-gray-800 select-none">
                        {item.qty}
                      </span>

                      {/* Plus Button */}
                      <button
                        type="button"
                        onClick={() => addToCartHandler(item, Math.min(item.countInStock, item.qty + 1))}
                        disabled={item.qty >= item.countInStock}
                        className="w-8 h-8 flex items-center justify-center text-xs font-bold text-gray-500 hover:bg-gray-50 hover:text-[#832729] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-500 transition-colors cursor-pointer border-l border-gray-100 select-none"
                      >
                        ＋
                      </button>
                    </div>

                    <button 
                      onClick={() => removeFromCartHandler(item._id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      title="Remove Item"
                    >
                      <FiTrash2 className="text-xl" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-1/3 bg-white p-8 border border-gray-100 shadow-sm sticky top-32">
              <h2 className="font-serif text-2xl border-b border-gray-100 pb-4 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-8 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                  <span className="font-medium">${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6 mb-8 flex justify-between items-center">
                <span className="font-serif text-lg">Estimated Total</span>
                <span className="font-serif text-xl text-aurelia-gold">${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toLocaleString()}</span>
              </div>

              <button 
                type="button"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
                className="btn-gold w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Proceed to Checkout
              </button>

              <p className="text-xs text-center text-gray-400 mt-6 tracking-wide">Secure Checkout via Stripe</p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
