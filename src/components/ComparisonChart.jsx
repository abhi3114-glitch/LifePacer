import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { formatDurationVerbose } from '../utils/timeUtils';

const ComparisonChart = ({ entries }) => {
    if (entries.length === 0) return null;

    // Prepare data: take last 7 entries for clarity, or aggregate by day?
    // User asked for "Graphs: actual vs perceived"
    // Let's show last 5 tasks for detailed comparison
    const data = entries.slice(0, 7).reverse().map(e => ({
        name: e.task.length > 10 ? e.task.substring(0, 10) + '...' : e.task,
        fullName: e.task,
        Actual: Math.round(e.actualDuration / 60000), // in minutes
        Felt: Math.round(e.feltDuration / 60000), // in minutes
        distortion: (e.feltDuration - e.actualDuration) / e.actualDuration
    }));

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 border border-gray-100 shadow-xl rounded-xl text-sm">
                    <p className="font-bold text-gray-800 mb-2">{payload[0].payload.fullName}</p>
                    <p className="text-indigo-600 font-medium">Actual: {payload[0].value}m</p>
                    <p className="text-purple-600 font-medium">Felt: {payload[1].value}m</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm w-full h-[350px]">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Time Distortion (Last 7 Tasks)</h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 0,
                        bottom: 5,
                    }}
                    barGap={2}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis
                        dataKey="name"
                        tick={{ fontSize: 12, fill: '#6b7280' }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fontSize: 12, fill: '#6b7280' }}
                        axisLine={false}
                        tickLine={false}
                        label={{ value: 'Minutes', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#9ca3af', fontSize: 10 } }}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb' }} />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    <Bar dataKey="Actual" fill="#4f46e5" radius={[4, 4, 0, 0]} maxBarSize={50} animationDuration={1000} />
                    <Bar dataKey="Felt" fill="#9333ea" radius={[4, 4, 0, 0]} maxBarSize={50} animationDuration={1000} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ComparisonChart;
