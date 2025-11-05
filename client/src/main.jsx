import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import {store } from './app/store'
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
    <footer className="text-xs text-gray-500 text-center py-3">
      Made by Shivansh Nigam, NIT Bhopal
    </footer>
  </BrowserRouter>
);
