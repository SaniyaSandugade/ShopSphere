import { Link } from "react-router-dom";

import "../styles/AdminNavbar.css";

function AdminNavbar() {

  return (

    <div className="admin-navbar">

      <h2>
        Admin Panel
      </h2>

      <div className="admin-links">

        <Link to="/admin">
          Dashboard
        </Link>

        <Link to="/admin/products">
          Products
        </Link>

        <Link to="/admin/orders">
          Orders
        </Link>

        <Link to="/admin/analytics">
          Analytics
        </Link>

        <Link to="/">
  Main Store
</Link>

      </div>

    </div>

  );

}

export default AdminNavbar;