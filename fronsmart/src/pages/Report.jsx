import React, { useState } from "react";
import { FileText, Download } from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// ---------------- REPORTS DATA ----------------

const REPORTS_DATA = {
  villageProgress: [
    { village: "Vishwapuram", year: 2023, score: 75 },
    { village: "Vishwapuram", year: 2024, score: 82 },
    { village: "Shantipur", year: 2023, score: 60 },
    { village: "Shantipur", year: 2024, score: 70 },
    { village: "Kishanganj", year: 2023, score: 90 },
    { village: "Kishanganj", year: 2024, score: 91 },
  ],
  resourceBreakdown: [
    { name: "Water Projects", value: 3500000 },
    { name: "Electricity Upgrades", value: 2500000 },
    { name: "Education Sector", value: 1500000 },
    { name: "Health Facilities", value: 2000000 },
  ],
  infraDevelopment: [
    { quarter: "Q1 2024", new_roads_km: 5.5, new_buildings: 2 },
    { quarter: "Q2 2024", new_roads_km: 3.0, new_buildings: 1 },
    { quarter: "Q3 2024", new_roads_km: 7.1, new_buildings: 3 },
    { quarter: "Q4 2024", new_roads_km: 6.0, new_buildings: 2 },
  ],
};

// ---------------- REUSABLE COMPONENTS ----------------

const PageHeader = ({ title, actions, icon: Icon }) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4 mb-6 sticky top-0 bg-gray-50 z-10 p-4 -mx-8 -mt-4">
    <div className="flex items-center mb-4 sm:mb-0">
      <div className="p-3 bg-indigo-600 text-white rounded-lg shadow-xl mr-4">
        <Icon size={28} />
      </div>
      <h1 className="text-3xl font-extrabold text-gray-900">{title}</h1>
    </div>
    <div className="flex space-x-3">{actions}</div>
  </div>
);

const Table = ({ data, columns, title }) => {
  if (!data || data.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No data available for this table.
      </div>
    );
  }

  const headerKeys = columns.map((col) => col.key);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {title && (
        <h2 className="p-4 text-xl font-semibold text-gray-800 border-b">
          {title}
        </h2>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                {headerKeys.map((key, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                  >
                    {columns[colIndex].render
                      ? columns[colIndex].render(row[key], row)
                      : row[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ChartComponent = ({ data, type, title, dataKeys }) => {
  const COLORS = [
    "#4F46E5",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#3B82F6",
    "#EC4899",
  ];

  let ChartType;
  let chartProps = {
    data,
    margin: { top: 20, right: 30, left: 20, bottom: 5 },
  };

  if (type === "line") {
    ChartType = LineChart;
  } else if (type === "bar") {
    ChartType = BarChart;
  } else if (type === "pie") {
    ChartType = PieChart;
    chartProps = { width: 300, height: 300, data }; // Pie wants explicit width/height
  } else {
    return <div className="p-4 text-red-500">Invalid chart type.</div>;
  }

  const ChartContent = () => {
    if (type === "line" || type === "bar") {
      return (
        <>
          <XAxis dataKey={dataKeys[0]} stroke="#6B7280" />
          <YAxis stroke="#6B7280" />
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          />
          <Legend wrapperStyle={{ paddingTop: "10px" }} />
          {dataKeys.slice(1).map((key, index) => {
            const color = COLORS[index % COLORS.length];
            if (type === "line") {
              return (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={color}
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              );
            } else {
              return (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={color}
                  radius={[4, 4, 0, 0]}
                />
              );
            }
          })}
        </>
      );
    } else if (type === "pie") {
      return (
        <Pie
          dataKey="value"
          nameKey="name"
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label={({ name, percent }) =>
            `${name} (${(percent * 100).toFixed(0)}%)`
          }
          innerRadius={60}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
      );
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg h-96">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
      <ResponsiveContainer width="100%" height="85%">
        <ChartType {...chartProps}>{ChartContent()}</ChartType>
      </ResponsiveContainer>
    </div>
  );
};

// ---------------- REPORTS PAGE ----------------

const Report = () => {
  const [downloadMessage, setDownloadMessage] = useState("");

  const progressColumns = [
    { header: "Village", key: "village" },
    { header: "Year", key: "year" },
    {
      header: "Progress Score",
      key: "score",
      render: (score) => (
        <span
          className={`font-bold ${
            score > 85
              ? "text-green-600"
              : score > 70
              ? "text-yellow-600"
              : "text-red-600"
          }`}
        >
          {score} / 100
        </span>
      ),
    },
  ];

  const handleDownload = () => {
    setDownloadMessage(
      "Report download simulated! A PDF would be generated now."
    );
    setTimeout(() => setDownloadMessage(""), 3000);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <PageHeader
        title="City Performance Reports"
        icon={FileText}
        actions={
          <button
            onClick={handleDownload}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-150 shadow-md font-medium"
          >
            <Download size={20} className="mr-2" /> Download All Reports (PDF)
          </button>
        }
      />

      {/* Download Notification */}
      {downloadMessage && (
        <div
          className="bg-indigo-100 border-l-4 border-indigo-500 text-indigo-700 p-4 mb-6 rounded-lg shadow-md transition-opacity duration-300"
          role="status"
        >
          <p className="font-semibold">{downloadMessage}</p>
        </div>
      )}

      <div className="space-y-6">
        {/* Row 1 Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartComponent
            data={REPORTS_DATA.villageProgress.filter(
              (p) => p.village === "Vishwapuram" || p.village === "Shantipur"
            )}
            type="line"
            title="Village Progress Score Over Time"
            dataKeys={["year", "score"]}
          />
          <ChartComponent
            data={REPORTS_DATA.resourceBreakdown}
            type="pie"
            title="Annual Resource Allocation Breakdown"
            dataKeys={["name", "value"]}
          />
        </div>

        {/* Row 2: Bar chart + Table */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <ChartComponent
              data={REPORTS_DATA.infraDevelopment}
              type="bar"
              title="Quarterly Infrastructure Development (Km / Units)"
              dataKeys={["quarter", "new_roads_km", "new_buildings"]}
            />
          </div>
          <div className="xl:col-span-1">
            <Table
              title="Village Progress Summary"
              data={REPORTS_DATA.villageProgress}
              columns={progressColumns}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
