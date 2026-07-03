import { useEffect, useState } from "react";

import API from "../services/api";

import DashboardLayout from "../Components/DashboardLayout";

function MyDonations() {

  const [donations, setDonations] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchDonations();

  }, []);

  // Fetch Donations

  const fetchDonations = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.get(

        "/my-donations/",

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      );

      setDonations(res.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  // Total Amount

  const totalAmount = donations.reduce(

    (total, donation) =>

      total + Number(donation.amount),

    0

  );

  return (

    <DashboardLayout>

      {/* Header */}

      <div className="mb-10">

        <h1 className="text-5xl font-bold text-slate-800">

          My Donations

        </h1>

        <p className="text-slate-500 mt-3 text-lg">

          Track all your contributions and support

        </p>

      </div>

      {/* Summary Cards */}

      <div className="grid md:grid-cols-3 gap-6 mb-10">

        {/* Total Amount */}

        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-3xl p-8 text-white shadow-lg">

          <p className="text-lg opacity-90">

            Total Contributions

          </p>

          <h2 className="text-5xl font-bold mt-3">

            ₹{totalAmount}

          </h2>

          <p className="mt-4 opacity-80">

            Thank you for supporting patients ❤️

          </p>

        </div>

        {/* Total Donations */}

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">

          <p className="text-slate-500 text-lg">

            Total Donations

          </p>

          <h2 className="text-5xl font-bold text-slate-800 mt-3">

            {donations.length}

          </h2>

          <p className="mt-4 text-slate-400">

            Donations made so far

          </p>

        </div>

        {/* Last Donation */}

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">

          <p className="text-slate-500 text-lg">

            Latest Donation

          </p>

          <h2 className="text-3xl font-bold text-emerald-600 mt-3">

            {
              donations.length > 0
                ? `₹${donations[0].amount}`
                : "₹0"
            }

          </h2>

          <p className="mt-4 text-slate-400">

            Most recent contribution

          </p>

        </div>

      </div>

      {/* Loading */}

      {
        loading && (

          <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 shadow-sm">

            <h2 className="text-2xl font-semibold text-slate-500">

              Loading Donations...

            </h2>

          </div>

        )
      }

      {/* Donation History */}

      {
        !loading && (

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

            {/* Header */}

            <div className="p-6 border-b border-slate-200 flex justify-between items-center">

              <div>

                <h2 className="text-2xl font-bold text-slate-800">

                  Donation History

                </h2>

                <p className="text-slate-500 mt-1">

                  All your contribution records

                </p>

              </div>

              <div className="bg-emerald-100 text-emerald-700 px-5 py-2 rounded-full font-semibold">

                {donations.length} Records

              </div>

            </div>

            {/* Table */}

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-slate-50">

                  <tr>

                    <th className="text-left px-6 py-5 text-slate-600 font-semibold">

                      Donor

                    </th>

                    <th className="text-left px-6 py-5 text-slate-600 font-semibold">

                      Campaign

                    </th>

                    <th className="text-left px-6 py-5 text-slate-600 font-semibold">

                      Amount

                    </th>

                    <th className="text-left px-6 py-5 text-slate-600 font-semibold">

                      Date

                    </th>

                  </tr>

                </thead>

                <tbody>

                  {
                    donations.length === 0 ? (

                      <tr>

                        <td
                          colSpan="4"
                          className="text-center py-20"
                        >

                          <div>

                            <h2 className="text-3xl font-bold text-slate-700 mb-3">

                              No Donations Yet

                            </h2>

                            <p className="text-slate-500">

                              Start supporting campaigns today ❤️

                            </p>

                          </div>

                        </td>

                      </tr>

                    ) : (

                      donations.map((donation) => (

                        <tr
                          key={donation.id}
                          className="border-t border-slate-100 hover:bg-slate-50 transition duration-300"
                        >

                          {/* Donor */}

                          <td className="px-6 py-5">

                            <div className="flex items-center gap-3">

                              <div className="w-11 h-11 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">

                                {
                                  donation.donor_name
                                    ?.charAt(0)
                                    .toUpperCase()
                                }

                              </div>

                              <div>

                                <h3 className="font-semibold text-slate-800">

                                  {donation.donor_name}

                                </h3>

                              </div>

                            </div>

                          </td>

                          {/* Campaign */}

                          <td className="px-6 py-5">

                            <h3 className="font-semibold text-slate-800 text-lg">

                              {donation.campaign_title}

                            </h3>

                          </td>

                          {/* Amount */}

                          <td className="px-6 py-5">

                            <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full font-bold">

                              ₹{donation.amount}

                            </span>

                          </td>

                          {/* Date */}

                          <td className="px-6 py-5 text-slate-500 font-medium">

                            {
                              new Date(
                                donation.donated_at
                              ).toLocaleDateString()
                            }

                          </td>

                        </tr>

                      ))
                    )
                  }

                </tbody>

              </table>

            </div>

          </div>

        )
      }

    </DashboardLayout>

  );
}

export default MyDonations;