import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import DashboardLayout from "../Components/DashboardLayout";
import DonationChart from "../Components/DonationChart";
import CampaignStatusChart from "../Components/CampaignStatusChart";
import RecentDonations from "../Components/RecentDonations";
import TopCampaigns from "../Components/TopCampaigns";

function AdminDashboard() {
   const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [topCampaigns, setTopCampaigns] = useState([]);
  const [recentDonations, setRecentDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("This Month");
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [statsRes, topRes, recentRes] = await Promise.all([
        API.get("/dashboard/statistics/", { headers }),
        API.get("/dashboard/top-campaigns/", { headers }),
        API.get("/dashboard/recent-donations/", { headers }),
      ]);

      setStats(statsRes.data);
      setTopCampaigns(topRes.data);
      setRecentDonations(recentRes.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="grid grid-cols-4 gap-6 mt-10">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-36 rounded-3xl bg-slate-200 animate-pulse"
            />
          ))}
        </div>
      </DashboardLayout>
    );
  }

  const campaignStatusData = [
    {
      name: "Approved",
      status: "Approved",
      count: stats?.approved_campaigns || 0,
    },
    {
      name: "Pending",
      status: "Pending",
      count: stats?.pending_campaigns || 0,
    },
    {
      name: "Rejected",
      status: "Rejected",
      count: stats?.rejected_campaigns || 0,
    },
  ];

  return (
    <DashboardLayout>

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Welcome Admin 👋
          </h1>

          <p className="text-slate-500 mt-2">
            Manage campaigns, donations and users.
          </p>
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mt-4 lg:mt-0 border rounded-xl px-4 py-2"
        >
          <option>This Week</option>
          <option>This Month</option>
          <option>This Year</option>
        </select>

      </div>

      {/* Quick Actions */}

      <div className="flex flex-wrap gap-4 mb-8">

        <button
          onClick={() => navigate("/create-campaign")}
          className="bg-emerald-500 text-white px-5 py-3 rounded-xl shadow hover:bg-emerald-600 transition"
        >
          + Campaign
        </button>

        <button
          onClick={() => navigate("/admin-campaigns")}
          className="bg-blue-500 text-white px-5 py-3 rounded-xl shadow hover:bg-blue-600 transition"
        >
          Verify Campaigns
        </button>

        <button
          onClick={() => navigate("/campaigns")}
          className="bg-purple-500 text-white px-5 py-3 rounded-xl shadow hover:bg-purple-600 transition"
        >
          Browse Campaigns
        </button>

        <button
          onClick={() => navigate("/my-donations")}
          className="bg-orange-500 text-white px-5 py-3 rounded-xl shadow hover:bg-orange-600 transition"
        >
          My Donations
        </button>

      </div>

      {/* Statistics */}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        {/* Users */}

        <div className="bg-white rounded-3xl p-6 border shadow-sm hover:shadow-md">

          <p className="text-slate-500 font-semibold">
            👥 Total Users
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {stats?.total_users || 0}
          </h2>

          <div className="mt-4 text-sm space-y-1">

            <p>
              Patients : {stats?.patients || 0}
            </p>

            <p>
              Donors : {stats?.total_donors || 0}
            </p>

            <p>
              Admins : 1
            </p>

          </div>

        </div>

        {/* Campaigns */}

        <div className="bg-white rounded-3xl p-6 border shadow-sm hover:shadow-md">

          <p className="text-slate-500 font-semibold">
            📋 Campaigns
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {stats?.total_campaigns || 0}
          </h2>

          <div className="mt-4 space-y-1 text-sm">

            <p className="text-green-600">
              ✅ Approved : {stats?.approved_campaigns || 0}
            </p>

            <p className="text-yellow-500">
              ⏳ Pending : {stats?.pending_campaigns || 0}
            </p>

            <p className="text-red-500">
              ❌ Rejected : {stats?.rejected_campaigns || 0}
            </p>

          </div>

        </div>

        {/* Donations */}

        <div className="bg-white rounded-3xl p-6 border shadow-sm hover:shadow-md">

          <p className="text-slate-500 font-semibold">
            💰 Donations
          </p>

          <h2 className="text-4xl font-bold text-emerald-600 mt-3">
            ₹{stats?.total_amount?.toLocaleString() || 0}
          </h2>

          <p className="text-sm text-slate-500 mt-3">
            {stats?.total_donations || 0} Transactions
          </p>

          <p className="mt-2 text-sm">
            Today :
            <span className="text-emerald-600 font-semibold ml-2">
              ₹{stats?.today_donation || 0}
            </span>
          </p>

        </div>

        {/* Donors */}

        <div className="bg-white rounded-3xl p-6 border shadow-sm hover:shadow-md">

          <p className="text-slate-500 font-semibold">
            ❤️ Active Donors
          </p>

          <h2 className="text-4xl font-bold text-blue-600 mt-3">
            {stats?.total_donors || 0}
          </h2>

          <p className="mt-4 text-sm">
            New This Month
          </p>

          <p className="font-semibold text-blue-600">
            {stats?.new_donors || 0}
          </p>

        </div>

      </div>

      {/* Charts */}

      <div className="grid lg:grid-cols-2 gap-8 mb-10">

        <DonationChart data={stats?.monthly_donations || []} />

        <CampaignStatusChart
          data={campaignStatusData}
        />

      </div>

      {/* Tables */}

      <div className="grid lg:grid-cols-2 gap-8">

        <TopCampaigns
          campaigns={topCampaigns}
        />

        <RecentDonations
          donations={recentDonations}
        />

      </div>

    </DashboardLayout>
  );
}

export default AdminDashboard;