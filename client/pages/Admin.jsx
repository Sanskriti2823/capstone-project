import { useEffect, useState } from "react";
import API from "../services/api.js";

export default function Admin() {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");

  const fetchBookings = async () => {
    try {
      const res = await API.get("/admin/bookings");
      setBookings(res.data);
    } catch (err) {
      setMessage(err.response?.data || "Unable to load admin bookings");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.patch(`/admin/bookings/${id}/status`, { status });
      fetchBookings();
    } catch (err) {
      setMessage(err.response?.data || "Unable to update status");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200">
        <h1 className="text-3xl font-semibold text-slate-900">Admin Panel</h1>
        <p className="mt-2 text-slate-600">Manage all bookings and view payment status across your customer base.</p>
      </div>

      {message && <div className="mt-6 rounded-2xl bg-rose-50 p-4 text-sm text-rose-700 ring-1 ring-rose-200">{message}</div>}

      <div className="mt-6 space-y-4">
        {bookings.map((booking) => (
          <div key={booking._id} className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">{booking.service}</h2>
                <p className="mt-1 text-sm text-slate-600">{booking.date}</p>
                <p className="mt-1 text-sm text-slate-600">Client: {booking.userId?.name} ({booking.userId?.email})</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">Payment: {booking.paymentStatus}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">Status: {booking.status}</span>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={() => updateStatus(booking._id, "confirmed")}
                className="rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
              >
                Confirm
              </button>
              <button
                onClick={() => updateStatus(booking._id, "cancelled")}
                className="rounded-2xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-500"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
