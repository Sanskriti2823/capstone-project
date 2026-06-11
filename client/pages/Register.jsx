import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserPlus, AlertCircle } from "lucide-react";
import API from "../services/api.js";

export default function Register() {
  const [data, setData] = useState({ name: "", email: "", password: "", adminKey: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!data.name || !data.email || !data.password) {
      setError("Please fill in all required fields");
      return;
    }
    if (data.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      const res = await API.post("/auth/register", data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("name", res.data.user.name);
      localStorage.setItem("email", res.data.user.email);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="rounded-3xl bg-white/10 backdrop-blur-xl p-8 shadow-2xl ring-1 ring-white/20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-sky-400 to-sky-600 mb-4">
              <UserPlus className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-semibold text-white">Create Account</h1>
            <p className="mt-2 text-slate-300">Join StudioPro and start managing your bookings</p>
          </div>

          {error && (
            <div className="mb-6 rounded-2xl bg-rose-500/20 border border-rose-500/50 p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-rose-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-rose-100">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-slate-200">Full Name *</span>
              <input
                type="text"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className="mt-2 w-full rounded-2xl border border-slate-600 bg-slate-900/50 px-4 py-3 text-white outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 placeholder:text-slate-500"
                placeholder="Jordan Mills"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-200">Email Address *</span>
              <input
                type="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className="mt-2 w-full rounded-2xl border border-slate-600 bg-slate-900/50 px-4 py-3 text-white outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 placeholder:text-slate-500"
                placeholder="you@example.com"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-200">Password * (min 6 characters)</span>
              <input
                type="password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                className="mt-2 w-full rounded-2xl border border-slate-600 bg-slate-900/50 px-4 py-3 text-white outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 placeholder:text-slate-500"
                placeholder="Create a strong password"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-200">Admin Key (optional)</span>
              <p className="text-xs text-slate-400 mt-1">Enter admin key if registering as admin</p>
              <input
                type="text"
                value={data.adminKey}
                onChange={(e) => setData({ ...data, adminKey: e.target.value })}
                className="mt-2 w-full rounded-2xl border border-slate-600 bg-slate-900/50 px-4 py-3 text-white outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 placeholder:text-slate-500"
                placeholder="Enter admin key"
              />
            </label>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-8 w-full rounded-2xl bg-gradient-to-r from-sky-500 to-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:from-sky-600 hover:to-sky-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <p className="mt-6 text-center text-sm text-slate-300">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-sky-400 hover:text-sky-300">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}