import React from "react";
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {combineReducer} from "./utils/CombineReducer.js";

const store = configureStore({
    reducer: combineReducer
});

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)
