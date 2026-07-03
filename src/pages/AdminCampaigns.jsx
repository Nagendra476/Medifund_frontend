import { useEffect, useState } from "react";

import API from "../services/api";

import DashboardLayout from "../Components/DashboardLayout";

function AdminCampaigns() {

  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {

    fetchCampaigns();

  }, []);

  // Fetch Campaigns

  const fetchCampaigns = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.get(

        "/campaigns/admin-campaigns/",

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      );

      setCampaigns(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  // Approve

  const approveCampaign = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await API.patch(

        `/campaigns/approve-campaign/${id}/`,

        {},

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      );

      alert("Campaign Approved");

      fetchCampaigns();

    } catch (error) {

      console.log(error);

    }

  };

  // Reject

  const rejectCampaign = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await API.patch(

          `/campaigns/reject-campaign/${id}/`,

        {},

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      );

      alert("Campaign Rejected");

      fetchCampaigns();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <DashboardLayout>

      <div className="mb-10">

        <h1 className="text-5xl font-bold text-slate-800">

          Verify Campaigns

        </h1>

        <p className="text-slate-500 mt-3">

          Approve or reject patient campaigns

        </p>

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

        {
          campaigns.map((campaign) => (

            <div
              key={campaign.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm"
            >

              {/* Image */}

              <img
                src={`http://127.0.0.1:8000${campaign.image}`}
                alt={campaign.title}
                className="w-full h-60 object-cover"
              />

              {/* Content */}

              <div className="p-6">

                <h2 className="text-2xl font-bold text-slate-800 mb-3">

                  {campaign.title}

                </h2>

                <p className="text-slate-500 line-clamp-3 mb-5">

                  {campaign.description}

                </p>

                <div className="mb-5">

                  <p className="text-sm text-slate-500">

                    Goal Amount

                  </p>

                  <h3 className="text-3xl font-bold text-emerald-600">

                    ₹{campaign.goal_amount}

                  </h3>

                </div>

                {/* Status */}

                <div className="mb-5">

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold

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

                {/* Buttons */}

                <div className="flex gap-3">

                  <button

                    onClick={() =>
                      approveCampaign(campaign.id)
                    }

                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl font-semibold"
                  >

                    Approve

                  </button>

                  <button

                    onClick={() =>
                      rejectCampaign(campaign.id)
                    }

                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl font-semibold"
                  >

                    Reject

                  </button>

                </div>

              </div>

            </div>

          ))
        }

      </div>

    </DashboardLayout>

  );
}

export default AdminCampaigns;