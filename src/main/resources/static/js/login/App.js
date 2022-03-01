import * as React from 'react';
import {Login} from "./components/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Register} from "./components/Register";

export default function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/login'} element={<Login/>} />
                <Route path={'/register'} element={<Register/>} />
            </Routes>
        </BrowserRouter>
    )
}