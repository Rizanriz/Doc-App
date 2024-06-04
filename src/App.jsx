import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Editor from './components/Editor';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<Editor />} />
        <Route path="/new" element={<Editor />} />
      </Routes>
    </Router>
  );
}

export default App;
