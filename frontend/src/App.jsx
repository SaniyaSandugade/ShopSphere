import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import Dashboard from "./admin/pages/Dashboard";
import Products from "./admin/pages/Products";
import Orders from "./admin/pages/Orders";
import Analytics from "./admin/pages/Analytics";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<ProductList />} />

        <Route path="/product/:id" element={<ProductDetail />} />

        <Route path="/cart" element={<CartPage />} />

        <Route path="/checkout" element={<CheckoutPage />} />

        <Route path="/admin" element={<Dashboard />} />

<Route path="/admin/products" element={<Products />} />

<Route path="/admin/orders" element={<Orders />} />

<Route path="/admin/analytics" element={<Analytics />} />

        <Route
  path="/orders"
  element={<OrdersPage />}
/>

      </Routes>

    </BrowserRouter>

  );

}

export default App;