import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/login/LoginPage";
import { RegisterPage } from "./pages/register/RegisterPage";
import { HomePage } from "./pages/home/HomePage";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { OrdersPage } from "./pages/orders/OrdersPage";
import { TrackingPage } from "./pages/tracking/TrackingPage";
import { Navigate } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const loadCart = async () => {
    const response = await axios.get("/api/cart-items?expand=product");
    setCart(response.data);
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <Routes>
      <Route
        index
        element={
          <HomePage
            cart={cart}
            loadCart={loadCart}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        }
      />
      <Route
        path="checkout"
        element={
          localStorage.getItem("token") ? (
            <CheckoutPage cart={cart} loadCart={loadCart} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="orders" element={<OrdersPage cart={cart} />} />
      <Route path="tracking" element={<TrackingPage cart={cart} />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
