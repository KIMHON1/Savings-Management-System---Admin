import React from "react";

export default function CustomerTable({ customers, onVerify, onViewTransactions }) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b bg-gray-200">
          <th className="p-2 text-left">Name</th>
          <th className="p-2 text-left">Email</th>
          <th className="p-2 text-left">Balance</th>
          <th className="p-2 text-left">Verified</th>
          <th className="p-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((c) => (
          <tr key={c._id} className="border-b">
            <td className="p-2">{c.name}</td>
            <td className="p-2">{c.email}</td>
            <td className="p-2">{c.balance}</td>
            <td className="p-2">{c.isVerified ? "Yes" : "No"}</td>
           <td className="p-2">{c.isVerified ? "Verified" : "No"}</td>
<td className="p-2 space-x-2">
  {!c.isVerified && (
    <button
      onClick={() => onVerify(c._id)}
      className="bg-green-600 px-3 py-1 rounded-lg text-white hover:bg-green-700"
    >
      Verify Device 
    </button>
  )}
  <button
    onClick={() => onViewTransactions(c._id)}
    className="bg-blue-600 px-3 py-1 rounded-lg text-white hover:bg-blue-700"
  >
    View Transactions
  </button>
</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
