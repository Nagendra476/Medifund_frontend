import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Tooltip,
    Cell,
    Legend
} from "recharts";

const COLORS = [
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#3B82F6"
];

function CampaignStatusChart({ data }) {

    return (

        <div className="bg-white rounded-3xl shadow-sm p-6">

            <h2 className="text-xl font-bold mb-5">

                Campaign Status

            </h2>

            <ResponsiveContainer
                width="100%"
                height={300}
            >

                <PieChart>

                    <Pie
                        data={data}
                        dataKey="count"
                        nameKey="status"
                        outerRadius={110}
                        label
                    >

                        {
                            data.map((entry,index)=>(

                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                />

                            ))
                        }

                    </Pie>

                    <Tooltip/>

                    <Legend/>

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}

export default CampaignStatusChart;