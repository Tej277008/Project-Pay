import { useAuth } from "./context/AuthContext";

function App() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="p-10 text-center text-red-500 font-bold">
        Access Denied. Please log in.
      </div>
    );
  }

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Welcome to EzPOS</h1>
      <p className="mb-4">Logged in as: {user.email}</p>
      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
}

export default App;

