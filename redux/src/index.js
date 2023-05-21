import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'
import App from './App'
import myreducer  from './state/index'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
let store=configureStore({
    reducer:myreducer
})
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
<Provider store={store}>

<App/>

</Provider>

);

