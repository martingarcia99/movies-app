import React from 'react';
import Carousel from './components/Carousel/Carousel';
import Wishlist from './components/Wishlist/Wishlist';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import MovieDetail from './components/MovieDetail/MovieDetail';

const App = () => {

  return (
    <Router>
      <Navbar />
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Carousel title="Popular" category="popular" />
                <Carousel title="Top Rated" category="top_rated" />
                <Carousel title="Upcoming" category="upcoming" />
              </>
            }
          />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/movie/:category/:movieId" element={<MovieDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
