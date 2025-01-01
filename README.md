# LifePacer

LifePacer is a lightweight, offline-first application that helps you track the difference between "Actual Time" and "Felt Time". By logging how long you feel a task took versus reality, you can uncover patterns in your time perception and flow states.

## Features

- **Timer & Tracking**: Start a timer for your tasks.
- **Felt Time Input**: Log your subjective experience of time after each task.
- **Visualization**: See graphs comparing Actual vs Felt time.
- **Distortion Metrics**: Track how much your time perception skews.
- **Offline & Private**: All data is stored in your browser's localStorage. Nothing leaves your device.
- **Export**: Download your data as a JSON file for backup or analysis.

## Tech Stack

- Framework: React (Vite)
- Styling: Tailwind CSS
- Icons: Lucide React
- Charts: Recharts
- Utilities: date-fns, uuid

## Getting Started

1.  Install Dependencies:
    npm install

2.  Run Development Server:
    npm run dev

3.  Build for Production:
    npm run build

## Usage

1.  Click the Start button to begin a task.
2.  Work on your task...
3.  Click Stop when finished.
4.  Enter what you did and how long it felt like (e.g., "45m").
5.  View your history and insights on the dashboard.

## License

MIT
