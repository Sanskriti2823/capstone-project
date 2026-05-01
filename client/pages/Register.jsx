import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api.js";

export default function Register() {
  const [data, setData] = useState({ name: "", email: "", password: "", adminKey: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await API.post("/auth/register", data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("name", res.data.user.name);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl ring-1 ring-slate-200">
        <h1 className="text-3xl font-semibold text-slate-900">Create Your Studio Account</h1>
        <p className="mt-2 text-slate-500">Join and manage bookings, payments, and client imagery.</p>

        {error && <div className="mt-4 rounded-lg bg-rose-50 p-3 text-sm text-rose-700">{error}</div>}

        <div className="mt-8 grid gap-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Full Name</span>
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500"
              placeholder="Jordan Mills"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500"
              placeholder="you@example.com"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Password</span>
            <input
              type="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500"
              placeholder="Create a strong password"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Admin Key (optional)</span>
            <input
              type="text"
              value={data.adminKey}
              onChange={(e) => setData({ ...data, adminKey: e.target.value })}
              className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500"
              placeholder="Enter admin key to register an admin"
            />
          </label>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-8 w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Create Account
        </button>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already signed up? <Link to="/" className="font-semibold text-sky-600">Log in</Link>
        </p>
      </div>
    </div>
  );
}