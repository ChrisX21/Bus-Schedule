import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import NotFound from './NotFound';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Navbar from '../Components/Navbar';

function Pages() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await fetch('http://localhost:3030/users/me', {
                    headers: {
                        'X-Authorization': localStorage.getItem('token')
                    }
                });
                if (response.ok) {
                    setIsLoggedIn(true);
                }
            }
            catch (error) {
                console.error('Error checking login status: ', error);
            }
        };

        checkLoginStatus();
    }, []);

    return (
        <>
            <BrowserRouter>
                <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
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
    );
}

export default Pages;
