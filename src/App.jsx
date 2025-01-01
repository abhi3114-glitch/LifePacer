import React from 'react';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col items-center p-4 pt-10 font-sans">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2 tracking-tight">
          LifePacer
        </h1>
        <p className="text-gray-500 font-medium tracking-wide text-sm uppercase">Felt Time vs Actual Time</p>
      </header>

      <main className="w-full flex-1 flex flex-col items-center">
        <Dashboard />
      </main>

      <footer className="w-full text-center py-6 text-gray-400 text-sm mt-auto">
        <p>© {new Date().getFullYear()} LifePacer. Offline & Private.</p>
      </footer>
    </div>
  );
}

export default App;
