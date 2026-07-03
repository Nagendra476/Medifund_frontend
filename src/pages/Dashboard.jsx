import { useEffect, useState } from "react";
import API from "../services/api";
import DashboardLayout from "../Components/DashboardLayout";
import StatCard from "../Components/StatCard";
import TopCampaigns from "../Components/TopCampaigns";
import RecentDonations from "../Components/RecentDonations";

function Dashboard() {

    const [stats, setStats] = useState({});
    const [topCampaigns, setTopCampaigns] = useState([]);
    const [recentDonations, setRecentDonations] = useState([]);

    useEffect(() => {
        fetchDashboard();
        fetchTopCampaigns();
        fetchRecentDonations();
    }, []);

    // Dashboard Statistics
    const fetchDashboard = async () => {
        try {
            const res = await API.get("/dashboard/statistics/");
            setStats(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Top Campaigns
    const fetchTopCampaigns = async () => {
        try {
            const res = await API.get("/dashboard/top-campaigns/");
            setTopCampaigns(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Recent Donations
    const fetchRecentDonations = async () => {
        try {
            const res = await API.get("/dashboard/recent-donations/");
            setRecentDonations(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (

        <DashboardLayout>

            <h1 className="text-4xl font-bold mb-8">
                Dashboard
            </h1>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                <StatCard
                    title="Campaigns"
                    value={stats.total_campaigns || 0}
                    icon="❤️"
                    color="bg-red-100"
                />

                <StatCard
                    title="Donations"
                    value={stats.total_donations || 0}
                    icon="💰"
                    color="bg-green-100"
                />

                <StatCard
                    title="Funds Raised"
                    value={`₹${stats.total_amount || 0}`}
                    icon="🏦"
                    color="bg-yellow-100"
                />

                <StatCard
                    title="Donors"
                    value={stats.total_donors || 0}
                    icon="👥"
                    color="bg-blue-100"
                />

                <StatCard
                    title="Approved"
                    value={stats.approved_campaigns || 0}
                    icon="✅"
                    color="bg-emerald-100"
                />

                <StatCard
                    title="Completed"
                    value={stats.completed_campaigns || 0}
                    icon="🎯"
                    color="bg-purple-100"
                />

            </div>

            {/* Top Campaigns & Recent Donations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

                <TopCampaigns campaigns={topCampaigns} />

                <RecentDonations donations={recentDonations} />

            </div>

        </DashboardLayout>

    );
}

export default Dashboard;