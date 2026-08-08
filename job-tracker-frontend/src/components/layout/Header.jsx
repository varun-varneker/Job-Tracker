import {
  Menu,
  Bell,
  Search,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

export default function Header({ onMenuClick }) {
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const displayName =
    user?.name ||
    user?.username ||
    user?.email?.split("@")[0] ||
    "User";

  const email = user?.email || "";

  const avatarLetter = displayName
    .charAt(0)
    .toUpperCase();

  const handleLogout = async () => {
    setProfileOpen(false);

    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Mobile menu */}
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 lg:hidden"
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Search */}
        <button
          type="button"
          className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-400 transition hover:border-slate-300 hover:bg-white sm:flex sm:w-64"
        >
          <Search className="h-4 w-4" />

          <span>Search...</span>

          <kbd className="ml-auto rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] text-slate-400">
            ⌘ K
          </kbd>
        </button>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Mobile search */}
        <button
          type="button"
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 sm:hidden"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>

        {/* Notifications */}
        <button
          type="button"
          className="relative rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />

          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white" />
        </button>

        <div className="mx-1 h-6 w-px bg-slate-200" />

        {/* Profile */}
        <div className="relative">
          <button
            type="button"
            onClick={() =>
              setProfileOpen((value) => !value)
            }
            className="flex items-center gap-2 rounded-lg p-1.5 transition hover:bg-slate-100"
            aria-expanded={profileOpen}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
              {avatarLetter}
            </div>

            <div className="hidden text-left md:block">
              <p className="max-w-32 truncate text-sm font-medium text-slate-800">
                {displayName}
              </p>

              <p className="max-w-32 truncate text-[11px] text-slate-400">
                {email}
              </p>
            </div>

            <ChevronDown className="hidden h-4 w-4 text-slate-400 md:block" />
          </button>

          {profileOpen && (
            <>
              {/* Click-away */}
              <button
                type="button"
                className="fixed inset-0 z-40 cursor-default"
                onClick={() => setProfileOpen(false)}
                aria-label="Close profile menu"
              />

              {/* Dropdown */}
              <div className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
                <div className="border-b border-slate-100 px-4 py-3">
                  <p className="truncate text-sm font-medium text-slate-900">
                    {displayName}
                  </p>

                  <p className="mt-0.5 truncate text-xs text-slate-400">
                    {email}
                  </p>
                </div>

                <NavLink
                  to="/profile"
                  onClick={() => setProfileOpen(false)}
                  className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
                >
                  Profile
                </NavLink>

                <NavLink
                  to="/settings"
                  onClick={() => setProfileOpen(false)}
                  className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
                >
                  Settings
                </NavLink>

                <div className="my-1 border-t border-slate-100" />

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}