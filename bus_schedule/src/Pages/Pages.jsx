import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import NotFound from './NotFound';
import Home from './Home';

function Pages() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Pages
