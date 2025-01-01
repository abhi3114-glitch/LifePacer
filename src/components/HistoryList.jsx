import React from 'react';
import { Clock, AlertTriangle, Trash2 } from 'lucide-react';
import { formatDurationVerbose, formatDuration } from '../utils/timeUtils';
import { formatDistanceToNow } from 'date-fns';

const HistoryList = ({ entries, onDelete }) => {
    if (entries.length === 0) {
        return (
            <div className="text-center py-10 text-gray-400 bg-white rounded-2xl border border-gray-100 p-8">
                <Clock className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>No entries yet. Start the timer to track your first task!</p>
            </div>
        );
    }

    return (
        <div className="space-y-4 w-full max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-800 px-1">Recent Activity</h3>
            {entries.map((entry) => {
                const distortion = entry.feltDuration - entry.actualDuration;
                const distortionPercent = Math.round((distortion / entry.actualDuration) * 100);
                const isUnderestimation = distortion < 0;

                // Color coding based on distortion
                let distortionColor = 'text-gray-500';
                if (distortionPercent > 20) distortionColor = 'text-rose-500';
                if (distortionPercent < -20) distortionColor = 'text-blue-500';

                return (
                    <div key={entry.id} className="bg-white p-5 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow group flex items-start justify-between gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-gray-900 text-lg">{entry.task}</span>
                                <span className="text-xs text-gray-400 font-medium px-2 py-0.5 bg-gray-50 rounded-full">
                                    {formatDistanceToNow(new Date(entry.timestamp), { addSuffix: true })}
                                </span>
                            </div>

                            <div className="flex items-center gap-6 mt-3 text-sm">
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Actual</span>
                                    <span className="text-gray-700 font-medium">{formatDurationVerbose(entry.actualDuration)}</span>
                                </div>
                                <div className="w-px h-8 bg-gray-100"></div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Felt</span>
                                    <span className="text-gray-700 font-medium">{formatDurationVerbose(entry.feltDuration)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                            <div className={`flex items-center gap-1 font-bold ${distortionColor}`}>
                                {distortionPercent > 0 ? '+' : ''}{distortionPercent}%
                                {Math.abs(distortionPercent) > 20 && <AlertTriangle size={14} />}
                            </div>
                            <button
                                onClick={() => onDelete(entry.id)}
                                className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                title="Delete entry"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default HistoryList;
