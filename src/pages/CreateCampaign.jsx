import { useState } from "react";
import API from "../services/api";
import DashboardLayout from "../Components/DashboardLayout";

function CreateCampaign() {

  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goal_amount: "",
    image: null,
    medical_report: null,
  });

  const handleChange = (e) => {

    const { name, value, files } = e.target;

    if (files) {

      setFormData({
        ...formData,
        [name]: files[0],
      });

      // Image Preview
      if (name === "image") {

        setPreview(
          URL.createObjectURL(files[0])
        );

      }

    } else {

      setFormData({
        ...formData,
        [name]: value,
      });

    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      // Get Token
      const token = localStorage.getItem("token");

      // Check Token
      if (!token) {

        alert("Please login first");

        setLoading(false);

        return;

      }

      // FormData
      const data = new FormData();

      data.append("title", formData.title);

      data.append(
        "description",
        formData.description
      );

      data.append(
        "goal_amount",
        formData.goal_amount
      );

      data.append(
        "image",
        formData.image
      );

      data.append(
        "medical_report",
        formData.medical_report
      );

      // API Request
      const res = await API.post(

        "/campaigns/create/",
        data,

        {
          headers: {

            Authorization: `Bearer ${token}`,

            "Content-Type":
              "multipart/form-data",

          },
        }

      );

      // Success
      alert(res.data.message);

      // Reset Form
      setFormData({
        title: "",
        description: "",
        goal_amount: "",
        image: null,
        medical_report: null,
      });

      setPreview(null);

    } catch (error) {

      console.log("ERROR :", error);

      console.log(
        "STATUS :",
        error.response?.status
      );

      console.log(
        "DATA :",
        error.response?.data
      );

      if (error.response?.status === 401) {

        alert("Unauthorized - Please Login Again");

      } else {

        alert("Failed to create campaign");

      }

    } finally {

      setLoading(false);

    }
  };

  return (

    <DashboardLayout>

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10">

          <h1 className="text-4xl font-bold text-slate-800">

            Create Campaign

          </h1>

          <p className="text-slate-500 mt-2">

            Start a medical fundraising campaign
            for treatment and support.

          </p>

        </div>

        {/* Form */}
        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-10">

          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >

            {/* Campaign Title */}
            <div>

              <label className="block text-slate-700 font-semibold mb-3">

                Campaign Title

              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter campaign title"
                className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />

            </div>

            {/* Description */}
            <div>

              <label className="block text-slate-700 font-semibold mb-3">

                Description

              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="6"
                placeholder="Describe patient condition, treatment details and fundraising purpose"
                className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-emerald-500"
                required
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
                placeholder="Enter fundraising goal"
                className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />

            </div>

            {/* Campaign Image */}
            <div>

              <label className="block text-slate-700 font-semibold mb-3">

                Campaign Image

              </label>

              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-3 bg-slate-50"
                required
              />

              {
                preview && (

                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-5 w-64 rounded-2xl shadow"
                  />

                )
              }

            </div>

            {/* Medical Report */}
            <div>

              <label className="block text-slate-700 font-semibold mb-3">

                Upload Medical Report

              </label>

              <input
                type="file"
                name="medical_report"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-3 bg-slate-50"
                required
              />

            </div>

            {/* Submit Button */}
            <div>

              <button
                type="submit"
                disabled={loading}
                className="bg-emerald-600 hover:bg-emerald-700 transition duration-300 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-md"
              >

                {
                  loading
                    ? "Creating Campaign..."
                    : "Create Campaign"
                }

              </button>

            </div>

          </form>

        </div>

      </div>      

    </DashboardLayout>
  );
}

export default CreateCampaign;