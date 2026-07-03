import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import API from "../services/api";

import DashboardLayout from "../Components/DashboardLayout";

function MyCampaigns() {

  const [campaigns, setCampaigns] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchCampaigns();

  }, []);

  // Fetch Campaigns

  const fetchCampaigns = async () => {

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

      setCampaigns(res.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  // Delete Campaign

  const deleteCampaign = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this campaign?"
    );

    if (!confirmDelete) return;

    try {

      const token = localStorage.getItem("token");

      await API.delete(

        `/campaigns/${id}/`,

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      );

      alert("Campaign Deleted Successfully");

      fetchCampaigns();

    } catch (error) {

      console.log(error);

      alert("Failed to delete campaign");

    }
  };

  return (

    <DashboardLayout>

      {/* Header */}

      <div className="flex items-center justify-between mb-10">

        <div>

          <h1 className="text-5xl font-bold text-slate-800">

            My Campaigns

          </h1>

          <p className="text-slate-500 mt-3 text-lg">

            Manage your medical fundraising campaigns

          </p>

        </div>

        <Link
          to="/create-campaign"
        >

          <button
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-7 py-4 rounded-2xl font-semibold shadow-md transition duration-300"
          >

            + Create Campaign

          </button>

        </Link>

      </div>

      {/* Loading */}

      {
        loading && (

          <div className="text-center text-xl text-slate-500 py-20">

            Loading campaigns...

          </div>

        )
      }

      {/* Empty State */}

      {
        !loading && campaigns.length === 0 && (

          <div className="bg-white rounded-3xl border border-gray-200 p-20 text-center shadow-sm">

            <h2 className="text-4xl font-bold text-slate-700 mb-5">

              No Campaigns Found

            </h2>

            <p className="text-slate-500 mb-10 text-lg">

              Start your first medical fundraising campaign.

            </p>

            <Link
              to="/create-campaign"
            >

              <button
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-2xl font-semibold transition duration-300"
              >

                Create Campaign

              </button>

            </Link>

          </div>

        )
      }

      {/* Campaign Cards */}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">

        {
          campaigns.map((campaign) => (

            <div
              key={campaign.id}
              className="bg-white rounded-[30px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >

              {/* Image */}

              <div className="relative">

                <img
                  src={`http://127.0.0.1:8000${campaign.image}`}
                  alt={campaign.title}
                  className="w-full h-72 object-cover"
                />

                {/* Status Badge */}

                <span
                  className={`absolute top-5 right-5 px-5 py-2 rounded-full text-sm font-bold shadow-md

                  ${
                    campaign.status === "approved"
                    ? "bg-green-500 text-white"

                    : campaign.status === "pending"
                    ? "bg-yellow-400 text-black"

                    : "bg-red-500 text-white"
                  }

                  `}
                >

                  {campaign.status}

                </span>

              </div>

              {/* Content */}

              <div className="p-7">

                {/* Title */}

                <h2 className="text-3xl font-bold text-slate-800 mb-3">

                  {campaign.title}

                </h2>

                {/* Description */}

                <p className="text-slate-500 leading-7 text-sm mb-7 line-clamp-3">

                  {campaign.description}

                </p>

                {/* Goal & Raised */}

                <div className="grid grid-cols-2 gap-4 mb-7">

                  <div className="bg-slate-50 rounded-2xl p-5">

                    <p className="text-sm text-slate-500 mb-2">

                      Goal Amount

                    </p>

                    <h3 className="text-2xl font-bold text-emerald-600">

                      ₹{campaign.goal_amount}

                    </h3>

                  </div>

                  <div className="bg-slate-50 rounded-2xl p-5">

                    <p className="text-sm text-slate-500 mb-2">

                      Raised

                    </p>

                    <h3 className="text-2xl font-bold text-blue-600">

                      ₹{campaign.raised_amount}

                    </h3>

                  </div>

                </div>

                {/* Progress Bar */}

                <div className="mb-8">

                  <div className="flex justify-between mb-2 text-sm">

                    <span className="text-slate-500">

                      Fund Progress

                    </span>

                    <span className="font-bold text-emerald-600">

                      {
                        Math.min(

                          (
                            (campaign.raised_amount /
                              campaign.goal_amount) * 100
                          ).toFixed(0),

                          100
                        )
                      }%

                    </span>

                  </div>

                  <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">

                    <div
                      className="bg-emerald-500 h-3 rounded-full"
                      style={{
                        width: `${Math.min(

                          (
                            (campaign.raised_amount /
                              campaign.goal_amount) * 100
                          ).toFixed(0),

                          100

                        )}%`
                      }}
                    ></div>

                  </div>

                </div>

                {/* Buttons */}

                <div className="flex gap-4">

                  <Link
                    to={`/edit-campaign/${campaign.id}`}
                    className="flex-1"
                  >

                    <button
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-2xl font-semibold transition duration-300"
                    >

                      Edit

                    </button>

                  </Link>

                  <button

                    onClick={() =>
                      deleteCampaign(campaign.id)
                    }

                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl font-semibold transition duration-300"
                  >

                    Delete

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

export default MyCampaigns;