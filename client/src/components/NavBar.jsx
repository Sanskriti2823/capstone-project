import { NavLink, useNavigate } from "react-router-dom";
import { User, LogOut, Menu } from "lucide-react";
import { useState } from "react";

export default function NavBar() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <header className="border-b border-transparent bg-gradient-to-r from-[#06b6d4]/70 to-[#7c3aed]/40 backdrop-blur-xl shadow-sm sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="space-y-1">
          <NavLink to="/" className="text-2xl font-bold gradient-text">
            StudioPro
          </NavLink>
          {token && (
            <p className="text-xs text-slate-500">Hello, {name || "Studio Manager"}</p>
          )}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-3 text-sm text-slate-600">
          {!token ? (
            <>
              <NavLink
                to="/services"
                className="rounded-2xl px-4 py-2 transition hover:bg-slate-100"
              >
                Services
              </NavLink>
              <NavLink
                to="/"
                className="rounded-2xl px-4 py-2 transition hover:bg-slate-100"
              >
                Home
              </NavLink>
              <NavLink
                to="/login"
                className="btn-gradient"
              >
                Sign In
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-2 transition ${isActive ? "bg-slate-900 text-white" : "hover:bg-slate-100"}`
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-2 transition ${isActive ? "bg-slate-900 text-white" : "hover:bg-slate-100"}`
                }
              >
                Services
              </NavLink>
              {role === "admin" && (
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `rounded-2xl px-4 py-2 transition ${isActive ? "bg-slate-900 text-white" : "hover:bg-slate-100"}`
                  }
                >
                  Admin Panel
                </NavLink>
              )}
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `rounded-2xl px-3 py-2 transition flex items-center gap-2 ${isActive ? "bg-slate-900 text-white" : "hover:bg-slate-100"}`
                }
              >
                <User className="h-4 w-4" />
                Profile
              </NavLink>
              <button
                onClick={logout}
                className="rounded-2xl bg-rose-600 px-4 py-2 text-white transition hover:bg-rose-500 flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden rounded-2xl hover:bg-slate-100 p-2"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 sm:hidden">
          <nav className="space-y-2">
            {!token ? (
              <>
                <NavLink
                  to="/services"
                  className="block rounded-2xl px-4 py-2 hover:bg-slate-100"
                  onClick={() => setIsOpen(false)}
                >
                  Services
                </NavLink>
                <NavLink
                  to="/"
                  className="block rounded-2xl px-4 py-2 hover:bg-slate-100"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/login"
                  className="block rounded-2xl bg-slate-900 px-4 py-2 text-white text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/dashboard"
                  className="block rounded-2xl px-4 py-2 hover:bg-slate-100"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/services"
                  className="block rounded-2xl px-4 py-2 hover:bg-slate-100"
                  onClick={() => setIsOpen(false)}
                >
                  Services
                </NavLink>
                {role === "admin" && (
                  <NavLink
                    to="/admin"
                    className="block rounded-2xl px-4 py-2 hover:bg-slate-100"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin Panel
                  </NavLink>
                )}
                <NavLink
                  to="/profile"
                  className="block rounded-2xl px-4 py-2 hover:bg-slate-100"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </NavLink>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full rounded-2xl bg-rose-600 px-4 py-2 text-white text-left"
                >
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
