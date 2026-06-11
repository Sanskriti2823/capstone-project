import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Services() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const services = [
    {
      id: 1,
      title: "Wedding Shoot",
      price: 499,
      duration: "8 hours",
      description: "Capture the most important day of your life",
      features: ["Full day coverage", "Candid shots", "Edited gallery", "USB delivery", "Rush processing available"],
      image: "🎂",
    },
    {
      id: 2,
      title: "Portrait Session",
      price: 199,
      duration: "2 hours",
      description: "Professional portraits for professionals",
      features: ["Studio setup", "Lighting design", "Multiple looks", "Digital files", "Quick turnaround"],
      image: "📸",
    },
    {
      id: 3,
      title: "Video Package",
      price: 899,
      duration: "Full day",
      description: "Cinematic video production for events",
      features: ["4K recording", "Professional editing", "Color grading", "Sound design", "Drone footage"],
      image: "🎬",
    },
  ];

  const handleBooking = (service) => {
    if (!token) {
      navigate("/register");
      return;
    }
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate("/")}
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-600 cursor-pointer"
          >
            StudioPro
          </button>
          <button
            onClick={() => navigate("/")}
            className="rounded-2xl bg-slate-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-600"
          >
            Back
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold text-white sm:text-6xl">Our Services</h1>
          <p className="mt-6 text-xl text-slate-400">Choose the perfect package for your needs</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.id}
                className="group rounded-3xl border border-slate-700 bg-slate-800/50 p-8 backdrop-blur-sm transition hover:border-sky-500 hover:bg-slate-800 hover:shadow-2xl hover:shadow-sky-500/10"
              >
                <div className="text-6xl mb-4">{service.image}</div>
                <h2 className="text-2xl font-bold text-white">{service.title}</h2>
                <p className="mt-2 text-slate-400">{service.description}</p>

                <div className="mt-6 flex items-end gap-2">
                  <span className="text-4xl font-bold text-sky-400">${service.price}</span>
                  <span className="text-slate-400">/{service.duration}</span>
                </div>

                <div className="mt-8 space-y-3 border-t border-slate-700 pt-8">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-emerald-400" />
                      <span className="text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleBooking(service)}
                  className="mt-8 w-full rounded-2xl bg-gradient-to-r from-sky-500 to-sky-600 px-6 py-3 text-sm font-semibold text-white transition group-hover:from-sky-600 group-hover:to-sky-700"
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: "Can I customize my package?",
                a: "Yes! Contact us for custom packages that fit your specific needs.",
              },
              {
                q: "Do you offer rush processing?",
                a: "Available for wedding and video packages. Additional fees apply.",
              },
              {
                q: "What's your cancellation policy?",
                a: "Full refund if cancelled 7+ days before booking date.",
              },
              {
                q: "How do I receive my photos?",
                a: "Digital files via secure cloud link and USB drive for premium packages.",
              },
            ].map((faq, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-700 bg-slate-800/50 p-6 backdrop-blur-sm">
                <h3 className="font-semibold text-white">{faq.q}</h3>
                <p className="mt-3 text-slate-400">{faq.a}</p>
              </div>
            ))}
          </div>
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
