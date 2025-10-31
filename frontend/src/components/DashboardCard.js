import React from "react";

export default function DashboardCard({ title, value, color = "blue" }) {
  return (
    <div className={`p-6 rounded-xl shadow-md bg-${color}-500 text-white`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
