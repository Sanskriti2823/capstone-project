import { useState, useEffect, useMemo } from "react";
import { TrendingUp, DollarSign, Calendar, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import API from "../services/api.js";

const serviceOptions = [
  { label: "Wedding Shoot", price: 499 },
  { label: "Portrait Session", price: 199 },
  { label: "Video Package", price: 899 },
];

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({ service: "Wedding Shoot", date: "", price: 499 });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [editForm, setEditForm] = useState({ service: "Wedding Shoot", date: "", price: 499 });
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings");
      setBookings(res.data);
    } catch (err) {
      setMessage(err.response?.data || "Unable to load bookings");
    }
  };

  const handleBooking = async () => {
    setLoading(true);
    try {
      const res = await API.post("/bookings", form);

      if (image) {
        const payload = new FormData();
        payload.append("image", image);
        payload.append("bookingId", res.data._id);
        await API.post("/uploads", payload);
      }

      setMessage("Booking created successfully.");
      setForm({ ...form, date: "" });
      setImage(null);
      fetchBookings();
    } catch (err) {
      setMessage(err.response?.data || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (booking) => {
    setEditingBooking(booking);
    setEditForm({ service: booking.service, date: booking.date, price: booking.price || 499 });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingBooking(null);
    setEditForm({ service: "Wedding Shoot", date: "", price: 499 });
  };

  const updateBooking = async () => {
    if (!editingBooking) return;
    setLoading(true);
    try {
      await API.put(`/bookings/${editingBooking._id}`, editForm);
      setMessage("Booking updated successfully.");
      cancelEdit();
      fetchBookings();
    } catch (err) {
      setMessage(err.response?.data || "Unable to update booking");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this booking permanently?")) return;
    try {
      await API.delete(`/bookings/${id}`);
      setMessage("Booking deleted successfully.");
      if (editingBooking?._id === id) cancelEdit();
      fetchBookings();
    } catch (err) {
      setMessage(err.response?.data || "Unable to delete booking");
    }
  };

  const handlePay = async (booking) => {
    try {
      const res = await API.post("/payments/create-session", { bookingId: booking._id });
      window.location.href = res.data.url;
    } catch (err) {
      setMessage(err.response?.data || "Unable to start payment");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const summary = {
    total: bookings.length,
    paid: bookings.filter((booking) => booking.paymentStatus === "paid").length,
    pending: bookings.filter((booking) => booking.paymentStatus !== "paid").length,
    upcoming: bookings.filter((booking) => booking.date && new Date(booking.date) >= new Date()).length,
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 rounded-3xl bg-gradient-to-r from-sky-600 via-slate-900 to-slate-700 p-8 shadow-2xl text-white ring-1 ring-slate-800">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-sky-200/80">Welcome back</p>
            <h1 className="mt-2 text-4xl font-semibold">{name || "Studio Manager"}</h1>
            <p className="mt-3 max-w-2xl text-slate-100/90">Manage bookings, update schedules, and keep your client workflow smooth with the enhanced dashboard.</p>
          </div>
          {role === "admin" && (
            <div className="rounded-3xl bg-white/10 px-5 py-4 text-sm text-slate-100 ring-1 ring-white/20 font-semibold">
              👨‍💼 Admin Dashboard
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-6">
        <div className="rounded-2xl bg-gradient-to-br from-sky-50 to-sky-100 p-6 shadow-lg ring-1 ring-sky-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-sky-600">Total Bookings</p>
              <p className="mt-2 text-3xl font-bold text-sky-900">{summary.total}</p>
            </div>
            <div className="p-3 bg-sky-200 rounded-lg"><Calendar className="text-sky-600" size={24} /></div>
          </div>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 shadow-lg ring-1 ring-emerald-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">Paid</p>
              <p className="mt-2 text-3xl font-bold text-emerald-900">{summary.paid}</p>
            </div>
            <div className="p-3 bg-emerald-200 rounded-lg"><CheckCircle2 className="text-emerald-600" size={24} /></div>
          </div>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 p-6 shadow-lg ring-1 ring-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">Pending</p>
              <p className="mt-2 text-3xl font-bold text-amber-900">{summary.pending}</p>
            </div>
            <div className="p-3 bg-amber-200 rounded-lg"><Clock className="text-amber-600" size={24} /></div>
          </div>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-violet-50 to-violet-100 p-6 shadow-lg ring-1 ring-violet-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-violet-600">Upcoming</p>
              <p className="mt-2 text-3xl font-bold text-violet-900">{summary.upcoming}</p>
            </div>
            <div className="p-3 bg-violet-200 rounded-lg"><TrendingUp className="text-violet-600" size={24} /></div>
          </div>
        </div>
      </div>

      {message && <div className="mb-6 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700 ring-1 ring-slate-200">{message}</div>}

      <div className="grid gap-6 lg:grid-cols-[420px_minmax(0,1fr)]">
        <section className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">{editingBooking ? "Edit booking" : "Create a new booking"}</h2>
              <p className="mt-2 text-slate-600">{editingBooking ? "Adjust the booking details and save changes." : "Select a service, choose a date, and optionally attach an image."}</p>
            </div>
            {editingBooking && (
              <button
                onClick={cancelEdit}
                className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
              >
                Cancel edit
              </button>
            )}
          </div>

          <div className="mt-6 space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Service</span>
              <select
                value={editingBooking ? editForm.service : form.service}
                onChange={(e) => {
                  const selected = serviceOptions.find((option) => option.label === e.target.value);
                  const setter = editingBooking ? setEditForm : setForm;
                  const state = editingBooking ? editForm : form;
                  setter({ ...state, service: e.target.value, price: selected?.price || state.price });
                }}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500"
              >
                {serviceOptions.map((option) => (
                  <option key={option.label} value={option.label}>
                    {option.label} — ${option.price}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Date</span>
              <input
                type="date"
                value={editingBooking ? editForm.date : form.date}
                onChange={(e) => {
                  const setter = editingBooking ? setEditForm : setForm;
                  const state = editingBooking ? editForm : form;
                  setter({ ...state, date: e.target.value });
                }}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Photo upload</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setImage(file);
                  setPreview(file ? URL.createObjectURL(file) : null);
                }}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none"
              />
            </label>

            {preview && (
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="mb-2 text-sm font-medium text-slate-700">Image preview</p>
                <img src={preview} alt="Preview" className="h-48 w-full rounded-3xl object-cover" />
              </div>
            )}

            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-slate-700">Price</span>
              <strong className="text-lg text-slate-900">${editingBooking ? editForm.price : form.price}</strong>
            </div>

            <button
              onClick={editingBooking ? updateBooking : handleBooking}
              disabled={loading}
              className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {editingBooking ? "Save changes" : loading ? "Saving booking..." : "Create Booking"}
            </button>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Latest bookings</h2>
              <p className="mt-2 text-slate-600">Track payment status and upload progress.</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {bookings.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 p-6 text-slate-500">
                No bookings yet. Create one to see it here.
              </div>
            ) : (
              bookings.map((booking) => (
                <div key={booking._id} className="rounded-3xl border border-slate-200 p-5 shadow-sm">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">{booking.service}</h3>
                      <p className="mt-1 text-sm text-slate-600">{booking.date}</p>
                      <p className="mt-2 text-sm text-slate-600">Price: ${booking.price}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded-full px-3 py-1 text-sm ${booking.paymentStatus === "paid" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                        {booking.paymentStatus}
                      </span>
                      <span className={`rounded-full px-3 py-1 text-sm ${booking.status === "confirmed" ? "bg-sky-100 text-sky-700" : booking.status === "cancelled" ? "bg-rose-100 text-rose-700" : "bg-slate-100 text-slate-700"}`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>

                  {booking.imageUrl && (
                    <img alt="Booking" src={booking.imageUrl} className="mt-4 h-40 w-full rounded-3xl object-cover" />
                  )}

                  <div className="mt-4 flex flex-wrap gap-3">
                    {booking.paymentStatus !== "paid" && (
                      <button
                        onClick={() => handlePay(booking)}
                        className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
                      >
                        Pay Now
                      </button>
                    )}
                    <button
                      onClick={() => startEdit(booking)}
                      className="rounded-2xl bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700 transition hover:bg-sky-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(booking._id)}
                      className="rounded-2xl bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-200"
                    >
                      Delete
                    </button>
                    <span className="text-sm text-slate-500">Booking ID: {booking._id}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}