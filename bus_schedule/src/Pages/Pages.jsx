import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import NotFound from './NotFound';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Navbar from '../Components/Navbar';

function Pages() {
    const isLoggedIn = false;
    return (
        <>
            <BrowserRouter>
                <Navbar isLoggedIn={isLoggedIn} />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='*' element={<NotFound />} />
                    {!isLoggedIn ? (
                        <>
                            <Route path='/login' element={<Login />} />
                            <Route path='/register' element={<Register />} />
                        </>
                    ) : null}
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Pages
