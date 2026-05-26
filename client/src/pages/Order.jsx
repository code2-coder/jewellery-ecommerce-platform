import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, deliverOrder } from "../redux/slices/orderSlice";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Order = () => {
  const { id: orderId } = useParams();
  const dispatch = useDispatch();

  const { order, loading, error } = useSelector((state) => state.order);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);

  const deliverHandler = async () => {
    try {
      await dispatch(deliverOrder(orderId)).unwrap();
      toast.success("Order marked as delivered");
      dispatch(getOrderDetails(orderId));
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-aurelia-light flex flex-col">
      <Navbar />
      <Toaster position="top-center" />

      <main className="flex-1 max-w-7xl mx-auto px-8 py-32 w-full">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-[#c2a773] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <p className="text-red-500 bg-red-50 p-4">{error}</p>
        ) : !order ? (
          <p>Order not found</p>
        ) : (
          <>
            <h1 className="font-serif text-3xl text-aurelia-dark mb-8 uppercase tracking-widest">
              Order <span className="text-gray-400">#{order._id}</span>
            </h1>

            <div className="flex flex-col lg:flex-row gap-16 items-start">
              {/* Order Info */}
              <div className="w-full lg:w-2/3 divide-y divide-gray-100">
                <div className="pb-8">
                  <h2 className="font-serif text-2xl mb-4 text-aurelia-dark">Shipping</h2>
                  <p className="text-gray-500 mb-2">
                    <strong>Name: </strong> {order.user.name}
                  </p>
                  <p className="text-gray-500 mb-4">
                    <strong>Address: </strong>
                    {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                    {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <div className="bg-green-50 text-green-700 p-4 text-sm font-medium border border-green-100">
                      Delivered on {new Date(order.deliveredAt).toLocaleString()}
                    </div>
                  ) : (
                    <div className="bg-amber-50 text-amber-700 p-4 text-sm font-medium border border-amber-100">
                      Not Delivered
                    </div>
                  )}
                </div>

                <div className="py-8">
                  <h2 className="font-serif text-2xl mb-4 text-aurelia-dark">Payment Method</h2>
                  <p className="text-gray-500 mb-4">
                    <strong>Method: </strong>
                    {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <div className="bg-green-50 text-green-700 p-4 text-sm font-medium border border-green-100">
                      Paid on {new Date(order.paidAt).toLocaleString()}
                    </div>
                  ) : (
                    <div className="bg-amber-50 text-amber-700 p-4 text-sm font-medium border border-amber-100">
                      Not Paid (Test mode: Assuming paid for now)
                    </div>
                  )}
                </div>

                <div className="py-8">
                  <h2 className="font-serif text-2xl mb-6 text-aurelia-dark">Order Items</h2>
                  <div className="space-y-6">
                    {order.orderItems.map((item, index) => (
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
                </div>
              </div>

              {/* Order Summary & Actions */}
              <div className="w-full lg:w-1/3 bg-white p-8 border border-gray-100 shadow-sm sticky top-32">
                <h2 className="font-serif text-2xl border-b border-gray-100 pb-4 mb-6">Order Summary</h2>

                <div className="space-y-4 mb-8 text-sm">
                  <div className="flex justify-between text-gray-500">
                    <span>Items</span>
                    <span>${order.itemsPrice}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Shipping</span>
                    <span>${order.shippingPrice}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Tax</span>
                    <span>${order.taxPrice}</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6 flex justify-between items-center mb-8">
                  <span className="font-serif text-lg">Total</span>
                  <span className="font-serif text-2xl text-aurelia-gold">${order.totalPrice}</span>
                </div>

                {userInfo && userInfo.role === "admin" && !order.isDelivered && (
                  <button onClick={deliverHandler} className="btn-gold w-full mt-4">
                    Mark As Delivered
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Order;
