import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link, Routes, Route, Navigate } from "react-router-dom";
import Products from "./Products";
import Cart from "./Cart";

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-purple-800 via-blue-800 to-pink-700 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-white/10 backdrop-blur-lg shadow-2xl p-6 space-y-6 border-r border-white/20">
        <h2 className="text-3xl font-extrabold text-center text-pink-300 tracking-wide drop-shadow">
          EzPOS
        </h2>

        <div className="text-sm text-center text-white/80">
          Logged in as
          <div className="font-semibold mt-1 text-white">{user?.email}</div>
        </div>

        <nav className="space-y-3 mt-6">
          <Link
            to="/dashboard/products"
            className="block px-4 py-2 rounded hover:bg-pink-500/40 transition-all"
          >
            📦 Products
          </Link>
          <Link
            to="/dashboard/cart"
            className="block px-4 py-2 rounded hover:bg-pink-500/40 transition-all"
          >
            🛒 Cart
          </Link>
          <Link
            to="/dashboard/reports"
            className="block px-4 py-2 rounded hover:bg-pink-500/40 transition-all"
          >
            📊 Reports
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="w-full mt-10 py-2 rounded bg-red-500 hover:bg-red-600 transition font-bold"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 shadow-xl border border-white/20">
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <h1 className="text-3xl font-bold text-pink-200">Welcome to EzPOS</h1>
                  <p className="mt-2 text-white/80">
                    Select an option from the sidebar to get started.
                  </p>
                </div>
              }
            />
            <Route path="products" element={<Products />} />
            <Route path="cart" element={<Cart />} />
            <Route
              path="reports"
              element={
                <div>
                  <h2 className="text-2xl font-bold mb-2 text-yellow-300">📊 Sales Reports</h2>
                  <p className="text-white/80">This section will show business insights soon.</p>
                </div>
              }
            />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
