import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import EntryForm from './EntryForm';
import HistoryList from './HistoryList';
import { saveEntry, getEntries, deleteEntry } from '../utils/storage';
import ComparisonChart from './ComparisonChart';
import { BarChart3, Download } from 'lucide-react';

const Dashboard = () => {
    const [mode, setMode] = useState('timer'); // 'timer', 'logging'
    const [completedTaskTime, setCompletedTaskTime] = useState(0);
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        loadEntries();
    }, []);

    const loadEntries = () => {
        setEntries(getEntries().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
    };

    const handleTimerStop = (duration) => {
        setCompletedTaskTime(duration);
        setMode('logging');
    };

    const handleSaveEntry = (data) => {
        const entry = {
            ...data,
            actualDuration: completedTaskTime,
        };
        saveEntry(entry);
        loadEntries();
        setMode('timer');
    };

    const handleCancelEntry = () => {
        setMode('timer');
    };

    const handleDeleteEntry = (id) => {
        deleteEntry(id);
        loadEntries();
    };

    const handleExport = () => {
        const dataStr = JSON.stringify(entries, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `lifepacer_export_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="w-full max-w-3xl px-4 pb-20">

            <div className="mb-12 flex flex-col items-center">
                {mode === 'timer' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
                        <Timer onStop={handleTimerStop} />
                    </div>
                )}

                {mode === 'logging' && (
                    <div className="my-8 w-full flex justify-center">
                        <EntryForm
                            actualDuration={completedTaskTime}
                            onSave={handleSaveEntry}
                            onCancel={handleCancelEntry}
                        />
                    </div>
                )}
            </div>

            {entries.length > 0 && (
                <div className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                    <ComparisonChart entries={entries} />
                </div>
            )}

            <div className="mt-16 border-t border-gray-100 pt-10">
                <div className="flex items-center justify-between mb-6 px-1">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <BarChart3 className="text-indigo-600" size={20} />
                        History
                    </h2>
                    <div className="flex items-center gap-4">
                        <div className="text-sm text-gray-500">
                            {entries.length} Entries
                        </div>
                        {entries.length > 0 && (
                            <button
                                onClick={handleExport}
                                className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                            >
                                <Download size={14} /> Export
                            </button>
                        )}
                    </div>
                </div>
                <HistoryList entries={entries} onDelete={handleDeleteEntry} />
            </div>

        </div>
    );
};

export default Dashboard;
