import { useState, useEffect } from "react";
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
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
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

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-600">Welcome back</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">{name || "Studio Manager"}</h1>
            <p className="mt-2 text-slate-600">Manage bookings, upload photos, and accept payments from one place.</p>
          </div>
          {role === "admin" && (
            <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700 ring-1 ring-slate-200">
              Admin mode enabled
            </div>
          )}
        </div>
      </div>

      {message && <div className="mb-6 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700 ring-1 ring-slate-200">{message}</div>}

      <div className="grid gap-6 lg:grid-cols-[420px_minmax(0,1fr)]">
        <section className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200">
          <h2 className="text-2xl font-semibold text-slate-900">Create a new booking</h2>
          <p className="mt-2 text-slate-600">Select a package, choose a date, and optionally attach an image.</p>

          <div className="mt-6 space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Service</span>
              <select
                value={form.service}
                onChange={(e) => {
                  const selected = serviceOptions.find((option) => option.label === e.target.value);
                  setForm({ ...form, service: e.target.value, price: selected?.price || form.price });
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
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Photo upload</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none"
              />
            </label>

            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-slate-700">Price</span>
              <strong className="text-lg text-slate-900">${form.price}</strong>
            </div>

            <button
              onClick={handleBooking}
              disabled={loading}
              className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {loading ? "Saving booking..." : "Create Booking"}
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