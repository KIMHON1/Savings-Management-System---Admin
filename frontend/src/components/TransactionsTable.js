import React from "react";

export default function TransactionsTable({ transactions }) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b bg-gray-200">
          <th className="p-2 text-left">Date</th>
          <th className="p-2 text-left">Customer</th>
          <th className="p-2 text-left">Type</th>
          <th className="p-2 text-left">Amount</th>
          <th className="p-2 text-left">Note</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((tx) => (
          <tr key={tx._id} className="border-b text-gray-700">
            <td className="p-2">{new Date(tx.createdAt).toLocaleString()}</td>
            <td className="p-2">{tx.userName || tx.userEmail}</td>
            <td className={`p-2 font-semibold ${tx.type === "deposit" ? "text-green-600" : "text-red-600"}`}>
              {tx.type}
            </td>
            <td className="p-2">{tx.amount}</td>
            <td className="p-2">{tx.note || "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
