import { useEffect, useState } from "react";

import API from "../services/api";

import "../styles/OrdersPage.css";
import Footer from "../components/Footer";

function OrdersPage() {

  const [orders, setOrders] =
    useState([]);

  useEffect(() => {

    fetchOrders();

  }, []);

  // FETCH ORDERS

  const fetchOrders = async () => {

    try {

      const res =
        await API.get("/orders");

      console.log(res.data);

      setOrders(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="orders-page">

      <h1 className="orders-title">
        My Orders
      </h1>

      <div className="orders-container">

        {orders.length === 0 ? (

          <p className="empty-orders">
            No Orders Found
          </p>

        ) : (

          orders.map((order) => (

            <div
              className="order-card"
              key={order._id}
            >

              <h3>
                ₹ {order.totalPrice}
              </h3>

              <p>
                Payment:
                {order.paymentMethod}
              </p>

              <p>
                Status:
                {order.orderStatus}
              </p>

              <p>
                City:
                {order.shippingAddress?.city}
              </p>

              <p>
                Address:
                {order.shippingAddress?.address}
              </p>

            </div>

          ))

        )}

      </div>

      <Footer />

    </div>

  );

}

export default OrdersPage;