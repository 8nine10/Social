import React from 'react';
import { createRoot } from 'react-dom/client';
import { createStore, applyMiddleware, compose} from 'redux';
import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk';

import reducers from './reducers';
import "./index.css";
import { gapi } from "gapi-script";

import App from './App';

gapi.load("client:auth2", () => {
  gapi.client.init({
    clientId:
      "492371190706-rkv04hagqogd53nv9t52ebnqv5rp2pev.apps.googleusercontent.com",
    scope: "",
  });
});

const root = createRoot(document.getElementById('root'));
const store = createStore(reducers, compose(applyMiddleware(thunk)))


root.render(
    <React.StrictMode>
        <Provider store = {store}>
            <App />
        </Provider>
    </React.StrictMode>
);