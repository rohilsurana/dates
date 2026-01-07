import { DateEntry } from './types';

const STORAGE_KEY = 'date-entries';

export const storage = {
  getEntries(): DateEntry[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  },

  saveEntries(entries: DateEntry[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },

  addEntry(entry: Omit<DateEntry, 'id' | 'createdAt'>): DateEntry {
    const newEntry: DateEntry = {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    const entries = this.getEntries();
    entries.push(newEntry);
    this.saveEntries(entries);
    return newEntry;
  },

  updateEntry(id: string, updates: Partial<Omit<DateEntry, 'id' | 'createdAt'>>): void {
    const entries = this.getEntries();
    const index = entries.findIndex((entry) => entry.id === id);
    if (index !== -1) {
      entries[index] = { ...entries[index], ...updates };
      this.saveEntries(entries);
    }
  },

  deleteEntry(id: string): void {
    const entries = this.getEntries();
    const filtered = entries.filter((entry) => entry.id !== id);
    this.saveEntries(filtered);
  },
};
