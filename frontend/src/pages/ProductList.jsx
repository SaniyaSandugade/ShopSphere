import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "../styles/ProductList.css";
import logo from "../assets/logo.png";
import Footer from "../components/Footer";

function ProductList() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    try {

      const res = await API.get("/products");

      setProducts(res.data);

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);

    }

  };

  // FILTER + SORT

  const filteredProducts = products
    .filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {

      if (sort === "low") return a.price - b.price;

      if (sort === "high") return b.price - a.price;

      return 0;

    });

  // IMAGES

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

    if (name.includes("Headphones")) {
      return "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200";
    }

    if (name.includes("Watch")) {
      return "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200";
    }

    if (name.includes("Canon")) {
      return "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200";
    }

    if (name.includes("TV")) {
  return "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1200";
}

    return "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200";

  };

  // LOADING

  if (loading) {

    return (

      <div className="loading">

        Loading Products...

      </div>

    );

  }

  return (

    <div className="product-page">

      {/* NAVBAR */}

      <div className="navbar">

        <div className="logo-section">

          <img
            src={logo}
            alt="ShopSphere Logo"
            className="logo"
          />

          <h1 className="main-title">
            ShopSphere
          </h1>

        </div>

        <div className="nav-links">

          <Link to="/" className="nav-link">
            Home
          </Link>

          <Link to="/cart" className="nav-link">
            Cart
          </Link>

          <Link to="/orders" className="nav-link">
            Orders
          </Link>

          <Link to="/admin" className="nav-link">
  Admin
</Link>

        </div>

      </div>

      {/* SEARCH + SORT */}

      <div className="top-bar">

        <input
          type="text"
          placeholder="Search Products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-box"
        />

        <select
          className="sort-box"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >

          <option value="">
            Sort By
          </option>

          <option value="low">
            Price Low To High
          </option>

          <option value="high">
            Price High To Low
          </option>

        </select>

      </div>

      {/* PRODUCTS */}

      <div className="product-grid">

        {

          filteredProducts.map(product => (

            <div
              className="product-card"
              key={product._id}
            >

              <img
                src={getImage(product.name)}
                alt={product.name}
                className="product-image"
              />

              <h2 className="product-title">
                {product.name}
              </h2>

              <p className="price">
                ₹ {product.price}
              </p>

              <p className="stock-text">
                Stock: {product.stock}
              </p>

              <Link to={`/product/${product._id}`}>

                <button className="details-btn">
                  View Details
                </button>

              </Link>

            </div>

          ))

        }

      </div>
      
<Footer />
    </div>

  );

}

export default ProductList;