import React, { useState } from 'react';
import { Calendar, Settings, Edit2, Trash2 } from 'lucide-react';

const JournalPage = () => {
  const [entries, setEntries] = useState([
    { id: 1, date: '2025-01-11', content: 'Today was a productive day...', lastEdited: new Date() },
    { id: 2, date: '2025-01-10', content: 'Reflecting on my goals...', lastEdited: new Date() }
  ]);
  const [newEntry, setNewEntry] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(null);

  const handleSave = () => {
    if (editingId) {
      setEntries(entries.map(entry =>
        entry.id === editingId
          ? { ...entry, content: newEntry, lastEdited: new Date() }
          : entry
      ));
      setEditingId(null);
    } else {
      setEntries([
        {
          id: Date.now(),
          date: selectedDate,
          content: newEntry,
          lastEdited: new Date()
        },
        ...entries
      ]);
    }
    setNewEntry('');
  };

  const handleEdit = (entry) => {
    setEditingId(entry.id);
    setNewEntry(entry.content);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    setEntries(entries.filter(entry => entry.id !== id));
    setShowDeleteDialog(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">My Journal</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white rounded-lg shadow-sm p-2">
            <Calendar className="h-5 w-5 text-gray-500 mr-2" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border-none focus:outline-none text-gray-600"
            />
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Settings className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </header>

      {/* New Entry Section */}
      <div className="bg-white rounded-lg shadow-sm mb-8 p-4">
        <textarea
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          placeholder="Write your thoughts here..."
          className="w-full h-32 p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
        />
        <div className="flex justify-end mt-4 gap-2">
          {editingId && (
            <button
              onClick={() => {
                setEditingId(null);
                setNewEntry('');
              }}
              className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={!newEntry.trim()}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {editingId ? 'Update' : 'Save'} Entry
          </button>
        </div>
      </div>

      {/* Entries List */}
      <div className="space-y-4">
        {entries.map(entry => (
          <div 
            key={entry.id} 
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="text-sm text-gray-500">
                  {new Date(entry.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(entry)}
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <Edit2 className="h-4 w-4 text-gray-500" />
                  </button>
                  <button
                    onClick={() => setShowDeleteDialog(entry.id)}
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">{entry.content}</p>
              <div className="text-xs text-gray-400 mt-2">
                Last edited: {new Date(entry.lastEdited).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-2">Delete Entry</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete this journal entry? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteDialog(null)}
                className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteDialog)}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JournalPage;