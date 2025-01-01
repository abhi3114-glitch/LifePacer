import { format, intervalToDuration } from 'date-fns';

export const formatDuration = (ms) => {
    const duration = intervalToDuration({ start: 0, end: ms });

    const hours = duration.hours || 0;
    const minutes = duration.minutes || 0;
    const seconds = duration.seconds || 0;

    const h = hours.toString().padStart(2, '0');
    const m = minutes.toString().padStart(2, '0');
    const s = seconds.toString().padStart(2, '0');

    if (hours > 0) return `${h}:${m}:${s}`;
    return `${m}:${s}`;
};

export const formatDurationVerbose = (ms) => {
    const duration = intervalToDuration({ start: 0, end: ms });

    const parts = [];
    if (duration.hours) parts.push(`${duration.hours}h`);
    if (duration.minutes) parts.push(`${duration.minutes}m`);
    if (duration.seconds && parts.length === 0) parts.push(`${duration.seconds}s`);

    return parts.join(' ') || '0s';
};
