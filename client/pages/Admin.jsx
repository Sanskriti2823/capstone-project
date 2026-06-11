import { useEffect, useMemo, useState } from "react";
import API from "../services/api.js";

export default function Admin() {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

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

  const deleteBooking = async (id) => {
    if (!window.confirm("Delete this booking from the platform?")) return;
    try {
      await API.delete(`/admin/bookings/${id}`);
      setMessage("Booking removed successfully.");
      fetchBookings();
    } catch (err) {
      setMessage(err.response?.data || "Unable to delete booking");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const summary = useMemo(() => ({
    total: bookings.length,
    paid: bookings.filter((booking) => booking.paymentStatus === "paid").length,
    pending: bookings.filter((booking) => booking.paymentStatus !== "paid").length,
  }), [bookings]);

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesStatus =
        statusFilter === "all" ||
        booking.status === statusFilter ||
        booking.paymentStatus === statusFilter;
      const matchesSearch =
        booking.service.toLowerCase().includes(search.toLowerCase()) ||
        booking.userId?.name?.toLowerCase().includes(search.toLowerCase()) ||
        booking.userId?.email?.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [bookings, statusFilter, search]);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200">
        <h1 className="text-3xl font-semibold text-slate-900">Admin Panel</h1>
        <p className="mt-2 text-slate-600">Manage all bookings, update payment status and remove outdated requests.</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl bg-slate-900 p-5 shadow-lg ring-1 ring-slate-800 text-white">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Total bookings</p>
          <p className="mt-4 text-3xl font-semibold">{summary.total}</p>
        </div>
        <div className="rounded-3xl bg-white p-5 shadow-lg ring-1 ring-slate-200">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Paid</p>
          <p className="mt-4 text-3xl font-semibold text-slate-900">{summary.paid}</p>
        </div>
        <div className="rounded-3xl bg-white p-5 shadow-lg ring-1 ring-slate-200">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Pending payments</p>
          <p className="mt-4 text-3xl font-semibold text-slate-900">{summary.pending}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1 space-y-2">
          <label className="block text-sm font-medium text-slate-700">Search bookings</label>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by service, client, or email"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "All", value: "all" },
            { label: "Confirmed", value: "confirmed" },
            { label: "Pending", value: "pending" },
            { label: "Cancelled", value: "cancelled" },
            { label: "Paid", value: "paid" },
          ].map((filter) => (
            <button
              key={filter.value}
              onClick={() => setStatusFilter(filter.value)}
              className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                statusFilter === filter.value
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {message && <div className="mt-6 rounded-2xl bg-rose-50 p-4 text-sm text-rose-700 ring-1 ring-rose-200">{message}</div>}

      <div className="mt-6 space-y-4">
        {filteredBookings.map((booking) => (
          <div key={booking._id} className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">{booking.service}</h2>
                <p className="mt-1 text-sm text-slate-600">{booking.date}</p>
                <p className="mt-1 text-sm text-slate-600">Client: {booking.userId?.name} ({booking.userId?.email})</p>
                <p className="mt-1 text-sm text-slate-600">Price: ${booking.price}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">Payment: {booking.paymentStatus}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">Status: {booking.status}</span>
              </div>
            </div>

            {booking.imageUrl && (
              <img alt="Booking" src={booking.imageUrl} className="mt-4 h-48 w-full rounded-3xl object-cover" />
            )}

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
              <button
                onClick={() => deleteBooking(booking._id)}
                className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
