import React from 'react';
import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { store } from './app/store';
import { FarmersPage } from './pages/FarmersPage';
import { DashboardPage } from './pages/DashboardPage';

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<FarmersPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Provider>
  );
}

export default App;
