import React, { useEffect, useState } from "react";
import { adminService } from "../services/adminService";

export default function CustomerTransactions({ userId }) {
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchTransactions();
  });

  const fetchTransactions = async () => {
    try {
      const data = await adminService.getCustomerTransactions(userId);
      setTransactions(data);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to load transactions");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Transactions</h2>
      {message && <p className="mb-4 text-red-600">{message}</p>}
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b bg-gray-200">
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-left">Amount</th>
            <th className="p-2 text-left">Type</th>
            <th className="p-2 text-left">Note</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t._id} className="border-b">
              <td className="p-2">{new Date(t.createdAt).toLocaleDateString()}</td>
              <td className="p-2">{t.amount}</td>
              <td className="p-2">{t.type}</td>
              <td className="p-2">{t.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
