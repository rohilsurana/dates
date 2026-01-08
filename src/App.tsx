import { useState, useEffect, useMemo } from 'react';
import { DateForm } from '@/components/date-form';
import { DateCard } from '@/components/date-card';
import { FilterBar } from '@/components/filter-bar';
import { HelpDialog } from '@/components/help-dialog';
import { ThemeToggle } from '@/components/theme-toggle';
import { storage } from '@/lib/storage';
import type { DateEntry } from '@/lib/types';
import { Clock } from 'lucide-react';

const SORT_PREFERENCE_KEY = 'date-tracker-sort-preference';

function App() {
  const [entries, setEntries] = useState<DateEntry[]>([]);
  const [editingEntry, setEditingEntry] = useState<DateEntry | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'created' | 'name'>('created');

  useEffect(() => {
    setEntries(storage.getEntries());

    const savedSort = localStorage.getItem(SORT_PREFERENCE_KEY);
    if (savedSort && (savedSort === 'date' || savedSort === 'created' || savedSort === 'name')) {
      setSortBy(savedSort);
    }
  }, []);

  const handleSortChange = (sort: 'date' | 'created' | 'name') => {
    setSortBy(sort);
    localStorage.setItem(SORT_PREFERENCE_KEY, sort);
  };

  const filteredAndSortedEntries = useMemo(() => {
    let filtered = entries;

    if (selectedTag) {
      filtered = entries.filter((entry) => entry.tags.includes(selectedTag));
    }

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'created':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return sorted;
  }, [entries, selectedTag, sortBy]);

  const handleAddEntry = (data: { name: string; date: string; tags: string[] }) => {
    storage.addEntry(data);
    setEntries(storage.getEntries());
  };

  const handleEditEntry = (data: { name: string; date: string; tags: string[] }) => {
    if (editingEntry) {
      storage.updateEntry(editingEntry.id, data);
      setEntries(storage.getEntries());
      setEditingEntry(null);
    }
  };

  const handleDeleteEntry = (id: string) => {
    if (confirm('Are you sure you want to delete this date?')) {
      storage.deleteEntry(id);
      setEntries(storage.getEntries());
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <Clock className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Date Tracker</h1>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <HelpDialog />
            </div>
          </div>
          <p className="text-muted-foreground">Track time elapsed since important moments</p>
        </div>

        <div className="mb-8">
          {editingEntry ? (
            <DateForm
              onSubmit={handleEditEntry}
              onCancel={() => setEditingEntry(null)}
              initialData={{
                name: editingEntry.name,
                date: editingEntry.date,
                tags: editingEntry.tags,
              }}
            />
          ) : (
            <DateForm onSubmit={handleAddEntry} />
          )}
        </div>

        {entries.length > 0 && (
          <div className="mb-4">
            <FilterBar
              selectedTag={selectedTag}
              onTagChange={setSelectedTag}
              sortBy={sortBy}
              onSortChange={handleSortChange}
            />
          </div>
        )}

        <div className="space-y-4">
          {entries.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No dates tracked yet. Add one above to get started!</p>
            </div>
          ) : filteredAndSortedEntries.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No dates match the selected filter.</p>
            </div>
          ) : (
            filteredAndSortedEntries.map((entry) => (
              <DateCard
                key={entry.id}
                entry={entry}
                onEdit={setEditingEntry}
                onDelete={handleDeleteEntry}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
