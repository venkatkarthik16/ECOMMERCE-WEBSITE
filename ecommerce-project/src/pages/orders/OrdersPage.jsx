import { Header } from "../../components/Header";
import "./OrdersPage.css";

import axios from "axios";
import { useState, useEffect } from "react";

import { OrderHeader } from "./orderHeader";
import { OrderDetailsGrid } from "./orderDetailsGrid";

export function OrdersPage({ cart }) {
  const [orders, setorders] = useState([]);

  useEffect(() => {
    const fetchOrdersData = async () => {
      const response = await axios.get("/api/orders?expand=products");
      setorders(response.data);
    };
    fetchOrdersData();
  }, []);

  return (
    <>
      <title>Orders</title>

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map((order) => {
            return (
              <div key={order.id} className="order-container">
                <OrderHeader order={order} />

                <OrderDetailsGrid order={order} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
