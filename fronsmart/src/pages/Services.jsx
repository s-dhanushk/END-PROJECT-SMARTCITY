import React, { useState } from "react";
import { Settings, X, Shield, Landmark } from "lucide-react";

// ---------------- SERVICES DATA ----------------

const SERVICES_DATA = [
  {
    id: 1,
    name: "Primary Health Checkup",
    category: "Health",
    status: "Active",
    contact: "Dr. Sharma",
    last_update: "2025-10-20",
    details: "Provides free monthly health checkups and basic medicine.",
  },
  {
    id: 2,
    name: "Adult Literacy Program",
    category: "Education",
    status: "Active",
    contact: "Ms. Leela",
    last_update: "2025-10-15",
    details: "Evening classes for adults focusing on functional literacy.",
  },
  {
    id: 3,
    name: "Public Bus Route 1",
    category: "Transport",
    status: "Pending",
    contact: "Transport Office",
    last_update: "2025-09-01",
    details: "Proposed new route connecting Vishwapuram and Kishanganj.",
  },
  {
    id: 4,
    name: "Street Light Repair",
    category: "Public Safety",
    status: "Under Maintenance",
    contact: "Eng. Kumar",
    last_update: "2025-10-25",
    details: "Scheduled repair of faulty streetlights in Ramnagar area.",
  },
  {
    id: 5,
    name: "Online Grievance Filing",
    category: "Citizen Grievance",
    status: "Active",
    contact: "Citizen Desk",
    last_update: "2025-11-01",
    details: "Digital platform for citizens to report local issues and track resolution.",
  },
  {
    id: 6,
    name: "Waste Collection Schedule",
    category: "Waste Management",
    status: "Active",
    contact: "Sanitation Dept",
    last_update: "2025-10-10",
    details: "Daily door-to-door waste collection service schedule.",
  },
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

const Card = ({ title, value, unit, icon: Icon, color }) => (
  <div className="bg-white p-5 rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-2xl border-b-4 border-transparent hover:border-indigo-500 cursor-pointer">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="mt-1 text-3xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500">{unit}</p>
      </div>
      <div className={`p-3 rounded-full ${color} text-white opacity-90 shadow-md`}>
        <Icon size={24} />
      </div>
    </div>
  </div>
);

const PageHeader = ({ title, icon: Icon }) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4 mb-6 sticky top-0 bg-gray-50 z-10 p-4 -mx-8 -mt-4">
    <div className="flex items-center mb-4 sm:mb-0">
      <div className="p-3 bg-indigo-600 text-white rounded-lg shadow-xl mr-4">
        <Icon size={28} />
      </div>
      <h1 className="text-3xl font-extrabold text-gray-900">{title}</h1>
    </div>
  </div>
);

const Table = ({ data, columns }) => {
  if (!data || data.length === 0) {
    return <div className="p-4 text-center text-gray-500">No data available for this table.</div>;
  }

  const headerKeys = columns.map((col) => col.key);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
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
              <tr key={rowIndex} className="hover:bg-gray-50 transition-colors duration-150">
                {headerKeys.map((key, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                  >
                    {columns[colIndex].render ? columns[colIndex].render(row[key], row) : row[key]}
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

// Modal Component
const ServiceDetailsModal = ({ isOpen, onClose, service }) => {
  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all scale-100 opacity-100">
        <div className="p-6 border-b flex justify-between items-center bg-indigo-50">
          <h3 className="text-2xl font-bold text-gray-800">{service.name}</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-500">Category:</p>
              <p className="text-base font-semibold text-indigo-700">{service.category}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg flex flex-col justify-center">
              <p className="text-sm font-medium text-gray-500">Status:</p>
              <Badge status={service.status} />
            </div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-500">Service Details:</p>
            <p className="text-gray-700 leading-relaxed mt-1">{service.details}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 border-t pt-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-500">Contact Person:</p>
              <p className="text-gray-700 font-medium">{service.contact}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-500">Last Updated:</p>
              <p className="text-gray-700 font-medium">{service.last_update}</p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-gray-100 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-150 shadow-md font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// ---------------- SERVICES PAGE ----------------

const Services = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const openModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const serviceColumns = [
    { header: "ID", key: "id" },
    { header: "Service Name", key: "name" },
    { header: "Category", key: "category" },
    { header: "Contact Person", key: "contact" },
    { header: "Status", key: "status", render: (status) => <Badge status={status} /> },
    { header: "Last Updated", key: "last_update" },
    {
      header: "Action",
      key: "action",
      render: (value, row) => (
        <button
          onClick={() => openModal(row)}
          className="text-indigo-600 hover:text-indigo-800 font-medium text-sm transition-colors duration-150"
        >
          View Details
        </button>
      ),
    },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <PageHeader title="City Services & Grievance" icon={Settings} />

      {/* Service Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card
          title="Active Services"
          value={SERVICES_DATA.filter((s) => s.status === "Active").length}
          unit="Types"
          icon={Shield}
          color="bg-green-600"
        />
        <Card
          title="Services Pending Launch"
          value={SERVICES_DATA.filter((s) => s.status === "Pending").length}
          unit="Types"
          icon={Landmark}
          color="bg-yellow-600"
        />
        <Card
          title="Under Maintenance"
          value={SERVICES_DATA.filter((s) => s.status === "Under Maintenance").length}
          unit="Types"
          icon={Settings}
          color="bg-red-600"
        />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Service Inventory</h2>
        <Table data={SERVICES_DATA} columns={serviceColumns} />
      </div>

      <ServiceDetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        service={selectedService}
      />
    </div>
  );
};

export default Services;
