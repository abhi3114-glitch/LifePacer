import React, { useState } from 'react';
import { Save, X } from 'lucide-react';

const EntryForm = ({ actualDuration, onSave, onCancel }) => {
    const [feltTimeStr, setFeltTimeStr] = useState('');
    const [taskName, setTaskName] = useState('');

    const parseDurationInput = (str) => {
        // Basic parsing: "20m", "1h 30m", "90" (assumes minutes)
        // For MVP efficiency, let's assume minutes if number, or regex for h/m
        let totalMs = 0;
        const lower = str.toLowerCase();

        // Check for "h" and "m"
        const hMatch = lower.match(/(\d+)\s*h/);
        const mMatch = lower.match(/(\d+)\s*m/);

        if (hMatch) totalMs += parseInt(hMatch[1]) * 60 * 60 * 1000;
        if (mMatch) totalMs += parseInt(mMatch[1]) * 60 * 1000;

        // If no units and is just number, assume minutes
        if (!hMatch && !mMatch && /^\d+$/.test(str.trim())) {
            totalMs += parseInt(str) * 60 * 1000;
        }

        return totalMs;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const feltDuration = parseDurationInput(feltTimeStr);
        if (feltDuration > 0 && taskName.trim()) {
            onSave({
                task: taskName,
                feltDuration,
                tags: [], // Could add tags later
            });
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 animate-in fade-in zoom-in duration-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Log Task</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">What did you do?</label>
                    <input
                        type="text"
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                        placeholder="e.g. Debugging Login"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        autoFocus
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        How long did it feel? <span className="text-xs text-gray-400">(e.g. "45m", "1h 20m")</span>
                    </label>
                    <input
                        type="text"
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                        placeholder="e.g. 30m"
                        value={feltTimeStr}
                        onChange={(e) => setFeltTimeStr(e.target.value)}
                        required
                    />
                </div>

                <div className="flex gap-3 pt-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 font-medium transition-colors flex items-center justify-center gap-2"
                    >
                        <X size={18} /> Discard
                    </button>
                    <button
                        type="submit"
                        className="flex-1 py-3 px-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-medium shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2"
                    >
                        <Save size={18} /> Save Entry
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EntryForm;
