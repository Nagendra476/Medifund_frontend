function TopCampaigns({ campaigns }) {

    return (

        <div className="bg-white rounded-3xl shadow-sm p-6">

            <h2 className="text-2xl font-bold mb-6">
                Top Campaigns
            </h2>

            {
                campaigns.map((campaign,index)=>(

                    <div
                        key={campaign.id}
                        className="flex justify-between items-center border-b py-4 last:border-none"
                    >

                        <div>

                            <h3 className="font-semibold">

                                #{index+1} {campaign.title}

                            </h3>

                            <p className="text-sm text-gray-500">

                                Goal ₹{campaign.goal_amount}

                            </p>

                        </div>

                        <span className="font-bold text-emerald-600">

                            ₹{campaign.raised_amount}

                        </span>

                    </div>

                ))
            }

        </div>

    );

}

export default TopCampaigns;