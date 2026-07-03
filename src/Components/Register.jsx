import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    role: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const res = await API.post(
        "accounts/register/",
        formData
      );

      console.log(res.data);

      alert("Registration Successful");

      navigate("/");

    } catch (error) {

      console.log(error.response?.data);

      alert(
        JSON.stringify(error.response?.data) ||
        "Registration Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-100 via-white to-emerald-100 p-6">

      <div className="grid md:grid-cols-2 bg-white shadow-2xl rounded-3xl overflow-hidden max-w-6xl w-full">

        {/* Left Side Image */}

        <div className="relative hidden md:block">

          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop"
            alt="Medical Help"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white text-center p-10">

            <h1 className="text-5xl font-bold mb-5 leading-tight">
              Become a <br /> Life Saver
            </h1>

            <p className="text-lg leading-8 text-gray-200">
              Register with MediFund and support
              patients in need through medical donations,
              emergency care, and community compassion.
            </p>

          </div>

        </div>

        {/* Register Form */}

        <div className="p-10 md:p-14 flex flex-col justify-center bg-white">

          <div className="text-center mb-8">

            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Create Account
            </h1>

            <p className="text-gray-500 text-lg">
              Join the MediFund Community
            </p>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="mb-4">

              <label className="block text-gray-700 font-semibold mb-2">
                Username
              </label>

              <input
                type="text"
                name="username"
                placeholder="Enter username"
                className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-emerald-500"
                onChange={handleChange}
                required
              />

            </div>

            <div className="mb-4">

              <label className="block text-gray-700 font-semibold mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter email"
                className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-emerald-500"
                onChange={handleChange}
                required
              />

            </div>

            <div className="mb-4">

              <label className="block text-gray-700 font-semibold mb-2">
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                placeholder="Enter phone number"
                className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-emerald-500"
                onChange={handleChange}
                required
              />

            </div>

            <div className="mb-4">

              <label className="block text-gray-700 font-semibold mb-2">
                Select Role
              </label>

              <select
                name="role"
                className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-emerald-500"
                onChange={handleChange}
                required
              >

                <option value="">
                  Choose Role
                </option>

                <option value="admin">
                  Admin
                </option>

                <option value="patient">
                  Patient
                </option>

                <option value="donor">
                  Donor
                </option>

              </select>

            </div>

            <div className="mb-6">

              <label className="block text-gray-700 font-semibold mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter password"
                className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-emerald-500"
                onChange={handleChange}
                required
              />

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold p-4 rounded-xl transition duration-300 shadow-md"
            >
              {
                loading
                  ? "Creating Account..."
                  : "Register"
              }
            </button>

          </form>

          <p className="text-center text-gray-600 mt-6 text-lg">

            Already have an account?

            <Link
              to="/"
              className="text-emerald-700 font-bold ml-2 hover:underline"
            >
              Login
            </Link>

          </p>

          <div className="mt-10 border-t pt-6 text-center text-gray-500 text-sm leading-6">
            Together we can support patients and families
            during medical emergencies with hope and care.
          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;