import { Link } from "react-router-dom";

export default function Cancel() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-xl rounded-[2rem] bg-white p-10 shadow-2xl ring-1 ring-slate-200">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-rose-100 text-4xl text-rose-700">
          ✕
        </div>
        <h1 className="text-3xl font-semibold text-slate-900">Payment cancelled</h1>
        <p className="mt-4 text-slate-600">The payment was cancelled. You can try again from your dashboard.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/dashboard"
            className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Back to dashboard
          </Link>
          <Link
            to="/"
            className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
