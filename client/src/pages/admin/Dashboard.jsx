import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminSummary } from "../../redux/slices/adminSlice";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { FiUsers, FiShoppingBag, FiDollarSign, FiBox } from "react-icons/fi";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const COLORS = ['#832729', '#c5a880', '#1c1c1c', '#6b7280', '#e5e7eb'];

const Dashboard = () => {
  const dispatch = useDispatch();
  const { summary, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAdminSummary());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-[#f9f8f6] flex flex-col">
      <Navbar />

      <div className="flex-grow pt-32 px-8 max-w-7xl mx-auto w-full pb-20">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="font-serif text-4xl text-aurelia-dark">Overview</h1>
            <p className="text-sm text-gray-500 mt-1 uppercase tracking-widest">Store Performance Metrics</p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-32">
            <div className="w-12 h-12 border-4 border-[#832729] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-100 p-6 rounded-lg text-red-600 text-center">
            <p className="font-medium">Failed to load dashboard data</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        ) : summary ? (
          <div className="space-y-10">
            
            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Link to="/admin/products" className="bg-white p-5 border border-gray-100 rounded-xl text-center hover:shadow-md transition-all group flex flex-col items-center justify-center">
                <FiBox className="text-2xl mb-2 text-[#832729] group-hover:scale-110 transition-transform" />
                <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-600 group-hover:text-black">Manage Products</span>
              </Link>
              <Link to="/admin/banners" className="bg-white p-5 border border-gray-100 rounded-xl text-center hover:shadow-md transition-all group flex flex-col items-center justify-center">
                <span className="text-2xl mb-2 text-[#832729] group-hover:scale-110 transition-transform">🖼️</span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-600 group-hover:text-black">Manage Banners</span>
              </Link>
              <Link to="/admin/categories" className="bg-white p-5 border border-gray-100 rounded-xl text-center hover:shadow-md transition-all group flex flex-col items-center justify-center">
                <span className="text-2xl mb-2 text-[#832729] group-hover:scale-110 transition-transform">🏷️</span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-600 group-hover:text-black">Manage Categories</span>
              </Link>
              <Link to="/admin/orders" className="bg-white p-5 border border-gray-100 rounded-xl text-center hover:shadow-md transition-all group flex flex-col items-center justify-center">
                <FiShoppingBag className="text-2xl mb-2 text-[#832729] group-hover:scale-110 transition-transform" />
                <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-600 group-hover:text-black">Manage Orders</span>
              </Link>
              <Link to="/admin/users" className="bg-white p-5 border border-gray-100 rounded-xl text-center hover:shadow-md transition-all group flex flex-col items-center justify-center">
                <FiUsers className="text-2xl mb-2 text-[#832729] group-hover:scale-110 transition-transform" />
                <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-600 group-hover:text-black">Manage Users</span>
              </Link>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="bg-white p-6 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#832729]/10 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out"></div>
                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Total Revenue</p>
                    <p className="text-3xl font-serif text-aurelia-dark">${summary.sales.toLocaleString()}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                    <FiDollarSign className="text-lg text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#832729]/10 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out"></div>
                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Total Orders</p>
                    <p className="text-3xl font-serif text-aurelia-dark">{summary.orders}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <FiShoppingBag className="text-lg text-blue-500" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#832729]/10 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out"></div>
                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Total Customers</p>
                    <p className="text-3xl font-serif text-aurelia-dark">{summary.users}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
                    <FiUsers className="text-lg text-purple-500" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#832729]/10 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out"></div>
                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Total Products</p>
                    <p className="text-3xl font-serif text-aurelia-dark">{summary.products || 0}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                    <FiBox className="text-lg text-orange-500" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#832729]/10 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out"></div>
                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Total Categories</p>
                    <p className="text-3xl font-serif text-aurelia-dark">{summary.categories || 0}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center">
                    <span className="text-lg text-yellow-600">🏷️</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sales Trend (Area Chart) */}
              <div className="bg-white p-6 border border-gray-100 rounded-2xl shadow-sm lg:col-span-2">
                <h2 className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-6">Revenue Trend</h2>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={summary.dailyOrders} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#832729" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#832729" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                      <XAxis dataKey="_id" tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false} dy={10} />
                      <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#1c1c1c", border: "none", borderRadius: "8px", color: "white" }}
                        itemStyle={{ color: "#c5a880" }}
                        formatter={(value) => [`$${value}`, "Revenue"]}
                        labelStyle={{ color: "#9ca3af", marginBottom: "4px" }}
                      />
                      <Area type="monotone" dataKey="sales" stroke="#832729" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Category Breakdown (Donut Chart) */}
              <div className="bg-white p-6 border border-gray-100 rounded-2xl shadow-sm">
                <h2 className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-2">Revenue by Category</h2>
                <div className="h-[350px] flex items-center justify-center">
                  {summary.categoryRevenue && summary.categoryRevenue.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={summary.categoryRevenue}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="revenue"
                          nameKey="_id"
                        >
                          {summary.categoryRevenue.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`$${value}`, "Revenue"]}
                          contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}
                        />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: "12px" }}/>
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <p className="text-gray-400 text-sm">No category data available.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Tables Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <h2 className="text-xs font-bold text-gray-800 uppercase tracking-widest">Recent Orders</h2>
                  <Link to="/admin/orders" className="text-xs text-[#832729] hover:text-black uppercase tracking-widest font-medium transition-colors">
                    View All
                  </Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-100 text-[10px] text-gray-400 uppercase tracking-widest">
                        <th className="p-4 font-semibold">Order ID</th>
                        <th className="p-4 font-semibold">Customer</th>
                        <th className="p-4 font-semibold">Date</th>
                        <th className="p-4 font-semibold text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {summary.recentOrders && summary.recentOrders.map((order) => (
                        <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                          <td className="p-4 text-xs font-mono text-gray-500">{order._id.substring(0, 8)}</td>
                          <td className="p-4 text-sm font-medium text-gray-800">{order.user ? order.user.name : "Guest"}</td>
                          <td className="p-4 text-sm text-gray-500">{order.createdAt.substring(0, 10)}</td>
                          <td className="p-4 text-sm font-serif text-right font-medium text-black">${order.totalPrice.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Top Selling Products */}
              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <h2 className="text-xs font-bold text-gray-800 uppercase tracking-widest">Top Selling Products</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-100 text-[10px] text-gray-400 uppercase tracking-widest">
                        <th className="p-4 font-semibold">Product Name</th>
                        <th className="p-4 font-semibold text-center">Units Sold</th>
                        <th className="p-4 font-semibold text-right">Revenue</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {summary.topProducts && summary.topProducts.map((product, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                          <td className="p-4 text-sm font-medium text-gray-800 line-clamp-1">{product._id}</td>
                          <td className="p-4 text-sm text-gray-600 text-center bg-gray-50/50">{product.qty}</td>
                          <td className="p-4 text-sm font-serif text-right font-medium text-black">${product.revenue.toLocaleString()}</td>
                        </tr>
                      ))}
                      {(!summary.topProducts || summary.topProducts.length === 0) && (
                        <tr><td colSpan="3" className="p-8 text-center text-gray-400 text-sm">No sales data yet.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        ) : null}
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
