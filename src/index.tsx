import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GameStoreProvider } from './store/GameContext';
import GameStore from './store/GameStore';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const store = new GameStore();
root.render(
  <React.StrictMode>
    <GameStoreProvider store={store}>
      <App />
    </GameStoreProvider>
  </React.StrictMode>
);
