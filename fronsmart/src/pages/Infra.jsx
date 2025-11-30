import React, { useState, useMemo } from "react";
import { Layers } from "lucide-react";

// ---------------- INFRASTRUCTURE DATA ----------------
const INFRASTRUCTURE_DATA = [
  { id: 1, category: "Roads", item: "Main Road A", length_km: 15.5, type: "Asphalt", status: "Good", maintenance_due: "2025-Q4" },
  { id: 2, category: "Buildings", item: "Community School 1", area_sqm: 500, usage: "Education", status: "Active", maintenance_due: "2026-Q1" },
  { id: 3, category: "Water Supply", item: "Central Pumping Station", capacity_m3: 1500, status: "Operational", maintenance_due: "2025-Q3" },
  { id: 4, category: "Electricity Grid", item: "Substation Alpha", capacity_kVA: 1000, status: "Operational", maintenance_due: "2025-Q4" },
  { id: 5, category: "Waste Management", item: "Compost Facility Site B", capacity_tons: 50, status: "Under Maintenance", maintenance_due: "2025-Q2" },
  { id: 6, category: "Roads", item: "Village Link Road 2", length_km: 4.2, type: "Gravel", status: "Fair", maintenance_due: "2026-Q2" },
  { id: 7, category: "Buildings", item: "Health Clinic East", area_sqm: 300, usage: "Health", status: "Active", maintenance_due: "2025-Q3" }
];

// ---------------- REUSABLE COMPONENTS ----------------

const Badge = ({ status }) => {
  let classes = "px-3 py-1 text-xs font-semibold rounded-full";

  switch (status) {
    case "Active":
    case "Operational":
      classes += " bg-green-100 text-green-800";
      break;
    case "Pending":
      classes += " bg-yellow-100 text-yellow-800";
      break;
    case "Under Maintenance":
      classes += " bg-red-100 text-red-800";
      break;
    case "Good":
      classes += " bg-sky-100 text-sky-800";
      break;
    case "Fair":
      classes += " bg-orange-100 text-orange-800";
      break;
    default:
      classes += " bg-gray-100 text-gray-800";
  }

  return <span className={classes}>{status}</span>;
};

const PageHeader = ({ title, icon: Icon }) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4 mb-6 sticky top-0 bg-gray-50 z-10 p-4 -mx-8 -mt-4">
    <div className="flex items-center">
      <div className="p-3 bg-indigo-600 text-white rounded-lg shadow-xl mr-4">
        <Icon size={28} />
      </div>
      <h1 className="text-3xl font-extrabold text-gray-900">{title}</h1>
    </div>
  </div>
);

const Table = ({ data, columns }) => {
  const headerKeys = columns.map((col) => col.key);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col, index) => (
                <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition">
                {headerKeys.map((key, colIdx) => (
                  <td key={colIdx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {columns[colIdx].render ? columns[colIdx].render(row[key], row) : row[key]}
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

// ---------------- MODAL COMPONENT ----------------

const InfraModal = ({ isOpen, onClose, infra }) => {
  if (!isOpen || !infra) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl p-6 border border-gray-200 animate-fadeIn">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{infra.item}</h2>
          <button onClick={onClose} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full">✕</button>
        </div>

        {/* Details */}
        <div className="space-y-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Category</p>
            <p className="font-semibold">{infra.category}</p>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Status</p>
            <Badge status={infra.status} />
          </div>

          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Maintenance Due</p>
            <p className="font-semibold">{infra.maintenance_due}</p>
          </div>

          {infra.length_km && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Length (KM)</p>
              <p className="font-semibold">{infra.length_km} km</p>
            </div>
          )}

          {infra.capacity_m3 && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Capacity (m³)</p>
              <p className="font-semibold">{infra.capacity_m3} m³</p>
            </div>
          )}

          {infra.capacity_kVA && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Capacity (kVA)</p>
              <p className="font-semibold">{infra.capacity_kVA} kVA</p>
            </div>
          )}

          {infra.area_sqm && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Area (sqm)</p>
              <p className="font-semibold">{infra.area_sqm} sqm</p>
            </div>
          )}

          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Description</p>
            <p className="text-gray-700">This infrastructure asset is essential for village operations and is routinely monitored.</p>
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button onClick={onClose} className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Close</button>
        </div>

      </div>
    </div>
  );
};

// ---------------- INFRASTRUCTURE PAGE ----------------

const Infra = () => {
  const categories = ["All", "Roads", "Buildings", "Water Supply", "Electricity Grid", "Waste Management"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedInfra, setSelectedInfra] = useState(null);

  const openModal = (item) => {
    setSelectedInfra(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedInfra(null);
    setModalOpen(false);
  };

  const filteredInfra = useMemo(() => {
    if (selectedCategory === "All") return INFRASTRUCTURE_DATA;
    return INFRASTRUCTURE_DATA.filter((i) => i.category === selectedCategory);
  }, [selectedCategory]);

  const infrastructureColumns = [
    { header: "ID", key: "id" },
    { header: "Category", key: "category" },
    { header: "Item Name", key: "item" },
    { header: "Status", key: "status", render: (status) => <Badge status={status} /> },
    { header: "Maintenance Due", key: "maintenance_due" },
    {
      header: "Details",
      key: "details",
      render: (value, row) => (
        <button
          onClick={() => openModal(row)}
          className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
        >
          View
        </button>
      )
    }
  ];

  const categoryStats = categories.slice(1).map((cat) => ({
    category: cat,
    count: INFRASTRUCTURE_DATA.filter((i) => i.category === cat).length
  }));

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <PageHeader title="Infrastructure Management" icon={Layers} />

      {/* Category Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
        {categoryStats.map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl shadow-lg text-center border-l-4 border-indigo-500 hover:shadow-xl">
            <p className="text-lg font-semibold">{stat.category}</p>
            <p className="text-4xl font-bold text-indigo-600">{stat.count}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Infrastructure Inventory</h2>
          <select
            className="p-2 border rounded-lg"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <Table data={filteredInfra} columns={infrastructureColumns} />
      </div>

      {/* Modal */}
      <InfraModal isOpen={modalOpen} onClose={closeModal} infra={selectedInfra} />
    </div>
  );
};

export default Infra;
