function RecentDonations({ donations }) {

    return (

        <div className="bg-white rounded-3xl shadow-sm p-6">

            <h2 className="text-2xl font-bold mb-6">
                Recent Donations
            </h2>

            {
                donations.map((donation,index)=>(

                    <div
                        key={index}
                        className="flex justify-between border-b py-4 last:border-none"
                    >

                        <div>

                            <h3 className="font-semibold">

                                {donation.donor}

                            </h3>

                            <p className="text-sm text-gray-500">

                                {donation.campaign}

                            </p>

                        </div>

                        <div className="text-right">

                            <p className="font-bold text-emerald-600">

                                ₹{donation.amount}

                            </p>

                            <p className="text-sm text-gray-500">

                                {donation.date}

                            </p>

                        </div>

                    </div>

                ))
            }

        </div>

    );

}

export default RecentDonations;