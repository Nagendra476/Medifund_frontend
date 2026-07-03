import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import API from "../services/api";

import DashboardLayout from "../Components/DashboardLayout";

function CampaignDetails() {

  const { id } = useParams();

  const [campaign, setCampaign] = useState(null);

  const [loading, setLoading] = useState(true);

  const [amount, setAmount] = useState("");

  const [donating, setDonating] = useState(false);

  const [donations, setDonations] = useState([]);

  useEffect(() => {

    fetchCampaign();

    fetchDonations();

  }, []);

  // Fetch Campaign

  const fetchCampaign = async () => {

    try {

      const res = await API.get(
        `/campaigns/campaign-details/${id}/`
      );

      setCampaign(res.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  // Fetch Donations

  const fetchDonations = async () => {

    try {

      const res = await API.get(
        `/campaign-donations/${id}/`
      );

      setDonations(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  // Donate

  const donateNow = async () => {

    if (!amount || amount <= 0) {
        alert("Enter a valid amount");
        return;
    }

    try {

      setDonating(true);

      const token = localStorage.getItem("token");

      await API.post(

        `/donate/${id}/`,

        {
          amount
        },

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      );

      alert("Donation Successful ❤️");

      // Refresh Data

      fetchCampaign();

      fetchDonations();

      setAmount("");

    } catch (error) {

      console.log(error);

      console.log(error.response?.data);

      // Token Expired

      if (error.response?.status === 401) {

        alert("Session Expired. Please Login Again");

        localStorage.clear();

        window.location.href = "/";

        return;

      }

      alert("Donation Failed");

    } finally {

      setDonating(false);

    }
  };

  // Loading

  if (loading) {

    return (

      <DashboardLayout>

        <div className="flex justify-center items-center h-[70vh]">

          <div className="text-2xl font-semibold text-slate-500">

            Loading Campaign...

          </div>

        </div>

      </DashboardLayout>

    );

  }

  // Progress %

  const percentage = Math.min(

    (
      (campaign.raised_amount /
        campaign.goal_amount) * 100
    ).toFixed(0),

    100

  );

  return (

    <DashboardLayout>

      <div className="grid lg:grid-cols-3 gap-10">

        {/* LEFT */}

        <div className="lg:col-span-2">

          {/* Image */}

          <div className="overflow-hidden rounded-3xl shadow-lg">

            <img
              src={`http://127.0.0.1:8000${campaign.image}`}
              alt={campaign.title}
              className="w-full h-[500px] object-cover hover:scale-105 transition duration-700"
            />

          </div>

          {/* Content */}

          <div className="mt-8 bg-white rounded-3xl border border-slate-200 shadow-sm p-10">

            <div className="flex items-center gap-3 mb-5">

              <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold">

                Verified Campaign

              </span>

            </div>

            <h1 className="text-5xl font-bold text-slate-800 leading-tight mb-6">

              {campaign.title}

            </h1>

            <p className="text-slate-600 text-lg leading-9">

              {campaign.description}

            </p>

            {/* Medical Report */}

            <div className="mt-10">

              <a
                href={`http://127.0.0.1:8000${campaign.medical_report}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold transition duration-300"
              >

                📄 Download Medical Report

              </a>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 sticky top-8">

            <h2 className="text-3xl font-bold text-slate-800 mb-8">

              Donation Details

            </h2>

            {/* Progress */}

            <div className="mb-8">

              <div className="flex justify-between mb-3">

                <span className="text-slate-500 font-medium">

                  Fund Progress

                </span>

                <span className="text-emerald-600 font-bold">

                  {percentage}%

                </span>

              </div>

              <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">

                <div
                  style={{
                    width: `${percentage}%`
                  }}
                  className="bg-emerald-500 h-4 rounded-full transition-all duration-500"
                ></div>

              </div>

            </div>

            {/* Stats */}

            <div className="grid grid-cols-2 gap-5 mb-8">

              <div className="bg-emerald-50 rounded-2xl p-5">

                <p className="text-sm text-slate-500 mb-2">

                  Raised

                </p>

                <h3 className="text-3xl font-bold text-emerald-600">

                  ₹{campaign.raised_amount}

                </h3>

              </div>

              <div className="bg-slate-100 rounded-2xl p-5">

                <p className="text-sm text-slate-500 mb-2">

                  Goal

                </p>

                <h3 className="text-3xl font-bold text-slate-800">

                  ₹{campaign.goal_amount}

                </h3>

              </div>

            </div>

            {/* Quick Donate */}

            <div className="mb-6">

              <p className="font-semibold text-slate-700 mb-4">

                Quick Donate

              </p>

              <div className="grid grid-cols-3 gap-3">

                {
                  [100, 500, 1000].map((value) => (

                    <button
                      key={value}
                      onClick={() => setAmount(value)}
                      className="border border-slate-300 hover:bg-emerald-500 hover:text-white py-3 rounded-xl font-semibold transition duration-300"
                    >

                      ₹{value}

                    </button>

                  ))
                }

              </div>

            </div>

            {/* Input */}

            <div className="mb-6">

              <label className="block mb-3 font-semibold text-slate-700">

                Donation Amount

              </label>

              <input
                type="number"
                placeholder="Enter donation amount"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value)
                }
                className="w-full border border-slate-300 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-emerald-500"
              />

            </div>

            {/* Donate Button */}

            <button

              onClick={donateNow}

              disabled={donating}

              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-semibold text-lg transition duration-300 shadow-md"
            >

              {
                donating
                  ? "Processing Donation..."
                  : "Donate Now ❤️"
              }

            </button>

            {/* Recent Donations */}

            <div className="mt-10">

              <h3 className="text-xl font-bold text-slate-800 mb-5">

                Recent Donations

              </h3>

              <div className="space-y-4">

                {
                  donations.length === 0 ? (

                    <p className="text-slate-500">

                      No donations yet

                    </p>

                  ) : (

                    donations.slice(0, 5).map((donation) => (

                      <div
                        key={donation.id}
                        className="flex justify-between items-center bg-slate-50 rounded-2xl p-4"
                      >

                        <div>

                          <h4 className="font-semibold text-slate-800">

                            {donation.donor_name}

                          </h4>

                          <p className="text-sm text-slate-500">

                            Supporter

                          </p>

                        </div>

                        <div className="text-emerald-600 font-bold text-lg">

                          ₹{donation.amount}

                        </div>

                      </div>

                    ))
                  )
                }

              </div>

            </div>

            {/* Footer */}

            <p className="text-center text-sm text-slate-400 mt-6 leading-6">

              Every donation brings hope and treatment
              support to patients in need.

            </p>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default CampaignDetails;