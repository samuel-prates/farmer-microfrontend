import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { FarmersPage } from './pages/FarmersPage';

function App() {
  return (
    <Provider store={store}>
      <FarmersPage />
    </Provider>
  );
}

export default App;