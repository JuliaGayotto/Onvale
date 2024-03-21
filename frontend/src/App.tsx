import React from "react";
import { BrowserRouter as Router } from 'react-router-dom'
import RoutesApp from './routes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
    return (
        <Router>
            <ToastContainer />
            <RoutesApp />
        </Router>
    )
}