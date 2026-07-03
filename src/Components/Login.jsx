import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Auto Redirect if already logged in
  useEffect(() => {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {

      if (role === "admin") {
        navigate("/admin");
      }

      else if (role === "patient") {
        navigate("/patient");
      }

      else if (role === "donor") {
        navigate("/donor");
      }

    }

  }, [navigate]);

  const handleChange = (e) => {

    setData({
      ...data,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const res = await API.post(
        "accounts/login/",
        data
      );

      // Store JWT Token
      localStorage.setItem(
        "token",
        res.data.access
      );

      // Store Role
      localStorage.setItem(
        "role",
        res.data.role
      );

      // Store Username
      localStorage.setItem(
        "username",
        res.data.username
      );

      alert("Login Successful");

      // Role Based Navigation
      if (res.data.role === "admin") {

        navigate("/admin");

      }

      else if (res.data.role === "patient") {

        navigate("/patient");

      }

      else {

        navigate("/donor");

      }

    } catch (error) {

      alert(
        error.response?.data?.error ||
        "Invalid Credentials"
      );

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-emerald-100 via-white to-red-100 p-6">

      <div className="grid md:grid-cols-2 bg-white shadow-2xl rounded-3xl overflow-hidden max-w-6xl w-full">

        {/* Left Side Image Section */}

        <div className="relative hidden md:block">

          <img
            src="https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1200&auto=format&fit=crop"
            alt="Medical Donation"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white p-10 text-center">

            <h1 className="text-5xl font-bold mb-5 leading-tight">
              Donate Hope <br /> Save Lives
            </h1>

            <p className="text-lg leading-8 text-gray-200">
              Join MediFund and help patients receive
              emergency medical support through trusted
              donations and compassionate care.
            </p>

          </div>

        </div>

        {/* Right Side Login Form */}

        <div className="p-10 md:p-14 flex flex-col justify-center bg-white">

          <div className="mb-8 text-center">

            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              MediFund
            </h1>

            <p className="text-gray-500 text-lg">
              Together We Can Heal Lives
            </p>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="mb-5">

              <label className="block text-gray-700 font-semibold mb-2">
                Username
              </label>

              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={data.username}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />

            </div>

            <div className="mb-6">

              <label className="block text-gray-700 font-semibold mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={data.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-emerald-500"
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
                  ? "Logging in..."
                  : "Login"
              }
            </button>

          </form>

          <p className="text-center text-gray-600 mt-6 text-lg">

            Don't have an account?

            <Link
              to="/register"
              className="text-emerald-700 font-bold ml-2 hover:underline"
            >
              Register
            </Link>

          </p>

          <div className="mt-10 border-t pt-6 text-center text-gray-500 text-sm leading-6">
            Every donation creates hope for patients and families.
            Your support can make treatment accessible to someone in need.
          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;
