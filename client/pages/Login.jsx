import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogIn, AlertCircle } from "lucide-react";
import API from "../services/api.js";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!data.email || !data.password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      const res = await API.post("/auth/login", data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("name", res.data.user.name);
      localStorage.setItem("email", res.data.user.email);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="rounded-3xl bg-white/10 backdrop-blur-xl p-8 shadow-2xl ring-1 ring-white/20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-sky-400 to-sky-600 mb-4">
              <LogIn className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-semibold text-white">Welcome Back</h1>
            <p className="mt-2 text-slate-300">Sign in to your StudioPro account</p>
          </div>

          {error && (
            <div className="mb-6 rounded-2xl bg-rose-500/20 border border-rose-500/50 p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-rose-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-rose-100">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-slate-200">Email Address</span>
              <input
                type="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className="mt-2 w-full rounded-2xl border border-slate-600 bg-slate-900/50 px-4 py-3 text-white outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 placeholder:text-slate-500"
                placeholder="you@example.com"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-200">Password</span>
              <input
                type="password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                className="mt-2 w-full rounded-2xl border border-slate-600 bg-slate-900/50 px-4 py-3 text-white outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 placeholder:text-slate-500"
                placeholder="••••••••"
              />
            </label>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="mt-8 w-full rounded-2xl bg-gradient-to-r from-sky-500 to-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:from-sky-600 hover:to-sky-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="mt-6 text-center text-sm text-slate-300">
            New to StudioPro?{" "}
            <Link to="/register" className="font-semibold text-sky-400 hover:text-sky-300">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}