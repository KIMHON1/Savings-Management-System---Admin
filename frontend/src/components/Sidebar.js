import React from "react";
import { useNavigate } from "react-router-dom";
export default function Sidebar({ active, setActive }) {
  const navigate = useNavigate();

  const links = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Customers", path: "/admin/customers" },
    { name: "Transactions", path: "/admin/transactions" },
  ];

  return (
    <div className="w-64 bg-gray-800 min-h-screen text-white p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
      {links.map((link) => (
        <button
          key={link.name}
          onClick={() => {
            setActive(link.name);
            navigate(link.path);
          }}
          className={`text-left py-2 px-3 rounded-lg mb-2 w-full ${
            active === link.name ? "bg-gray-700" : "hover:bg-gray-700"
          }`}
        >
          {link.name}
        </button>
      ))}
    </div>
  );
}
