import { NavLink, useNavigate } from "react-router-dom";

export default function NavBar() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="space-y-1">
          <NavLink to="/" className="text-xl font-semibold text-slate-900">
            StudioPro
          </NavLink>
          {token && (
            <p className="text-xs text-slate-500">Hello, {name || "Studio Manager"}</p>
          )}
        </div>

        <nav className="flex items-center gap-3 text-sm text-slate-600">
          {token ? (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-2 transition ${isActive ? "bg-slate-900 text-white" : "hover:bg-slate-100"}`
                }
              >
                Dashboard
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
              <button
                onClick={logout}
                className="rounded-2xl bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-700"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/"
              className="rounded-2xl px-4 py-2 hover:bg-slate-100"
            >
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
