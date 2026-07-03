import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import logo from "../assets/logo.png";

function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">

      {/* Sidebar */}
      <div className="w-72 fixed left-0 top-0 h-screen bg-white border-r border-slate-200 z-50">
        <Sidebar />
      </div>

      {/* Main Section */}
      <div className="flex-1 ml-72 flex flex-col h-screen">

        {/* Navbar */}
        <div className="fixed top-0 left-72 right-0 z-40 bg-white border-b border-slate-200">
          <Navbar />
        </div>

        {/* Content Area */}
        <main className="relative mt-24 flex-1 overflow-y-auto p-8">

          {/* Fixed Watermark */}
          <div
            className="fixed inset-0 pointer-events-none z-0"
            style={{
              left: "18rem", // Sidebar width
              top: "96px",   // Navbar height
              backgroundImage: `url(${logo})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",

              // Increase logo size
              backgroundSize: "850px",

              // Increase visibility
              opacity: 0.08,

              // Make logo appear slightly thicker
              filter:
                "drop-shadow(0 0 3px rgba(16,185,129,0.25)) contrast(1.2) saturate(1.2)",
            }}
          />

          {/* Page Content */}
          <div className="relative z-10">
            {children}
          </div>

        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;