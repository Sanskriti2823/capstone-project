import { Link, useNavigate } from "react-router-dom";
import { Camera, CreditCard, Cloud, BarChart3, Users, Zap, CheckCircle, Star, ArrowRight } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Camera,
      title: "Professional Bookings",
      desc: "Easy-to-use booking system for photographers and studios",
      color: "from-sky-500 to-cyan-500",
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      desc: "Stripe integration for safe and quick payment processing",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: Cloud,
      title: "Cloud Storage",
      desc: "Cloudinary-powered image uploads and management",
      color: "from-violet-500 to-purple-500",
    },
    {
      icon: BarChart3,
      title: "Admin Dashboard",
      desc: "Real-time analytics and booking management tools",
      color: "from-orange-500 to-rose-500",
    },
    {
      icon: Users,
      title: "Client Management",
      desc: "Organize and track all your studio clients",
      color: "from-pink-500 to-red-500",
    },
    {
      icon: Zap,
      title: "AI Assistant",
      desc: "Smart recommendations and instant support for your studio",
      color: "from-yellow-500 to-amber-500",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      title: "Wedding Photographer",
      text: "StudioPro transformed how I manage bookings. I've saved hours every week!",
      rating: 5,
    },
    {
      name: "Marcus Chen",
      title: "Portrait Studio Owner",
      text: "The payment integration is seamless. My clients love the easy checkout process.",
      rating: 5,
    },
    {
      name: "Emma Davis",
      title: "Video Production Lead",
      text: "Best investment for studio management. The analytics dashboard is incredibly helpful.",
      rating: 5,
    },
  ];

  const pricing = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      features: ["Up to 50 bookings", "Basic analytics", "Email support", "Cloudinary integration"],
      cta: "Get Started",
      highlight: false,
    },
    {
      name: "Professional",
      price: "$79",
      period: "/month",
      features: ["Unlimited bookings", "Advanced analytics", "Priority support", "Stripe payments", "AI Assistant", "Custom branding"],
      cta: "Start Free Trial",
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      features: ["Everything in Professional", "Dedicated account manager", "API access", "Custom integrations", "Team management"],
      cta: "Contact Sales",
      highlight: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-white overflow-hidden">
      {/* Header */}
      <header className="border-b border-slate-800/50 bg-slate-900/70 backdrop-blur-xl sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="text-2xl font-bold bg-gradient-to-r from-sky-400 via-sky-300 to-cyan-400 bg-clip-text text-transparent">
            ✨ StudioPro
          </div>
          <Link
            to="/login"
            className="rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 px-6 py-2 text-sm font-semibold text-white hover:from-sky-600 hover:to-cyan-600 transition shadow-lg"
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-4 py-32 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-sky-900/20 via-transparent to-cyan-900/20 blur-3xl" />
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-block mb-6 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-sm font-semibold">
            🎯 The Studio Management Platform for Modern Photographers
          </div>
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6">
            Manage Your Studio
            <span className="block bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              With Confidence
            </span>
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Streamline bookings, automate payments, manage clients, and grow your studio business with our all-in-one platform. Join 500+ studios worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => navigate("/register")}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 px-8 py-4 text-lg font-semibold text-white hover:from-sky-600 hover:to-cyan-600 transition shadow-xl hover:shadow-2xl hover:scale-105 transform duration-200"
            >
              Get Started Free <ArrowRight className="group-hover:translate-x-1 transition" size={20} />
            </button>
            <button
              onClick={() => document.getElementById("features").scrollIntoView({ behavior: "smooth" })}
              className="rounded-full border-2 border-slate-600 px-8 py-4 text-lg font-semibold text-slate-300 hover:border-slate-500 hover:bg-slate-800/50 transition"
            >
              Learn More
            </button>
          </div>
          <div className="flex items-center justify-center gap-8 text-sm text-slate-400">
            <div className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-500" /> No credit card required</div>
            <div className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-500" /> Free 14-day trial</div>
            <div className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-500" /> Cancel anytime</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-slate-400">Everything you need to run a successful studio</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className={`group rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-800/30 to-slate-900/30 p-8 backdrop-blur hover:border-slate-700 transition transform hover:scale-105 hover:shadow-xl`}
                >
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.color} bg-opacity-10 mb-4`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-400">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 py-24 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-800/30 to-slate-900/30">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-5xl font-bold text-center mb-20">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: 1, title: "Sign Up", desc: "Create your account in seconds" },
              { num: 2, title: "Set Up Studio", desc: "Add your services and pricing" },
              { num: 3, title: "Share Booking Link", desc: "Clients book directly online" },
              { num: 4, title: "Get Paid", desc: "Payments handled automatically" },
            ].map((step) => (
              <div key={step.num} className="relative">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-bold text-lg mb-4">
                    {step.num}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-slate-400 text-sm">{step.desc}</p>
                </div>
                {step.num < 4 && (
                  <div className="hidden md:block absolute top-8 -right-4 text-slate-600">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-5xl font-bold text-center mb-20">Loved by Studios</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-800 bg-slate-800/30 p-8 backdrop-blur">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 mb-6">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-slate-400">{testimonial.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-4 py-24 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-800/30 to-slate-900/30">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-5xl font-bold text-center mb-4">Simple, Transparent Pricing</h2>
          <p className="text-center text-slate-400 mb-20 text-lg">Choose the perfect plan for your studio</p>
          <div className="grid md:grid-cols-3 gap-8">
            {pricing.map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-2xl transition transform ${
                  plan.highlight
                    ? "border-2 border-sky-500 bg-gradient-to-br from-sky-950/50 to-slate-900/50 scale-105 shadow-2xl shadow-sky-500/20"
                    : "border border-slate-800 bg-slate-800/30"
                } p-8 backdrop-blur`}
              >
                {plan.highlight && <div className="text-center text-sm font-semibold text-sky-400 mb-4 bg-sky-500/10 rounded-full py-1 px-3 inline-block">MOST POPULAR</div>}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-slate-400 ml-2">{plan.period}</span>
                </div>
                <button
                  onClick={() => navigate("/register")}
                  className={`w-full rounded-lg py-3 font-semibold transition mb-8 ${
                    plan.highlight
                      ? "bg-gradient-to-r from-sky-500 to-cyan-500 text-white hover:from-sky-600 hover:to-cyan-600"
                      : "border border-slate-600 text-slate-300 hover:bg-slate-800/50"
                  }`}
                >
                  {plan.cta}
                </button>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300">
                      <CheckCircle size={16} className="text-emerald-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to Transform Your Studio?</h2>
          <p className="text-xl text-slate-400 mb-10">Join hundreds of photographers and studios already using StudioPro</p>
          <button
            onClick={() => navigate("/register")}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 px-10 py-4 text-lg font-semibold text-white hover:from-sky-600 hover:to-cyan-600 transition shadow-xl hover:shadow-2xl transform hover:scale-105 duration-200"
          >
            Start Your Free Trial <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/50 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition">Docs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-slate-400">
            <p>© 2026 StudioPro. All rights reserved.</p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <a href="#" className="hover:text-white transition">Twitter</a>
              <a href="#" className="hover:text-white transition">Instagram</a>
              <a href="#" className="hover:text-white transition">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
