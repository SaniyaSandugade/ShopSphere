import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/CartPage.css";
import Footer from "../components/Footer";

function CartPage() {

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {

    const storedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCartItems(storedCart);

  }, []);

  // REMOVE ITEM

  const removeItem = (id) => {

    const updatedCart = cartItems.filter(
      item => item._id !== id
    );

    setCartItems(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

  };

  // INCREASE QTY

  const increaseQty = (id) => {

    const updatedCart = cartItems.map(item => {

      if (item._id === id) {

        return {
          ...item,
          quantity: (item.quantity || 1) + 1
        };

      }

      return item;

    });

    setCartItems(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

  };

  // DECREASE QTY

  const decreaseQty = (id) => {

    const updatedCart = cartItems.map(item => {

      if (
        item._id === id &&
        (item.quantity || 1) > 1
      ) {

        return {
          ...item,
          quantity: item.quantity - 1
        };

      }

      return item;

    });

    setCartItems(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

  };

  // TOTAL

  const total = cartItems.reduce(

    (acc, item) =>

      acc + item.price * (item.quantity || 1),

    0

  );

  // PRODUCT IMAGES

  const getImage = (name) => {

    if (name.includes("iPhone")) {
      return "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200";
    }

    if (name.includes("Laptop")) {
      return "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1200";
    }

    if (name.includes("Shoes")) {
      return "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200";
    }

    return "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200";

  };

  // EMPTY CART

  if (cartItems.length === 0) {

    return (

      <div className="cart-page">

        <div className="empty-cart">

          <h2 className="cart-heading">
            Your Cart Is Empty
          </h2>

          <Link to="/">

            <button className="checkout-btn">
              Continue Shopping
            </button>

          </Link>

        </div>

      </div>

    );

  }

  return (

    <div className="cart-page">

      <div className="cart-wrapper">

        <h1 className="cart-heading">
          Shopping Cart
        </h1>

        <div className="cart-container">

          {/* LEFT SIDE */}

          <div className="cart-left">

            {cartItems.map((item) => (

              <div className="cart-card" key={item._id}>

                <img
                  src={getImage(item.name)}
                  alt={item.name}
                  className="cart-image"
                />

                <div className="cart-info">

                  <h3 className="product-name">
                    {item.name}
                  </h3>

                  <p className="product-price">
                    ₹ {item.price}
                  </p>

                  <div className="quantity-box">

                    <button
                      className="qty-btn"
                      onClick={() => decreaseQty(item._id)}
                    >
                      -
                    </button>

                    <span className="qty-number">
                      {item.quantity || 1}
                    </span>

                    <button
                      className="qty-btn"
                      onClick={() => increaseQty(item._id)}
                    >
                      +
                    </button>

                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item._id)}
                  >
                    Remove
                  </button>

                </div>

              </div>

            ))}

          </div>

          {/* RIGHT SIDE */}

          <div className="summary-card">

            <h2 className="summary-title">
              Order Summary
            </h2>

            <p className="summary-text">
              Total Items: {cartItems.length}
            </p>

            <h3 className="summary-total">
              ₹ {total}
            </h3>

            <Link to="/checkout">

              <button className="checkout-btn">
                Proceed To Checkout
              </button>

            </Link>

          </div>

        </div>

      </div>

      <Footer />

    </div>

  );

}

export default CartPage;