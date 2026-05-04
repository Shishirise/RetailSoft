<<<<<<< HEAD
import { Link, Outlet, useLocation } from "react-router";
=======
import { Link, Outlet, useLocation, useNavigate } from "react-router";
>>>>>>> 005beb18e (Initial commit - connect local project)
import {
  LayoutDashboard,
  Package,
  TrendingUp,
  FileText,
<<<<<<< HEAD
} from "lucide-react";

export function Layout() {
  const location = useLocation();
=======
  LogOut,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
>>>>>>> 005beb18e (Initial commit - connect local project)

  const navItems = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard },
    { path: "/inventory", label: "Inventory Mgmt.", icon: Package },
    { path: "/sales", label: "Sales Orders", icon: TrendingUp },
    { path: "/reports", label: "Reports", icon: FileText },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
<<<<<<< HEAD
      <aside className="w-64 bg-white border-r border-gray-200">
=======
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
>>>>>>> 005beb18e (Initial commit - connect local project)
        <div className="p-6">
          <h1 className="font-semibold text-xl">RetailSoft</h1>
          <p className="text-sm text-gray-500">
            Inventory & Sales Tracker
          </p>
        </div>

<<<<<<< HEAD
        <nav className="px-3">
=======
        <nav className="px-3 flex-1">
>>>>>>> 005beb18e (Initial commit - connect local project)
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 mb-1 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
<<<<<<< HEAD
=======

        <div className="p-3 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
>>>>>>> 005beb18e (Initial commit - connect local project)
      </aside>

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}