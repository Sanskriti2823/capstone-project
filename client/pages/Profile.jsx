import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, LogOut, Heart, History } from "lucide-react";
import API from "../services/api.js";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("info");

  useEffect(() => {
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    if (!name || !email) {
      navigate("/");
      return;
    }
    setUser({ name, email });
    fetchBookings();
  }, [navigate]);

  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings");
      setBookings(res.data);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 rounded-3xl bg-gradient-to-r from-sky-600 via-slate-900 to-slate-700 p-8 shadow-2xl text-white">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20">
              <User className="h-10 w-10" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold">{user.name}</h1>
              <p className="text-slate-100/80">{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
            className="rounded-2xl bg-rose-600 px-6 py-3 text-sm font-semibold transition hover:bg-rose-500 flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8 flex gap-2 border-b border-slate-200">
        <button
          onClick={() => setTab("info")}
          className={`px-4 py-3 font-semibold transition ${
            tab === "info"
              ? "border-b-2 border-slate-900 text-slate-900"
              : "text-slate-600 hover:text-slate-700"
          }`}
        >
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Account Info
          </div>
        </button>
        <button
          onClick={() => setTab("history")}
          className={`px-4 py-3 font-semibold transition ${
            tab === "history"
              ? "border-b-2 border-slate-900 text-slate-900"
              : "text-slate-600 hover:text-slate-700"
          }`}
        >
          <div className="flex items-center gap-2">
            <History className="h-4 w-4" />
            Booking History
          </div>
        </button>
      </div>

      {/* Content */}
      {tab === "info" && (
        <div className="grid gap-8 lg:grid-cols-[420px_minmax(0,1fr)]">
          {/* Info Card */}
          <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200">
            <h2 className="text-2xl font-semibold text-slate-900">Profile Information</h2>
            <div className="mt-6 space-y-5">
              <div>
                <label className="text-sm font-medium text-slate-700">Full Name</label>
                <input
                  type="text"
                  value={user.name}
                  disabled
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Email Address</label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Total Bookings</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">{bookings.length}</p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Completed</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">
                  {bookings.filter((b) => b.paymentStatus === "paid").length}
                </p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Pending</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">
                  {bookings.filter((b) => b.paymentStatus !== "paid").length}
                </p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Total Spent</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">
                  ${bookings.reduce((sum, b) => sum + (b.price || 0), 0)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "history" && (
        <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">Your Bookings</h2>
          {loading ? (
            <p className="text-slate-600">Loading...</p>
          ) : bookings.length === 0 ? (
            <p className="text-center text-slate-500 py-12">No bookings yet. Start by creating one!</p>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking._id} className="rounded-2xl border border-slate-200 p-4 hover:border-sky-300 transition">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900">{booking.service}</h3>
                      <p className="text-sm text-slate-600">Date: {booking.date}</p>
                      <p className="text-sm text-slate-600">Price: ${booking.price}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-sm ${
                          booking.paymentStatus === "paid"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {booking.paymentStatus}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-sm ${
                          booking.status === "confirmed"
                            ? "bg-sky-100 text-sky-700"
                            : booking.status === "cancelled"
                            ? "bg-rose-100 text-rose-700"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
