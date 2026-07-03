import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import DashboardLayout from "../Components/DashboardLayout";

function DonorDashboard() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/my-donations/", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setDonations(res.data);
    } catch (error) {
      console.error("Error fetching donor donations:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalDonationsCount = donations.length;
  const totalAmount = donations.reduce(
    (total, donation) => total + Number(donation.amount),
    0
  );
  const latestDonation = donations.length > 0 ? donations[0] : null;

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-[70vh]">
          <div className="text-2xl font-semibold text-slate-500 animate-pulse">
            Loading Dashboard...
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const username = localStorage.getItem("username") || "Donor";

  return (
    <DashboardLayout>
      {/* Welcome Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-5xl font-bold text-slate-800">
            Welcome back, {username}!
          </h1>
          <p className="text-slate-500 text-lg mt-2">
            Your generosity brings hope and saves lives. Thank you for your support.
          </p>
        </div>
        <div>
          <Link to="/campaigns">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-4 rounded-2xl shadow-md transition duration-300 hover:-translate-y-0.5">
              Browse Campaigns ❤️
            </button>
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-10">
        {/* Total Contributed Card */}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden group hover:shadow-xl transition duration-300">
          <div className="absolute right-6 top-6 text-5xl opacity-25 group-hover:scale-110 transition duration-300">
            🎁
          </div>
          <p className="text-lg font-medium opacity-90">Total Contributed</p>
          <h2 className="text-5xl font-bold mt-4">
            ₹{totalAmount.toLocaleString()}
          </h2>
          <p className="mt-4 text-sm opacity-80">
            Across {totalDonationsCount} contributions
          </p>
        </div>

        {/* Total Donations Count Card */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition duration-300">
          <div className="flex justify-between items-start mb-4">
            <p className="text-slate-500 text-lg font-medium">Donations Made</p>
            <span className="text-3xl">❤️</span>
          </div>
          <h2 className="text-5xl font-bold text-slate-800">
            {totalDonationsCount}
          </h2>
          <p className="mt-4 text-sm text-slate-400">
            Total active contributions recorded
          </p>
        </div>

        {/* Latest Donation Card */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition duration-300">
          <div className="flex justify-between items-start mb-4">
            <p className="text-slate-500 text-lg font-medium">Latest Donation</p>
            <span className="text-3xl text-emerald-500">✨</span>
          </div>
          {latestDonation ? (
            <div>
              <h2 className="text-3xl font-bold text-emerald-600">
                ₹{Number(latestDonation.amount).toLocaleString()}
              </h2>
              <p className="mt-3 text-sm text-slate-600 line-clamp-1">
                For {latestDonation.campaign_title}
              </p>
            </div>
          ) : (
            <div>
              <h2 className="text-3xl font-bold text-slate-400">₹0</h2>
              <p className="mt-3 text-sm text-slate-400">No donations made yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Recent Activity</h2>
            <p className="text-slate-500 text-sm mt-1">Your latest donation contributions</p>
          </div>
          {donations.length > 0 && (
            <Link to="/my-donations" className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm transition">
              View All History →
            </Link>
          )}
        </div>

        {donations.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <div className="text-5xl mb-4">🩹</div>
            <h3 className="text-xl font-semibold text-slate-700">No Contributions Yet</h3>
            <p className="text-slate-500 mt-2 mb-6">You haven't supported any campaigns yet. Join in to make a difference today!</p>
            <Link to="/campaigns">
              <button className="bg-slate-900 hover:bg-black text-white px-6 py-3 rounded-xl font-semibold transition">
                Start Browsing
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {donations.slice(0, 3).map((donation) => (
              <div
                key={donation.id}
                className="flex justify-between items-center p-4 bg-slate-50 hover:bg-slate-100/70 border border-slate-100 rounded-2xl transition duration-200"
              >
                <div>
                  <h3 className="font-semibold text-slate-800 text-lg">
                    {donation.campaign_title}
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">
                    {new Date(donation.donated_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric"
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-emerald-600 text-xl">
                    ₹{Number(donation.amount).toLocaleString()}
                  </span>
                  <p className="text-xs text-slate-400 mt-1">Successful</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default DonorDashboard;