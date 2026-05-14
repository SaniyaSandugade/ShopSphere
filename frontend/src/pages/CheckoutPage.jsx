import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

import "../styles/CheckoutPage.css";
import Footer from "../components/Footer";

function CheckoutPage() {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] = useState({

    fullName: "",
    address: "",
    city: "",
    pincode: "",
    payment: "COD",

  });

  // HANDLE INPUT

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  // PLACE ORDER

  const handleOrder = async (e) => {

    e.preventDefault();

    // VALIDATION

    if (
      !formData.fullName ||
      !formData.address ||
      !formData.city ||
      !formData.pincode
    ) {

      alert("Please Fill All Fields");

      return;

    }

    try {

      setLoading(true);

      // GET CART

      const cart =
        JSON.parse(
          localStorage.getItem("cart")
        ) || [];

      // CHECK EMPTY CART

      if (cart.length === 0) {

        alert("Cart Is Empty");

        setLoading(false);

        return;

      }

      // TOTAL PRICE

      const totalPrice =
        cart.reduce(

          (acc, item) =>

            acc +
            item.price *
            (item.quantity || 1),

          0

        );

      // ORDER OBJECT

      const orderData = {

        items: cart.map(item => ({

          product: item._id,

          quantity:
            item.quantity || 1,

        })),

        shippingAddress: {

          address:
            formData.address,

          city:
            formData.city,

          postalCode:
            formData.pincode,

          country: "India",

        },

        totalPrice,

        paymentMethod:
          formData.payment,

      };

      console.log(orderData);

      // API CALL

      await API.post(
        "/orders",
        orderData
      );

      // SUCCESS

      alert(
        "Order Placed Successfully"
      );

      // CLEAR CART

      localStorage.removeItem("cart");

      // REDIRECT

      navigate("/orders");

    } catch (error) {

      console.log(error);

      alert(
        "Something Went Wrong"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="checkout-page">

      <div className="checkout-container">

        <div className="checkout-card">

          <h1 className="checkout-title">
            Checkout
          </h1>

          <form
            className="checkout-form"
            onSubmit={handleOrder}
          >

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="checkout-input"
              value={formData.fullName}
              onChange={handleChange}
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              className="checkout-input"
              value={formData.address}
              onChange={handleChange}
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              className="checkout-input"
              value={formData.city}
              onChange={handleChange}
            />

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              className="checkout-input"
              value={formData.pincode}
              onChange={handleChange}
            />

            {/* PAYMENT */}

            <div className="payment-section">

              <h3>
                Payment Method
              </h3>

              <label className="payment-option">

                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  checked={
                    formData.payment === "COD"
                  }
                  onChange={handleChange}
                />

                Cash On Delivery

              </label>

              <label className="payment-option">

                <input
                  type="radio"
                  name="payment"
                  value="UPI"
                  checked={
                    formData.payment === "UPI"
                  }
                  onChange={handleChange}
                />

                UPI

              </label>

              <label className="payment-option">

                <input
                  type="radio"
                  name="payment"
                  value="Card"
                  checked={
                    formData.payment === "Card"
                  }
                  onChange={handleChange}
                />

                Credit / Debit Card

              </label>

            </div>

            <button
              type="submit"
              className="placeorder-btn"
              disabled={loading}
            >

              {
                loading
                  ? "Placing Order..."
                  : "Place Order"
              }

            </button>

          </form>

        </div>

      </div>

      <Footer />

    </div>

  );

}

export default CheckoutPage;