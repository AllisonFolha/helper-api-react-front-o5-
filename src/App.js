import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RickMortyHome from './components/RickMortyHome';
import CharacterDetails from './components/CharacterDetails';;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RickMortyHome />} />
        <Route path="/character/:id" element={<CharacterDetails />} />
      </Routes>
    </Router>
  );
}

export default App;