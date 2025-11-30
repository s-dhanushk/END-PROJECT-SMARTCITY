import React, { useMemo, useState } from "react";
import { Package, PhoneCall, MapPin } from "lucide-react";

// ---------------- SAMPLE RESOURCE DATA ----------------
const RESOURCES_DATA = [
  { id: 1, type: "Education", item: "School Books Set A", units: 450, status: "Available", last_updated: "2025-10-15" },
  { id: 2, type: "Healthcare", item: "First Aid Kits", units: 120, status: "Low Stock", last_updated: "2025-10-20" },
  { id: 3, type: "Infrastructure", item: "Cement Bags", units: 900, status: "Available", last_updated: "2025-11-01" },
  { id: 4, type: "Technology", item: "Solar Power Units", units: 25, status: "Maintenance", last_updated: "2025-09-25" },
  { id: 5, type: "Education", item: "Teacher Training Kits", units: 75, status: "Available", last_updated: "2025-10-05" },
  { id: 6, type: "Healthcare", item: "Vaccination Vials", units: 350, status: "Critical", last_updated: "2025-11-02" },
];

// ---------------- VILLAGE ADMIN DATA (5 VILLAGES) ----------------
const VILLAGE_ADMINS = [
  {
    village: "Vishwapuram",
    sarpanch: { name: "Mr. Raghav Reddy", phone: "+91 98765 32100" },
    secretary: { name: "Ms. Kavitha Sharma", phone: "+91 98450 98765" },
    fieldOfficer: { name: "Mr. Sunil Kumar", phone: "+91 99887 44221" },
    grievanceOfficer: { name: "Mrs. Meena Patil", phone: "+91 90909 11223" },
  },
  {
    village: "Shantipur",
    sarpanch: { name: "Mr. Harish Verma", phone: "+91 91234 55678" },
    secretary: { name: "Mrs. Indira Joshi", phone: "+91 98700 11234" },
    fieldOfficer: { name: "Mr. Manoj Deshpande", phone: "+91 99445 66778" },
    grievanceOfficer: { name: "Ms. Priya Nair", phone: "+91 90011 22990" },
  },
  {
    village: "Kishanganj",
    sarpanch: { name: "Mr. Sameer Qureshi", phone: "+91 90123 88776" },
    secretary: { name: "Mr. Arvind Rao", phone: "+91 98300 44210" },
    fieldOfficer: { name: "Mr. Bilal Shaikh", phone: "+91 99880 22334" },
    grievanceOfficer: { name: "Mrs. Sonia Pathak", phone: "+91 99221 55664" },
  },
  {
    village: "Ramnagar",
    sarpanch: { name: "Mrs. Savitha Shetty", phone: "+91 97777 88990" },
    secretary: { name: "Mr. Nikhil Pawar", phone: "+91 98110 34567" },
    fieldOfficer: { name: "Mr. Ramesh Babu", phone: "+91 88776 55221" },
    grievanceOfficer: { name: "Ms. Deepa Kulkarni", phone: "+91 96666 74432" },
  },
  {
    village: "Vijaypur",
    sarpanch: { name: "Mr. Mahesh Gowda", phone: "+91 96644 11009" },
    secretary: { name: "Mrs. Anjali Desai", phone: "+91 98155 44322" },
    fieldOfficer: { name: "Mr. Aravind Iyer", phone: "+91 99800 77411" },
    grievanceOfficer: { name: "Ms. Shalini Verma", phone: "+91 90900 77331" },
  },
];

// ---------------- SMALL REUSABLE COMPONENTS ----------------

const Badge = ({ status }) => {
  let color = "bg-gray-200 text-gray-800";

  if (status === "Available") color = "bg-green-100 text-green-700";
  if (status === "Low Stock") color = "bg-yellow-100 text-yellow-700";
  if (status === "Maintenance") color = "bg-blue-100 text-blue-700";
  if (status === "Critical") color = "bg-red-100 text-red-700";

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}>
      {status}
    </span>
  );
};

const PageHeader = ({ title, icon: Icon }) => (
  <div className="flex items-center mb-8">
    <div className="p-3 bg-indigo-600 text-white rounded-lg shadow-md mr-4">
      <Icon size={26} />
    </div>
    <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
  </div>
);

const Table = ({ data, columns }) => (
  <div className="bg-white shadow-lg rounded-xl overflow-hidden">
    <table className="w-full text-left">
      <thead className="bg-gray-50">
        <tr>
          {columns.map((col, idx) => (
            <th
              key={idx}
              className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide"
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx} className="border-t hover:bg-gray-50 transition">
            {columns.map((col, cIdx) => (
              <td key={cIdx} className="px-6 py-4 text-sm text-gray-700">
                {col.render ? col.render(row[col.key], row) : row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Single admin row inside a village card
const AdminRow = ({ role, person }) => (
  <div className="flex items-start justify-between bg-gray-50 rounded-lg px-3 py-2">
    <div>
      <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
        {role}
      </p>
      <p className="text-sm font-medium text-gray-800">{person.name}</p>
      <p className="text-xs text-gray-500">{person.phone}</p>
    </div>
    <div className="mt-1 text-gray-400">
      <PhoneCall size={16} />
    </div>
  </div>
);

// ---------------- MAIN PAGE COMPONENT ----------------

const Resources = () => {
  const [selectedType, setSelectedType] = useState("All");

  const categories = ["All", "Education", "Healthcare", "Infrastructure", "Technology"];

  const filteredData = useMemo(() => {
    if (selectedType === "All") return RESOURCES_DATA;
    return RESOURCES_DATA.filter((r) => r.type === selectedType);
  }, [selectedType]);

  const resourceStats = categories.slice(1).map((cat) => ({
    type: cat,
    count: RESOURCES_DATA.filter((r) => r.type === cat).length,
  }));

  const columns = [
    { header: "ID", key: "id" },
    { header: "Category", key: "type" },
    { header: "Resource Name", key: "item" },
    { header: "Units Available", key: "units" },
    { header: "Status", key: "status", render: (val) => <Badge status={val} /> },
    { header: "Last Updated", key: "last_updated" },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Page Title */}
      <PageHeader title="Resource Management" icon={Package} />

      {/* VILLAGE ADMIN DIRECTORY */}
      <section className="mb-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              Village Administration Directory
            </h3>
            <p className="text-sm text-gray-500">
              Key contacts for each village: Sarpanch, Secretary, Field & Grievance Officers.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {VILLAGE_ADMINS.map((village) => (
            <div
              key={village.village}
              className="bg-white p-5 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition"
            >
              {/* Village Header */}
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-lg bg-indigo-100 text-indigo-700 mr-3">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[11px] text-gray-500 uppercase tracking-wide">
                    Village
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    {village.village}
                  </p>
                </div>
              </div>

              {/* Officials list */}
              <div className="space-y-3 text-sm">
                <AdminRow role="Sarpanch" person={village.sarpanch} />
                <AdminRow role="Secretary" person={village.secretary} />
                <AdminRow role="Field Officer" person={village.fieldOfficer} />
                <AdminRow
                  role="Grievance Officer"
                  person={village.grievanceOfficer}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RESOURCE STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {resourceStats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white p-5 shadow-md rounded-xl border-l-4 border-indigo-500 hover:shadow-lg transition"
          >
            <p className="text-gray-600 font-medium">{stat.type}</p>
            <p className="text-3xl font-bold text-indigo-600 mt-1">{stat.count}</p>
          </div>
        ))}
      </div>

      {/* FILTER + TABLE */}
      <div className="bg-white p-6 shadow-lg rounded-xl border">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-3 md:mb-0">
            Resource Inventory
          </h3>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="p-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <Table data={filteredData} columns={columns} />
      </div>
    </div>
  );
};

export default Resources;
