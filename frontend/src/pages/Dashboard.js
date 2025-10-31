import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex">
      <div className="w-64 bg-purple-700 text-white flex flex-col">
        <h2 className="text-2xl font-bold p-4 border-b border-purple-500">Admin Panel</h2>
        <nav className="flex-1 p-4 space-y-3">
          <button onClick={() => navigate("/customers")} className="block w-full text-left hover:bg-purple-600 p-2 rounded">
            Customers
          </button>
          <button onClick={() => navigate("/transactions")} className="block w-full text-left hover:bg-purple-600 p-2 rounded">
            Transactions
          </button>
          <button onClick={() => navigate("/analytics")} className="block w-full text-left hover:bg-purple-600 p-2 rounded">
            Analytics
          </button>
        </nav>
        <button
          onClick={() => { sessionStorage.clear(); navigate("/login"); }}
          className="bg-red-500 hover:bg-red-600 m-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome, Admin</h1>
        <p className="text-gray-600">Select a section from the sidebar to manage your system.</p>
      </div>
    </div>
  );
}
