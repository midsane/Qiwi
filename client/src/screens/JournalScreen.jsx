import React, { useState } from 'react';
import { Calendar, Settings, Edit2, Trash2, Check, X, Save } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const JournalApp = () => {
  const [entries, setEntries] = useState([
    { id: 1, date: '2025-01-11', content: 'Today was a productive day...', lastEdited: new Date() },
    { id: 2, date: '2025-01-10', content: 'Reflecting on my goals...', lastEdited: new Date() }
  ]);
  const [newEntry, setNewEntry] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

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

  const handleDelete = (id) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const handleEdit = (entry) => {
    setEditingId(entry.id);
    setNewEntry(entry.content);
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
              className="border-none focus:ring-0 text-gray-600"
            />
          </div>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5 text-gray-500" />
          </Button>
        </div>
      </header>

      {/* New Entry Section */}
      <Card className="mb-8">
        <CardContent className="p-4">
          <textarea
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            placeholder="Write your thoughts here..."
            className="w-full h-32 p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
          />
          <div className="flex justify-end mt-4 gap-2">
            {editingId && (
              <Button
                variant="outline"
                onClick={() => {
                  setEditingId(null);
                  setNewEntry('');
                }}
              >
                Cancel
              </Button>
            )}
            <Button
              onClick={handleSave}
              disabled={!newEntry.trim()}
              className="bg-blue-500 hover:bg-blue-600"
            >
              {editingId ? 'Update' : 'Save'} Entry
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Entries List */}
      <div className="space-y-4">
        {entries.map(entry => (
          <Card key={entry.id} className="group hover:shadow-md transition-shadow">
            <CardContent className="p-4">
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
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(entry)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Entry</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this journal entry? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(entry.id)}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">{entry.content}</p>
              <div className="text-xs text-gray-400 mt-2">
                Last edited: {new Date(entry.lastEdited).toLocaleTimeString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JournalApp;