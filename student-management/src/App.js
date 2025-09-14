import React from 'react';
import StudentList from './components/StudentList';
import { NotificationProvider } from './contexts/NotificationContext';
import './App.css';

function App() {
  return (
    <NotificationProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <StudentList />
        </div>
      </div>
    </NotificationProvider>
  );
}

export default App;