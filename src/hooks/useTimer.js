import { useState, useRef, useEffect } from 'react';

export const useTimer = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0); // in milliseconds
    const startTimeRef = useRef(null);
    const intervalRef = useRef(null);

    const start = () => {
        if (!isRunning) {
            startTimeRef.current = Date.now() - elapsedTime;
            setIsRunning(true);

            intervalRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 100); // multiple updates per second for smooth display, but 100ms is fine
        }
    };

    const stop = () => {
        if (isRunning) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
        }
    };

    const reset = () => {
        clearInterval(intervalRef.current);
        setIsRunning(false);
        setElapsedTime(0);
        startTimeRef.current = null;
    };

    useEffect(() => {
        return () => clearInterval(intervalRef.current);
    }, []);

    return { isRunning, elapsedTime, start, stop, reset };
};
