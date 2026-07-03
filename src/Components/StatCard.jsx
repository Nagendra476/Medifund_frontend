import React from "react";

function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition">

      <div className="flex justify-between items-center">

        <div>
          <p className="text-slate-500 text-sm mb-2">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-slate-800">
            {value}
          </h2>
        </div>

        <div className={`${color} w-16 h-16 rounded-2xl flex items-center justify-center text-3xl`}>
          {icon}
        </div>

      </div>

    </div>
  );
}

export default StatCard;