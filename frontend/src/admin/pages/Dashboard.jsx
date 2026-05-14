import { Link }
from "react-router-dom";

import "../../styles/Admin.css";
import AdminNavbar from "../components/AdminNavbar";

function Dashboard() {

  return (

    <div className="admin-page">
        <AdminNavbar />

      <h1 className="admin-title">
        Admin Dashboard
      </h1>

      <div className="admin-grid">

        <Link
          to="/admin/products"
          className="admin-card"
        >

          <h2>
            Products
          </h2>

          <p>
            Manage Products
          </p>

        </Link>

        <Link
          to="/admin/orders"
          className="admin-card"
        >

          <h2>
            Orders
          </h2>

          <p>
            Manage Orders
          </p>

        </Link>

        <Link
          to="/admin/analytics"
          className="admin-card"
        >

          <h2>
            Analytics
          </h2>

          <p>
            View Sales Reports
          </p>

        </Link>

      </div>

    </div>

  );

}

export default Dashboard;