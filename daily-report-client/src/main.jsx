import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Dashboard.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom';
import router from './router/index.jsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);