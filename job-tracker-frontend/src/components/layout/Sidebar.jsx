import {
  LayoutDashboard,
  BriefcaseBusiness,
  FileText,
  User,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Sidebar() {
  const { logout, user } = useAuth();

  const navItem =
    "flex items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-slate-800";

  const activeItem =
    "bg-blue-600 text-white";

  return (
    <aside className="flex h-screen w-64 flex-col bg-slate-900 text-white">

      {/* Logo */}
      <div className="border-b border-slate-800 p-6">
        <h1 className="text-2xl font-bold">
          Job Tracker
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Welcome, {user?.name}
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">

        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${navItem} ${isActive ? activeItem : ""}`
          }
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to="/jobs"
          className={({ isActive }) =>
            `${navItem} ${isActive ? activeItem : ""}`
          }
        >
          <BriefcaseBusiness size={20} />
          Jobs
        </NavLink>

        <NavLink
          to="/resumes"
          className={({ isActive }) =>
            `${navItem} ${isActive ? activeItem : ""}`
          }
        >
          <FileText size={20} />
          Resumes
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `${navItem} ${isActive ? activeItem : ""}`
          }
        >
          <User size={20} />
          Profile
        </NavLink>

      </nav>

      {/* Logout */}
      <div className="border-t border-slate-800 p-4">

        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-red-600"
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>

    </aside>
  );
}