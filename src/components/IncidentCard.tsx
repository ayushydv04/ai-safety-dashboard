import React, { useState } from 'react';
import { Incident } from './IncidentDashboard';

interface Props {
  incident: Incident;
}

const IncidentCard: React.FC<Props> = ({ incident }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition-all">
      <h2 className="text-xl font-semibold">{incident.title}</h2>
      <p className="text-sm text-gray-600">Severity: {incident.severity}</p>
      <p className="text-sm text-gray-500">Reported: {new Date(incident.reported_at).toLocaleDateString()}</p>

      <button
        className="mt-4 text-blue-500 hover:underline"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? 'Hide Details' : 'View Details'}
      </button>

      {expanded && (
        <p className="mt-2 text-gray-700">{incident.description}</p>
      )}
    </div>
  );
};

export default IncidentCard;
