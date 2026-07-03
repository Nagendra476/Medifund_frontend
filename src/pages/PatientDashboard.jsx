import { useEffect, useState } from "react";

import API from "../services/api";

import DashboardLayout from "../Components/DashboardLayout";

function PatientDashboard() {

  const [campaigns, setCampaigns] = useState([]);

  const [stats, setStats] = useState({

    totalCampaigns: 0,

    approvedCampaigns: 0,

    pendingCampaigns: 0,

    totalRaised: 0,

  });

  useEffect(() => {

    fetchDashboardData();

  }, []);

  // Fetch Dashboard Data

  const fetchDashboardData = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.get(

        "/campaigns/my-campaigns/",

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      );

      const data = res.data;

      setCampaigns(data);

      // Stats

      const approved = data.filter(
        item => item.status === "approved"
      ).length;

      const pending = data.filter(
        item => item.status === "pending"
      ).length;

      const totalRaised = data.reduce(

        (total, item) =>

          total + Number(item.raised_amount),

        0

      );

      setStats({

        totalCampaigns: data.length,

        approvedCampaigns: approved,

        pendingCampaigns: pending,

        totalRaised: totalRaised,

      });

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <DashboardLayout>

      {/* Header */}

      <div className="mb-10">

        <h1 className="text-5xl font-bold text-slate-800 mb-3">

          Patient Dashboard

        </h1>

        <p className="text-slate-500 text-lg">

          Manage campaigns and track fundraising progress.

        </p>

      </div>

      {/* Statistics Cards */}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        {/* Total Campaigns */}

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">

          <p className="text-slate-500 mb-2">

            Total Campaigns

          </p>

          <h2 className="text-4xl font-bold text-slate-800">

            {stats.totalCampaigns}

          </h2>

        </div>

        {/* Approved */}

        <div className="bg-green-50 rounded-3xl p-6 border border-green-200">

          <p className="text-green-700 mb-2">

            Approved Campaigns

          </p>

          <h2 className="text-4xl font-bold text-green-700">

            {stats.approvedCampaigns}

          </h2>

        </div>

        {/* Pending */}

        <div className="bg-yellow-50 rounded-3xl p-6 border border-yellow-200">

          <p className="text-yellow-700 mb-2">

            Pending Campaigns

          </p>

          <h2 className="text-4xl font-bold text-yellow-700">

            {stats.pendingCampaigns}

          </h2>

        </div>

        {/* Total Raised */}

        <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-200">

          <p className="text-emerald-700 mb-2">

            Total Raised

          </p>

          <h2 className="text-4xl font-bold text-emerald-700">

            ₹{stats.totalRaised}

          </h2>

        </div>

      </div>

      {/* Recent Campaigns */}

      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8">

        <div className="flex items-center justify-between mb-8">

          <div>

            <h2 className="text-3xl font-bold text-slate-800">

              Recent Campaigns

            </h2>

            <p className="text-slate-500 mt-2">

              Your latest fundraising campaigns

            </p>

          </div>

        </div>

        {/* Campaign List */}

        <div className="space-y-6">

          {
            campaigns.slice(0, 3).map((campaign) => (

              <div

                key={campaign.id}

                className="flex items-center gap-6 border border-gray-200 rounded-2xl p-5 hover:shadow-md transition duration-300"

              >

                {/* Image */}

                <img
                  src={`http://127.0.0.1:8000${campaign.image}`}
                  alt={campaign.title}
                  className="w-28 h-28 rounded-2xl object-cover"
                />

                {/* Content */}

                <div className="flex-1">

                  <h3 className="text-2xl font-bold text-slate-800 mb-2">

                    {campaign.title}

                  </h3>

                  <p className="text-slate-500 line-clamp-2 mb-3">

                    {campaign.description}

                  </p>

                  <div className="flex items-center gap-4">

                    <span className="text-emerald-600 font-bold text-lg">

                      ₹{campaign.goal_amount}

                    </span>

                    <span
                      className={`px-4 py-1 rounded-full text-sm font-semibold

                        ${
                          campaign.status === "approved"
                          ? "bg-green-100 text-green-700"

                          : campaign.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"

                          : "bg-red-100 text-red-700"
                        }

                      `}
                    >

                      {campaign.status}

                    </span>

                  </div>

                </div>

              </div>

            ))
          }

          {
            campaigns.length === 0 && (

              <div className="text-center py-10">

                <h3 className="text-2xl font-bold text-slate-700 mb-3">

                  No Campaigns Yet

                </h3>

                <p className="text-slate-500">

                  Create your first campaign to start fundraising.

                </p>

              </div>

            )
          }

        </div>

      </div>

    </DashboardLayout>
  );
}

export default PatientDashboard;