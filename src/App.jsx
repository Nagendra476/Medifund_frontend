import { BrowserRouter, Routes, Route } from "react-router-dom";
import CampaignDetails from "./pages/CampaignDetails";
import Login from "./Components/Login";
import Register from "./Components/Register";
import BrowseCampaigns from "./pages/BrowseCampaigns";
import AdminDashboard from "./pages/AdminDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import DonorDashboard from "./pages/DonorDashboard";
import AdminCampaigns from "./pages/AdminCampaigns";
import ProtectedRoute from "./Components/ProtectedRoute";
import EditCampaign from "./pages/EditCampaign";
import CreateCampaign from "./pages/CreateCampaign";
import MyCampaigns from "./pages/MyCampaigns";
import MyDonations from "./pages/MyDonations";
function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient"
          element={
            <ProtectedRoute>
              <PatientDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/donor"
          element={
            <ProtectedRoute>
              <DonorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-campaign"
          element={
            <ProtectedRoute>
              <CreateCampaign />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-campaigns"
          element={
            <ProtectedRoute>
              <MyCampaigns />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-campaign/:id"
          element={
            <ProtectedRoute>
              <EditCampaign />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-campaigns"
          element={
            <ProtectedRoute>
              <AdminCampaigns />
            </ProtectedRoute>
          }
        />
        <Route
          path="/campaigns"
          element={
            <ProtectedRoute>
              <BrowseCampaigns />
            </ProtectedRoute>
          }
        />
        <Route
          path="/campaign/:id"
          element={
            <ProtectedRoute>
              <CampaignDetails />
            </ProtectedRoute>
          }
        />
        <Route path="/my-donations" element={
              <ProtectedRoute>
                <MyDonations />
              </ProtectedRoute>
            }
          />
      </Routes>

    </BrowserRouter>

  );
}

export default App;