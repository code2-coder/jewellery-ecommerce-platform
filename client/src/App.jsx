import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Shipping from "./pages/Shipping";
import Payment from "./pages/Payment";
import PlaceOrder from "./pages/PlaceOrder";
import AdminRoute from "./components/AdminRoute";
import ProductList from "./pages/admin/ProductList";
import ProductEdit from "./pages/admin/ProductEdit";
import OrderList from "./pages/admin/OrderList";
import BannerList from "./pages/admin/BannerList";
import BannerEdit from "./pages/admin/BannerEdit";
import CategoryList from "./pages/admin/CategoryList";
import CategoryEdit from "./pages/admin/CategoryEdit";
import Dashboard from "./pages/admin/Dashboard";
import Order from "./pages/Order";
import UserList from "./pages/admin/UserList";
import UserEdit from "./pages/admin/UserEdit";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search/:keyword" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/shipping" element={<Shipping />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/placeorder" element={<PlaceOrder />} />
      <Route path="/order/:id" element={<Order />} />
      <Route path="/profile" element={<Profile />} />
      
      {/* Admin Routes */}
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/products" element={<ProductList />} />
        <Route path="/admin/product/:id/edit" element={<ProductEdit />} />
        <Route path="/admin/orders" element={<OrderList />} />
        <Route path="/admin/users" element={<UserList />} />
        <Route path="/admin/user/:id/edit" element={<UserEdit />} />
        <Route path="/admin/banners" element={<BannerList />} />
        <Route path="/admin/banner/:id/edit" element={<BannerEdit />} />
        <Route path="/admin/categories" element={<CategoryList />} />
        <Route path="/admin/category/:id/edit" element={<CategoryEdit />} />
      </Route>
    </Routes>
  );
}

export default App;