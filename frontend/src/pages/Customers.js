import React, { useEffect, useState } from "react";
import CustomerTable from "../components/CustomerTable";
import { adminService } from "../services/adminService";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [message, setMessage] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const data = await adminService.getCustomers();
      setCustomers(data);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to load customers");
    }
  };

const handleVerify = async (userId) => {
  try {
    // Call backend and get updated user
    const res = await adminService.verifyDevice(userId);

    setMessage(res.message);

    // Update the frontend state with the verified user
   setCustomers((prev) =>
  prev.map((c) =>
    c._id === userId ? { ...c, isVerified: res.user.isVerified } : c
  )
);

  } catch (err) {
    setMessage(err.response?.data?.message || "Failed to verify device");
  }
};



  const handleViewTransactions = async (userId) => {
    try {
      const data = await adminService.getCustomerTransactions(userId);
      setTransactions(data);
      setSelectedCustomer(customers.find(c => c._id === userId));
      setShowModal(true);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to load transactions");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Customers</h2>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <CustomerTable
        customers={customers}
        onVerify={handleVerify}
        onViewTransactions={handleViewTransactions}
      />

   {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg w-3/4 max-h-[80vh] overflow-auto">
      <h3 className="text-xl font-bold mb-4">
        Transactions for {selectedCustomer?.name}
      </h3>
      <button
        onClick={() => setShowModal(false)}
        className="mb-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Close
      </button>
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
          {Array.isArray(transactions) && transactions.length > 0 ? (
            transactions.map((t) => (
              <tr key={t._id} className="border-b">
                <td className="p-2">{new Date(t.createdAt).toLocaleDateString()}</td>
                <td className="p-2">{t.amount}</td>
                <td className="p-2">{t.type}</td>
                <td className="p-2">{t.note}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-2 text-center text-gray-500">
                No transactions found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
)}

    </div>
  );
}
