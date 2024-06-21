import React, { useState, useEffect } from 'react';
import Pages from './Pages/Pages';
import Navbar from './Components/Navbar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      <Pages />
    </div>
  );
}

export default App;
