import { useState, createElement } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";

const InputField = ({
  Icon,
  value,
  onChange,
  type = "text",
  placeholder,
}) => (
  <div className="relative">
    {Icon && createElement(Icon, { className: "absolute left-3 top-3.5 text-gray-400" })}
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-sm placeholder-gray-400"
      required
    />
  </div>
);

function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(username, password);
      navigate("/dashboard");
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center px-4">
      <div className="bg-white/80 backdrop-blur-xl shadow-2xl border border-gray-200 rounded-2xl w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Left Side: Form */}
        <form onSubmit={handleLogin} className="p-8 md:p-10 space-y-5">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-700">
            Welcome Back
          </h2>

          <InputField
            Icon={FaUser}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <InputField
            Icon={FaLock}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

          {error && (
            <p className="text-sm text-center text-red-600 font-medium">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 text-white text-sm font-semibold rounded-lg transition duration-200 ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-sm text-center text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </form>

        {/* Right Side: Info or Image */}
        <div className="hidden md:flex items-center justify-center bg-blue-600 text-white p-10">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-semibold">Login to TaskZone</h3>
            <p className="text-sm text-blue-100">
              Track your tasks, stay organized, and boost productivity.
            </p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1055/1055666.png"
              alt="login"
              className="w-32 mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
