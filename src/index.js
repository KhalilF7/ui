import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {Provider} from "react-redux";
import store from "./redux/store";
import {PersistGate} from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import axios from "axios";
import { ContextProvider } from './contexts/ContextProvider';

axios.defaults.proxy = "http://127.0.0.1:8000";

let persistor = persistStore(store);
ReactDOM.render(
  <Provider store={store}>
    <ContextProvider>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </ContextProvider>
  </Provider>,
  document.getElementById("root"),
);
