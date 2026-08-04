import { Bell, Search } from "lucide-react";
import useAuth from "../../hooks/useAuth";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">

      {/* Search */}
      <div className="relative w-96">

        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search jobs..."
          className="w-full rounded-lg border border-slate-300 py-2 pl-10 pr-4 outline-none focus:border-blue-500"
        />

      </div>

      {/* User */}
      <div className="flex items-center gap-6">

        <button className="relative">
          <Bell size={22} />
          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <div className="text-right">
          <h2 className="font-semibold">
            {user?.name}
          </h2>

          <p className="text-sm text-slate-500">
            {user?.email}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
          {user?.name?.charAt(0).toUpperCase()}
        </div>

      </div>

    </header>
  );
}