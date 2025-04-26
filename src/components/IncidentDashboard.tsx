import React, { useState } from 'react';
import IncidentCard from './IncidentCard';
import NewIncidentForm from './NewIncidentForm';

export interface Incident {
  id: number;
  title: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High';
  reported_at: string;
}

const initialIncidents: Incident[] = [
  {
    id: 1,
    title: 'Biased Recommendation Algorithm',
    description: 'Algorithm consistently favored certain demographics...',
    severity: 'Medium',
    reported_at: '2025-03-15T10:00:00Z',
  },
  {
    id: 2,
    title: 'LLM Hallucination in Critical Info',
    description: 'LLM provided incorrect safety procedure information...',
    severity: 'High',
    reported_at: '2025-04-01T14:30:00Z',
  },
  {
    id: 3,
    title: 'Minor Data Leak via Chatbot',
    description: 'Chatbot inadvertently exposed non-sensitive user metadata...',
    severity: 'Low',
    reported_at: '2025-03-20T09:15:00Z',
  },
];

const IncidentDashboard: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
  const [filter, setFilter] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<'Newest' | 'Oldest'>('Newest');

  const handleAddIncident = (incident: Incident) => {
    setIncidents(prev => [...prev, incident]);
  };

  const filteredIncidents = incidents
    .filter(incident => filter === 'All' || incident.severity === filter)
    .sort((a, b) => {
      if (sortOrder === 'Newest') {
        return new Date(b.reported_at).getTime() - new Date(a.reported_at).getTime();
      } else {
        return new Date(a.reported_at).getTime() - new Date(b.reported_at).getTime();
      }
    });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">AI Safety Incident Dashboard</h1>

      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        {/* Filter */}
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="All">All Severities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        {/* Sort */}
        <select
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value as 'Newest' | 'Oldest')}
          className="border p-2 rounded-md"
        >
          <option value="Newest">Newest First</option>
          <option value="Oldest">Oldest First</option>
        </select>
      </div>

      {/* List of Incidents */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredIncidents.map(incident => (
          <IncidentCard key={incident.id} incident={incident} />
        ))}
      </div>

      {/* New Incident Form */}
      <div className="mt-10">
        <NewIncidentForm onAddIncident={handleAddIncident} />
      </div>
    </div>
  );
};

export default IncidentDashboard;
