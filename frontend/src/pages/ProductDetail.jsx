import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";
import "../styles/ProductDetail.css";

function ProductDetail() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {

    fetchProduct();

  }, []);

  const fetchProduct = async () => {

    try {

      const res = await API.get(`/products/${id}`);

      setProduct(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  // PRODUCT IMAGES
  const productImages = {
    "Laptop":
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1200",

    "iPhone 15":
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200",

    "Nike Shoes":
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200",

    "Boat Headphones":
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200",

    "Samsung Watch":
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200",

    "Canon DSLR":
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200"
  };

  if (!product) {

    return <h2>Loading...</h2>;

  }

  return (

    <div className="detail-page">

      <Link to="/" className="back-btn">
        ← Back To Products
      </Link>

      <div className="detail-container">

        <div className="detail-image">

          <img
            src={productImages[product.name]}
            alt={product.name}
          />

        </div>

        <div className="detail-info">

          <h1 className="detail-title">
            {product.name}
          </h1>

          <h2 className="detail-price">
            ₹ {product.price}
          </h2>

          <p className="detail-description">
            {product.description}
          </p>

          <p className="detail-stock">
            Stock Available: {product.stock}
          </p>

          <h3 className="variant-title">
            Select Variant
          </h3>

          <div className="variant-box">

            <button className="variant-btn">
              Standard
            </button>

            <button className="variant-btn">
              Premium
            </button>

            <button className="variant-btn">
              Pro
            </button>

          </div>

          <button
  className="add-btn"
  onClick={() => {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(product);

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    alert("Product Added To Cart");

  }}
>
  Add To Cart
</button>

        </div>

      </div>

      <h2 className="section-title">
        Customer Reviews
      </h2>

      <div className="review-card">

        <h4>Rahul Sharma</h4>

        <p>⭐⭐⭐⭐⭐</p>

        <p>
          Amazing quality and smooth experience.
        </p>

      </div>

      <div className="review-card">

        <h4>Priya Patil</h4>

        <p>⭐⭐⭐⭐</p>

        <p>
          Stylish design and worth the money.
        </p>

      </div>

      <h2 className="section-title">
        Related Products
      </h2>

      <div className="related-grid">

        <div className="related-card">

          <img
            src="https://images.unsplash.com/photo-1517336714739-489689fd1ca8?q=80&w=1200"
            alt="Laptop"
          />

          <h4>Gaming Laptop</h4>

          <p>₹ 65000</p>

        </div>

        <div className="related-card">

          <img
            src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200"
            alt="Phone"
          />

          <h4>Smartphone</h4>

          <p>₹ 25000</p>

        </div>

      </div>

    </div>

  );

}

export default ProductDetail;