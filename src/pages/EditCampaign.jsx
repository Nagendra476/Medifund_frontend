import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import API from "../services/api";

import DashboardLayout from "../Components/DashboardLayout";

function EditCampaign() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({

    title: "",
    description: "",
    goal_amount: "",

  });

  useEffect(() => {

    fetchCampaign();

  }, []);

  // Fetch Single Campaign

  const fetchCampaign = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.get(

        `/campaigns/${id}/`,

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      );

      setFormData({

        title: res.data.title,

        description: res.data.description,

        goal_amount: res.data.goal_amount,

      });

    } catch (error) {

      console.log(error);

    }
  };

  // Handle Change

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };

  // Update Campaign

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const token = localStorage.getItem("token");

      await API.put(

        `/campaigns/${id}/`,

        formData,

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      );

      alert("Campaign Updated Successfully");

      navigate("/my-campaigns");

    } catch (error) {

      console.log(error);

      alert("Failed to update campaign");

    } finally {

      setLoading(false);

    }
  };

  return (

    <DashboardLayout>

      <div className="max-w-4xl mx-auto">

        <div className="mb-10">

          <h1 className="text-4xl font-bold text-slate-800">

            Edit Campaign

          </h1>

          <p className="text-slate-500 mt-2">

            Update your campaign details

          </p>

        </div>

        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-10">

          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >

            {/* Title */}

            <div>

              <label className="block text-slate-700 font-semibold mb-3">

                Campaign Title

              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-emerald-500"
              />

            </div>

            {/* Description */}

            <div>

              <label className="block text-slate-700 font-semibold mb-3">

                Description

              </label>

              <textarea
                name="description"
                rows="6"
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-emerald-500"
              />

            </div>

            {/* Goal Amount */}

            <div>

              <label className="block text-slate-700 font-semibold mb-3">

                Goal Amount

              </label>

              <input
                type="number"
                name="goal_amount"
                value={formData.goal_amount}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-emerald-500"
              />

            </div>

            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition duration-300"
            >

              {
                loading
                ? "Updating..."
                : "Update Campaign"
              }

            </button>

          </form>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default EditCampaign;