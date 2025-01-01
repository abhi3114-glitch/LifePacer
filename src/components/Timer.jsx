import React, { useEffect } from 'react';
import { Play, Square, RotateCcw } from 'lucide-react';
import { useTimer } from '../hooks/useTimer';
import { formatDuration } from '../utils/timeUtils';
import clsx from 'clsx';

const Timer = ({ onStop }) => {
    const { isRunning, elapsedTime, start, stop, reset } = useTimer();

    // Update document title with timer
    useEffect(() => {
        if (isRunning) {
            document.title = `${formatDuration(elapsedTime)} - LifePacer`;
        } else {
            document.title = 'LifePacer';
        }
    }, [isRunning, elapsedTime]);

    const handleStop = () => {
        stop();
        onStop(elapsedTime);
        reset(); // Or keep it displayed? Usually for this flow, we stop and logging happens.
        // But if user cancels log, we might want to resume? 
        // For MVP, handleStop calls parent which switches view to EntryForm.
        // The parent should manage state visibility.
    };

    return (
        <div className="flex flex-col items-center justify-center py-10 w-full max-w-md mx-auto">
            {/* Timer Circle/Display */}
            <div className={clsx(
                "relative w-72 h-72 rounded-full flex items-center justify-center mb-10 transition-all duration-500",
                isRunning ? "shadow-[0_0_60px_-15px_rgba(79,70,229,0.3)] bg-white border-4 border-indigo-100" : "bg-white border-4 border-gray-100 shadow-sm"
            )}>
                {/* Pulse effect ring */}
                {isRunning && (
                    <div className="absolute inset-0 rounded-full border-4 border-indigo-500 opacity-20 animate-ping"></div>
                )}

                <div className="text-center z-10">
                    <span className={clsx(
                        "block text-6xl font-mono font-bold tracking-tighter tabular-nums transition-colors",
                        isRunning ? "text-indigo-600" : "text-gray-700"
                    )}>
                        {formatDuration(elapsedTime)}
                    </span>
                    <span className="text-sm text-gray-400 mt-2 block font-medium uppercase tracking-widest">
                        {isRunning ? 'Run Time' : 'Ready'}
                    </span>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-6">
                {!isRunning ? (
                    <button
                        onClick={start}
                        className="group relative flex items-center justify-center w-20 h-20 bg-indigo-600 rounded-full text-white shadow-xl shadow-indigo-200 hover:scale-105 hover:bg-indigo-700 transition-all duration-300 active:scale-95"
                    >
                        <Play className="ml-1 w-8 h-8 fill-current" />
                        <span className="sr-only">Start</span>
                    </button>
                ) : (
                    <button
                        onClick={handleStop}
                        className="group flex items-center justify-center w-20 h-20 bg-rose-500 rounded-full text-white shadow-xl shadow-rose-200 hover:scale-105 hover:bg-rose-600 transition-all duration-300 active:scale-95"
                    >
                        <Square className="w-8 h-8 fill-current" />
                        <span className="sr-only">Stop</span>
                    </button>
                )}
            </div>

            {elapsedTime > 0 && !isRunning && (
                <button onClick={reset} className="mt-8 text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-2 text-sm">
                    <RotateCcw size={14} /> Reset Timer
                </button>
            )}
        </div>
    );
};

export default Timer;
