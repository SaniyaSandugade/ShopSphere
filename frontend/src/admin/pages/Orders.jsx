import { useEffect, useState } from "react";

import API from "../../services/api";

import "../../styles/Admin.css";

import AdminNavbar
from "../components/AdminNavbar";

function Orders() {

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

      setOrders(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  // DELETE ORDER

  const deleteOrder =
    async (id) => {

      try {

        await API.delete(

          `/orders/${id}`

        );

        fetchOrders();

      } catch (error) {

        console.log(error);

      }

    };

  // UPDATE STATUS

  const updateStatus =
    async (id, status) => {

      try {

        await API.put(

          `/orders/${id}`,

          { status }

        );

        fetchOrders();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="admin-page">

      <AdminNavbar />

      <h1 className="admin-title">

        Orders Management

      </h1>

      <div className="admin-grid">

        {orders.map((order) => (

          <div

            className="admin-card"

            key={order._id}

          >

            <h3>
              Order ID
            </h3>

            <p>
              {order._id}
            </p>

            <p>
              ₹ {order.totalPrice}
            </p>

            <p>

              Status:
              {" "}

              {order.orderStatus}

            </p>

            {/* STATUS DROPDOWN */}

            <select

              className="status-select"

              value={order.orderStatus}

              onChange={(e) =>

                updateStatus(

                  order._id,

                  e.target.value

                )

              }

            >

              <option value="Processing">

                Processing

              </option>

              <option value="Shipped">

                Shipped

              </option>

              <option value="Delivered">

                Delivered

              </option>

            </select>

            <button

              className="delete-btn"

              onClick={() =>

                deleteOrder(order._id)

              }

            >

              Delete Order

            </button>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Orders;