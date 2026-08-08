import { useState } from "react";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

export default function DashboardLayout({ children }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      <div className="lg:pl-64">
        <Header
          onMenuClick={() => setMobileSidebarOpen(true)}
        />

        <main className="min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-[1600px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}