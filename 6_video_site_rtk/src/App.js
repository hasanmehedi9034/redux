import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/ui/Footer';
import Home from './pages/Home';
import Video from './pages/Video';


function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/videos/:videoId' element={<Video />}></Route>
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
