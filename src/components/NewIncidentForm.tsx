import React, { useState } from 'react';
import { Incident } from './IncidentDashboard';

interface Props {
  onAddIncident: (incident: Incident) => void;
}

const NewIncidentForm: React.FC<Props> = ({ onAddIncident }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<'Low' | 'Medium' | 'High'>('Low');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Please fill all fields!');
      return;
    }
    const newIncident: Incident = {
      id: Date.now(),
      title,
      description,
      severity,
      reported_at: new Date().toISOString(),
    };
    onAddIncident(newIncident);
    setTitle('');
    setDescription('');
    setSeverity('Low');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border rounded-lg p-6 shadow-lg bg-gray-50"
    >
      <h2 className="text-2xl font-bold mb-4">Report New Incident</h2>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Title</label>
        <input
          className="w-full p-2 border rounded"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Description</label>
        <textarea
          className="w-full p-2 border rounded"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Severity</label>
        <select
          className="w-full p-2 border rounded"
          value={severity}
          onChange={e => setSeverity(e.target.value as 'Low' | 'Medium' | 'High')}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default NewIncidentForm;
