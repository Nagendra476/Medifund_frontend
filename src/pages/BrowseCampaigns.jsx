import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import DashboardLayout from "../Components/DashboardLayout";

function BrowseCampaigns() {

  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCampaigns();
  }, []);

  // Fetch Approved Campaigns
  const fetchCampaigns = async () => {
    try {
      const res = await API.get("/campaigns/approved-campaigns/");
      setCampaigns(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Search Filter
  const filteredCampaigns = campaigns.filter((campaign) => {
    const keyword = search.toLowerCase();

    return (
      campaign.title?.toLowerCase().includes(keyword) ||
      campaign.description?.toLowerCase().includes(keyword)
    );
  });

  return (
    <DashboardLayout>


      {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-8">

          <div>
            <h1 className="text-5xl font-bold text-slate-800">
              Browse Campaigns
            </h1>

            <p className="text-slate-500 mt-2 text-lg">
              Support patients and save lives through donations.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white border border-slate-200 px-6 py-4 rounded-2xl shadow-sm">

            <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-2xl">
              ❤️
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-800">
                {filteredCampaigns.length}
              </h3>

              <p className="text-sm text-slate-500">
                Active Campaigns
              </p>
            </div>

          </div>

        </div>

        {/* Search */}
        <div className="mb-8">

          <div className="relative w-full md:w-[450px]">

            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>

            <input
              type="text"
              placeholder="Search campaigns..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-11 pr-12 shadow-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
            />

            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
              >
                ✕
              </button>
            )}

          </div>

        </div>

          

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center h-60">
          <div className="text-xl font-semibold text-slate-500">
            Loading Campaigns...
          </div>
        </div>
      )}

      {/* No Search Result */}
      {!loading &&
        filteredCampaigns.length === 0 &&
        campaigns.length > 0 && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-16 text-center mb-8">

            <div className="text-6xl mb-4">🔍</div>

            <h2 className="text-3xl font-bold text-slate-800 mb-3">
              No Campaign Found
            </h2>

            <p className="text-slate-500">
              Try searching with another keyword.
            </p>

          </div>
        )}

      {/* Campaign Cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

        {filteredCampaigns.map((campaign) => {

          const percentage = Math.min(
            (campaign.raised_amount / campaign.goal_amount) * 100,
            100
          );

          return (
            <div
              key={campaign.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition duration-300 group"
            >

              <div className="overflow-hidden">
                <img
                  src={`http://127.0.0.1:8000${campaign.image}`}
                  alt={campaign.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-7">

                <h2 className="text-2xl font-bold text-slate-800 mb-3 line-clamp-1">
                  {campaign.title}
                </h2>

                <p className="text-slate-500 leading-7 mb-6 line-clamp-3">
                  {campaign.description}
                </p>

                <div className="mb-5">

                  <div className="flex justify-between mb-2">
                    <p className="text-sm font-medium text-slate-500">
                      Fund Progress
                    </p>

                    <p className="text-sm font-bold text-emerald-600">
                      {percentage.toFixed(0)}%
                    </p>
                  </div>

                  <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                    <div
                      style={{ width: `${percentage}%` }}
                      className="bg-emerald-500 h-3 rounded-full transition-all duration-500"
                    ></div>
                  </div>

                </div>

                <div className="grid grid-cols-2 gap-5 mb-7">

                  <div className="bg-emerald-50 rounded-2xl p-4">
                    <p className="text-sm text-slate-500 mb-1">
                      Raised
                    </p>

                    <h3 className="text-2xl font-bold text-emerald-600">
                      ₹{campaign.raised_amount}
                    </h3>
                  </div>

                  <div className="bg-slate-100 rounded-2xl p-4">
                    <p className="text-sm text-slate-500 mb-1">
                      Goal
                    </p>

                    <h3 className="text-2xl font-bold text-slate-800">
                      ₹{campaign.goal_amount}
                    </h3>
                  </div>

                </div>

                <Link to={`/campaign/${campaign.id}`}>
                  <button className="w-full bg-slate-900 hover:bg-black text-white py-4 rounded-2xl font-semibold transition duration-300">
                    View Details
                  </button>
                </Link>

              </div>

            </div>
          );
        })}

      </div>

    </DashboardLayout>
  );
}

export default BrowseCampaigns;