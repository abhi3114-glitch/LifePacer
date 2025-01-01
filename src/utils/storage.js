import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'lifepacer_entries';

export const saveEntry = (entry) => {
    const entries = getEntries();
    const newEntry = {
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        ...entry,
    };
    const updatedEntries = [newEntry, ...entries];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
    return newEntry;
};

export const getEntries = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
};

export const clearEntries = () => {
    localStorage.removeItem(STORAGE_KEY);
};

export const deleteEntry = (id) => {
    const entries = getEntries();
    const updated = entries.filter(e => e.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};
