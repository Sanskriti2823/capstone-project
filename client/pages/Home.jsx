import { Link } from "react-router-dom";
import { Camera, CreditCard, Cloud, BarChart3, Users, Zap } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Camera,
      title: "Professional Bookings",
      desc: "Easy-to-use booking system for photographers and studios",
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      desc: "Stripe integration for safe and quick payment processing",
    },
    {
      icon: Cloud,
      title: "Cloud Storage",
      desc: "Cloudinary-powered image uploads and management",
    },
    {
      icon: BarChart3,
      title: "Admin Dashboard",
      desc: "Real-time analytics and booking management tools",
    },
    {
      icon: Users,
      title: "Client Management",
      desc: "Organize and track all your studio clients",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      desc: "Built with React and modern web technologies",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900/95 via-purple-900/90 to-rose-900/95 text-white">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="text-2xl font-bold gradient-text">
            StudioPro
          </div>
          <Link
            to="/"
            className="btn-gradient"
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
            Professional Studio Management
          </h1>
          <p className="mt-6 text-xl text-slate-400">
            Manage bookings, payments, and client imagery all in one beautiful platform.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/register"
              className="btn-gradient"
            >
              Get Started
            </Link>
            <Link
              to="/"
              className="rounded-2xl border border-slate-600 px-8 py-4 text-center text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:bg-slate-800/50"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold text-white">Powerful Features</h2>
            <p className="mt-4 text-slate-400">Everything you need to run your studio</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="card-glass transition hover:shadow-lg"
                >
                  <Icon className="h-12 w-12 text-sky-400" />
                  <h3 className="mt-4 text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="mt-3 text-slate-400">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl border border-slate-700 bg-gradient-to-r from-sky-900/20 to-slate-900/20 p-12 backdrop-blur-sm text-center">
          <h2 className="text-3xl font-bold text-white">Ready to grow your studio?</h2>
          <p className="mt-4 text-slate-400">
            Join hundreds of studios already managing their business with StudioPro.
          </p>
          <Link
            to="/register"
            className="mt-8 inline-block rounded-2xl bg-sky-600 px-8 py-4 text-sm font-semibold text-white transition hover:bg-sky-500"
          >
            Create Free Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center text-slate-400">
          <p>&copy; 2026 StudioPro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
