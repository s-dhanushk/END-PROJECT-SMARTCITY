import React, { useState, useMemo } from "react";
import { Home as HomeIcon, User, BookOpen, Zap, Heart, Search, Map } from "lucide-react";


import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// SAMPLE DATA (your original numbers)
const DASHBOARD_DATA = {
  metrics: [
    { title: "Total Population", value: "12,500", unit: "Residents", icon: User, color: "bg-blue-500" },
 { title: "Households", value: "2,450", unit: "Units", icon: HomeIcon, color: "bg-green-500" },

    { title: "Literacy Rate", value: "85.2%", unit: "Population", icon: BookOpen, color: "bg-indigo-500" },
    { title: "Water Coverage", value: "95%", unit: "Households", icon: Zap, color: "bg-sky-500" },
    { title: "Electricity Coverage", value: "100%", unit: "Coverage", icon: Zap, color: "bg-yellow-500" },
    { title: "Health Centers", value: "3", unit: "Facilities", icon: Heart, color: "bg-red-500" },
  ],

  villagePerformance: [
    { id: 1, name: "Vishwapuram", population: 3100, literacy: 88, waterCoverage: 98, electricityCoverage: 100 },
    { id: 2, name: "Shantipur", population: 2500, literacy: 78, waterCoverage: 85, electricityCoverage: 95 },
    { id: 3, name: "Kishanganj", population: 4200, literacy: 92, waterCoverage: 100, electricityCoverage: 100 },
    { id: 4, name: "Ramnagar", population: 1800, literacy: 80, waterCoverage: 90, electricityCoverage: 98 },
  ],

  resourceAllocation: [
    { month: "Jan", Water: 40, Electricity: 30, Sanitation: 20 },
    { month: "Feb", Water: 45, Electricity: 35, Sanitation: 25 },
    { month: "Mar", Water: 50, Electricity: 40, Sanitation: 30 },
    { month: "Apr", Water: 48, Electricity: 38, Sanitation: 28 },
    { month: "May", Water: 55, Electricity: 45, Sanitation: 35 },
  ],
};

// METRIC CARD COMPONENT
const Card = ({ title, value, unit, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition cursor-pointer">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="mt-1 text-3xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500">{unit}</p>
      </div>
      <div className={`p-3 rounded-full ${color} text-white shadow-md`}>
        <Icon size={24} />
      </div>
    </div>
  </div>
);

// TABLE COMPONENT
const Table = ({ data, columns }) => (
  <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
    <table className="w-full text-left">
      <thead className="bg-gray-100">
        <tr>
          {columns.map((col, idx) => (
            <th key={idx} className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="border-t hover:bg-gray-50">
            {columns.map((col, c) => (
              <td key={c} className="px-6 py-4 text-sm text-gray-700">
                {row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// CHART COMPONENT
const ChartBox = ({ title, children }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 h-96">
    <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
    {children}
  </div>
);

// MAIN LIGHT MODE HOME PAGE
const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVillages = useMemo(() => {
    return DASHBOARD_DATA.villagePerformance.filter((v) =>
      v.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const villageColumns = [
    { header: "Village Name", key: "name" },
    { header: "Population", key: "population" },
    { header: "Literacy (%)", key: "literacy" },
    { header: "Water Cov (%)", key: "waterCoverage" },
    { header: "Electricity Cov (%)", key: "electricityCoverage" },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex items-center mb-8">
        <div className="p-3 bg-indigo-600 text-white rounded-lg shadow-md mr-4">
         <HomeIcon size={26} />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">
          Village Intelligence Dashboard
        </h1>
      </div>

      {/* METRICS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-10">
        {DASHBOARD_DATA.metrics.map((m, i) => (
          <Card key={i} {...m} />
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <ChartBox title="Monthly Resource Allocation">
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={DASHBOARD_DATA.resourceAllocation}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Bar dataKey="Water" fill="#3b82f6" />
              <Bar dataKey="Electricity" fill="#10b981" />
              <Bar dataKey="Sanitation" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>

        <ChartBox title="Utilities Trend">
          <ResponsiveContainer width="100%" height="85%">
            <LineChart data={DASHBOARD_DATA.resourceAllocation}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Electricity" stroke="#6366f1" strokeWidth={2} />
              <Line type="monotone" dataKey="Water" stroke="#0ea5e9" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartBox>
      </div>

      {/* TABLE & MAP GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* TABLE */}
        <div className="xl:col-span-2">
          <div className="flex items-center mb-4 bg-white p-3 rounded-lg shadow border border-gray-200">
            <Search size={20} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search village..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full outline-none"
            />
          </div>

          <Table data={filteredVillages} columns={villageColumns} />
        </div>

        {/* STATIC MAP GRID */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Village Locations</h3>
          <div className="grid grid-cols-2 gap-4">
            {DASHBOARD_DATA.villagePerformance.map((v) => (
              <div
                key={v.id}
                className={`p-4 rounded-lg text-center text-white shadow-md transition ${
                  filteredVillages.some((fv) => fv.id === v.id)
                    ? "bg-indigo-600"
                    : "bg-gray-400"
                }`}
              >
                <Map size={16} className="mx-auto mb-1" />
                {v.name}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
