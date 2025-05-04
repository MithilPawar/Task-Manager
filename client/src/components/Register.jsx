import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/authApi.js";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

// ✅ Move InputField outside to prevent redefinition on each render
const InputField = ({ icon: Icon, value, onChange, type = "text", placeholder }) => (
  <div className="relative">
    <Icon className="absolute left-3 top-3.5 text-gray-400" />
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

function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const data = await registerUser(name, username, email, password);
      console.log("Registration success:", data);
      navigate("/login");
    } catch (err) {
      const message = err.response?.data?.message || "Registration failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center px-4">
      <div className="bg-white/80 backdrop-blur-xl shadow-2xl border border-gray-200 rounded-2xl w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        
        {/* Left Section (Form) */}
        <form
          onSubmit={handleRegister}
          className="p-8 md:p-10 space-y-5"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-700">Create Account</h2>

          <InputField icon={FaUser} value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" />
          <InputField icon={FaUser} value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
          <InputField icon={FaEnvelope} value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email Address" />
          <InputField icon={FaLock} value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
          <InputField icon={FaLock} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm Password" />

          {error && <p className="text-sm text-center text-red-600 font-medium">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 text-white text-sm font-semibold rounded-lg transition duration-200 ${
              loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium hover:underline">Login</Link>
          </p>
        </form>

        {/* Right Section (Illustration or Info) */}
        <div className="hidden md:flex items-center justify-center bg-blue-600 text-white p-10">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-semibold">Welcome to TaskZone</h3>
            <p className="text-sm text-blue-100">Manage your tasks efficiently and stay productive.</p>
            <img src="https://cdn-icons-png.flaticon.com/512/1055/1055687.png" alt="illustration" className="w-32 mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
