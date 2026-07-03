import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("role");

  const activeMenu = (path) => {
    return location.pathname === path
      ? "bg-emerald-50 text-emerald-700 border-r-4 border-emerald-600"
      : "text-slate-600 hover:bg-slate-100";
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="relative h-screen flex flex-col justify-between bg-white overflow-hidden">

      {/* Background Watermark */}
      <img
        src={logo}
        alt="Watermark"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[420px] h-[420px] object-contain opacity-5 pointer-events-none select-none"
      />

      {/* Top Section */}
      <div className="relative z-10">

        {/* Logo */}
        <div className="px-6 py-6 border-b border-slate-200">
          <div className="flex flex-col items-center">

            <img
              src={logo}
              alt="MediFund Logo"
              className="w-32 h-32 object-contain"
            />

            <h1 className="mt-3 text-3xl font-bold text-slate-800">
              MediFund
            </h1>

            <p className="text-slate-500 text-sm">
              Medical Crowdfunding
            </p>

          </div>
        </div>

        {/* Navigation */}
        <div className="py-6">

          <p className="px-8 text-xs uppercase tracking-[3px] text-slate-400 mb-5">
            Main Menu
          </p>

          <ul className="space-y-2">

            <li>
              <Link
                to={`/${role}`}
                className={`flex items-center gap-4 px-8 py-4 font-medium transition duration-300 ${activeMenu(`/${role}`)}`}
              >
                <span className="text-xl">📊</span>
                Dashboard
              </Link>
            </li>

            {role === "patient" && (
              <>
                <li>
                  <Link
                    to="/create-campaign"
                    className={`flex items-center gap-4 px-8 py-4 font-medium transition duration-300 ${activeMenu("/create-campaign")}`}
                  >
                    <span className="text-xl">➕</span>
                    Create Campaign
                  </Link>
                </li>

                <li>
                  <Link
                    to="/my-campaigns"
                    className={`flex items-center gap-4 px-8 py-4 font-medium transition duration-300 ${activeMenu("/my-campaigns")}`}
                  >
                    <span className="text-xl">📁</span>
                    My Campaigns
                  </Link>
                </li>
              </>
            )}

            {role === "donor" && (
              <>
                <li>
                  <Link
                    to="/campaigns"
                    className={`flex items-center gap-4 px-8 py-4 font-medium transition duration-300 ${activeMenu("/campaigns")}`}
                  >
                    <span className="text-xl">❤️</span>
                    Browse Campaigns
                  </Link>
                </li>

                <li>
                  <Link
                    to="/my-donations"
                    className={`flex items-center gap-4 px-8 py-4 font-medium transition duration-300 ${activeMenu("/my-donations")}`}
                  >
                    <span className="text-xl">💰</span>
                    My Donations
                  </Link>
                </li>
              </>
            )}

            {role === "admin" && (
              <li>
                <Link
                  to="/admin-campaigns"
                  className={`flex items-center gap-4 px-8 py-4 font-medium transition duration-300 ${activeMenu("/admin-campaigns")}`}
                >
                  <span className="text-xl">✔️</span>
                  Verify Campaigns
                </Link>
              </li>
            )}

          </ul>
        </div>
      </div>

      {/* Logout Button */}
      <div className="relative z-10 p-6 border-t border-slate-200 bg-white">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition duration-300 shadow-lg"
        >
          <span className="text-xl">🚪</span>
          Logout
        </button>
      </div>

    </div>
  );
}

export default Sidebar;