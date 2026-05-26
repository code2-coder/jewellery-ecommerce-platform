import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../redux/slices/orderSlice";
import { FiEye } from "react-icons/fi";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const OrderList = () => {
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-aurelia-light flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-8 py-32 w-full">
        <h1 className="font-serif text-4xl text-aurelia-dark mb-8">Orders Dashboard</h1>

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
                    <th className="px-6 py-4 font-medium">User</th>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium">Total</th>
                    <th className="px-6 py-4 font-medium">Paid</th>
                    <th className="px-6 py-4 font-medium">Delivered</th>
                    <th className="px-6 py-4 font-medium text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-gray-400 font-mono text-xs">{order._id.substring(0, 8)}...</td>
                      <td className="px-6 py-4 font-medium text-aurelia-dark">{order.user ? order.user.name : "Deleted User"}</td>
                      <td className="px-6 py-4 text-gray-500">{order.createdAt.substring(0, 10)}</td>
                      <td className="px-6 py-4 font-serif">${order.totalPrice.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        {order.isPaid ? (
                          <span className="text-green-600 font-medium">Paid</span>
                        ) : (
                          <span className="text-red-500 font-medium">Pending</span>
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
                        <Link to={`/order/${order._id}`} className="inline-block p-2 text-gray-400 hover:text-aurelia-gold transition-colors">
                          <FiEye className="text-lg" />
                        </Link>
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

export default OrderList;
