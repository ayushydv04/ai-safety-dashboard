import React, { useState, FormEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

type Incident = {
  id: string;
  title: string;
  description: string;
  severity: "Low" | "Medium" | "High";
  reported_at: string;
  isExpanded: boolean;
};

const App: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>([
    {
      id: uuidv4(),
      title: "Biased Recommendation Algorithm",
      description:
        "Algorithm consistently favored certain demographics, leading to biased recommendations.",
      severity: "Medium",
      reported_at: "2025-03-15T10:00:00Z",
      isExpanded: false,
    },
    {
      id: uuidv4(),
      title: "LLM Hallucination in Critical Info",
      description:
        "LLM provided incorrect safety procedure information, endangering users.",
      severity: "High",
      reported_at: "2025-04-01T14:30:00Z",
      isExpanded: false,
    },
    {
      id: uuidv4(),
      title: "Minor Data Leak via Chatbot",
      description:
        "Chatbot inadvertently exposed non-sensitive user metadata during conversations.",
      severity: "Low",
      reported_at: "2025-03-20T09:15:00Z",
      isExpanded: false,
    },
  ]);

  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Newest First");
  const [newIncident, setNewIncident] = useState({
    title: "",
    description: "",
    severity: "Low",
  });
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDetails = (id: string) => {
    setIncidents(
      incidents.map((incident) =>
        incident.id === id
          ? { ...incident, isExpanded: !incident.isExpanded }
          : incident
      )
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newIncident.title && newIncident.description) {
      setIncidents([
        ...incidents,
        {
          id: uuidv4(),
          title: newIncident.title,
          description: newIncident.description,
          severity: newIncident.severity,
          reported_at: new Date().toISOString(),
          isExpanded: false,
        },
      ]);
      setNewIncident({ title: "", description: "", severity: "Low" });
    }
  };

  const filteredIncidents = incidents.filter(
    (incident) =>
      filter === "All" ||
      incident.severity.toLowerCase() === filter.toLowerCase()
  );

  const sortedIncidents = filteredIncidents.sort((a, b) => {
    if (sort === "Newest First") {
      return new Date(b.reported_at).getTime() - new Date(a.reported_at).getTime();
    }
    return new Date(a.reported_at).getTime() - new Date(b.reported_at).getTime();
  });

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"} transition-all duration-500`}
    >
      <div className="max-w-6xl mx-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">AI Safety Incident Dashboard</h1>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-md bg-gray-500 text-white hover:bg-gray-600"
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <div className="flex gap-4 mb-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="All">All Severities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Newest First">Newest First</option>
            <option value="Oldest First">Oldest First</option>
          </select>
        </div>

        <div className="space-y-4">
          {sortedIncidents.map((incident) => (
            <div
              key={incident.id}
              className="p-4 border rounded-lg shadow-lg bg-white hover:bg-gray-50 transition-all duration-300"
            >
              <div className="flex justify-between">
                <h2 className="font-semibold text-xl">{incident.title}</h2>
                <span
                  className={`px-3 py-1 text-white rounded-md ${
                    incident.severity === "High"
                      ? "bg-red-500"
                      : incident.severity === "Medium"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                >
                  {incident.severity}
                </span>
              </div>
              <p className="text-sm text-gray-500">
                Reported on: {new Date(incident.reported_at).toLocaleString()}
              </p>
              <button
                onClick={() => toggleDetails(incident.id)}
                className="text-blue-500 mt-2 inline-block"
              >
                {incident.isExpanded ? "Hide Details" : "View Details"}
              </button>
              {incident.isExpanded && (
                <p className="mt-2 text-gray-700">{incident.description}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Report New Incident</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={newIncident.title}
              onChange={(e) =>
                setNewIncident({ ...newIncident, title: e.target.value })
              }
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Incident Title"
              required
            />
            <textarea
              value={newIncident.description}
              onChange={(e) =>
                setNewIncident({ ...newIncident, description: e.target.value })
              }
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Incident Description"
              required
            />
            <select
              value={newIncident.severity}
              onChange={(e) =>
                setNewIncident({ ...newIncident, severity: e.target.value })
              }
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300"
            >
              Submit Incident
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
