import {

  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer

} from "recharts";

import "../../styles/Admin.css";
import AdminNavbar from "../components/AdminNavbar";

function Analytics() {

  const data = [

    {
      name: "Mon",
      sales: 4000
    },

    {
      name: "Tue",
      sales: 3000
    },

    {
      name: "Wed",
      sales: 5000
    },

    {
      name: "Thu",
      sales: 2780
    },

    {
      name: "Fri",
      sales: 1890
    },

  ];

  return (

    <div className="admin-page">
        <AdminNavbar />

      <h1 className="admin-title">
        Sales Analytics
      </h1>

      <div
        style={{
          width: "100%",
          height: 400
        }}
      >

        <ResponsiveContainer>

          <BarChart data={data}>

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="sales" />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}

export default Analytics;