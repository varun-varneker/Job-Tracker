import {
  LayoutDashboard,
  BriefcaseBusiness,
  FileText,
  BarChart3,
  CalendarDays,
  Settings,
  UserCircle,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { cn } from "../../lib/utils";

const navigation = [
  {
    label: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Jobs",
    path: "/jobs",
    icon: BriefcaseBusiness,
  },
  {
    label: "Resumes",
    path: "/resumes",
    icon: FileText,
  },
  {
    label: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    label: "Calendar",
    path: "/calendar",
    icon: CalendarDays,
  },
];

const secondaryNavigation = [
  {
    label: "Profile",
    path: "/profile",
    icon: UserCircle,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export default function Sidebar({
  mobileOpen = false,
  onMobileClose,
}) {
  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col",
          "border-r border-slate-200 bg-white",
          "transition-transform duration-300",
          "lg:translate-x-0",
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full"
        )}
      >
        {/* Brand */}
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">
          <NavLink
            to="/"
            onClick={onMobileClose}
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
              <span className="text-lg font-bold">
                C
              </span>
            </div>

            <div>
              <p className="text-base font-bold tracking-tight text-slate-900">
                CareerCanvas
              </p>

              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                Career workspace
              </p>
            </div>
          </NavLink>

          {/* Mobile close */}
          <button
            type="button"
            onClick={onMobileClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 lg:hidden"
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Main navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
          <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Workspace
          </p>

          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                onClick={onMobileClose}
                className={({ isActive }) =>
                  cn(
                    "group flex items-center gap-3 rounded-lg px-3 py-2.5",
                    "text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={cn(
                        "h-4.5 w-4.5",
                        isActive
                          ? "text-blue-600"
                          : "text-slate-400 group-hover:text-slate-600"
                      )}
                    />

                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}

          <div className="my-5 border-t border-slate-100" />

          <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Account
          </p>

          {secondaryNavigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onMobileClose}
                className={({ isActive }) =>
                  cn(
                    "group flex items-center gap-3 rounded-lg px-3 py-2.5",
                    "text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={cn(
                        "h-4.5 w-4.5",
                        isActive
                          ? "text-blue-600"
                          : "text-slate-400 group-hover:text-slate-600"
                      )}
                    />

                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="border-t border-slate-200 p-4">
          <div className="mb-3 rounded-xl bg-slate-50 p-3">
            <p className="text-xs font-semibold text-slate-700">
              Keep moving 🚀
            </p>

            <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
              Every application brings you closer to your next opportunity.
            </p>
          </div>

          
        </div>
      </aside>
    </>
  );
}