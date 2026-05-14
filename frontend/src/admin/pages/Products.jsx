import { useEffect, useState } from "react";
import API from "../../services/api";
import "../../styles/Admin.css";
import AdminNavbar from "../components/AdminNavbar";
import "../styles/Products.css";

function Products() {

  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({

    name: "",
    price: "",
    stock: "",
    description: "",

  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {

    fetchProducts();

  }, []);

  // FETCH PRODUCTS

  const fetchProducts = async () => {

    try {

      const res = await API.get("/products");

      setProducts(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  // HANDLE INPUT

  const handleChange = (e) => {

    setFormData({

      ...formData,
      [e.target.name]: e.target.value,

    });

  };

  // ADD OR UPDATE PRODUCT

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      // UPDATE PRODUCT

      if (editId) {

        await API.put(

          `/products/${editId}`,
          formData
        );

        alert("Product Updated");

      }

      // ADD PRODUCT

      else {

        await API.post(
          "/products",
          formData
        );

        alert("Product Added");

      }

      // RESET

      setFormData({

        name: "",
        price: "",
        stock: "",
        description: "",

      });

      setEditId(null);

      fetchProducts();

    } catch (error) {

      console.log(error);

    }

  };

  // DELETE PRODUCT

  const deleteProduct = async (id) => {

    try {

      await API.delete(`/products/${id}`);

      fetchProducts();

    } catch (error) {

      console.log(error);

    }

  };

  // EDIT PRODUCT

  const editProduct = (product) => {

    setEditId(product._id);

    setFormData({

      name: product.name,
      price: product.price,
      stock: product.stock,
      description: product.description,

    });

  };

  return (

    <div className="admin-page">
        <AdminNavbar />

      <h1 className="admin-title">
        Product Management
      </h1>

      {/* FORM */}

      <form
        className="admin-form"
        onSubmit={handleSubmit}
      >

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <button type="submit">

          {editId
            ? "Update Product"
            : "Add Product"}

        </button>

      </form>

      {/* PRODUCTS */}

      <div className="admin-grid">

        {products.map((product) => (

          <div
            className="admin-card"
            key={product._id}
          >

            <h3>{product.name}</h3>

            <p>
              ₹ {product.price}
            </p>

            <p>
              Stock: {product.stock}
            </p>

            <div className="admin-btns">

              <button
                className="edit-btn"
                onClick={() =>
                  editProduct(product)
                }
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() =>
                  deleteProduct(product._id)
                }
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Products;