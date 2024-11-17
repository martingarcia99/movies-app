import React, { useEffect, useState, useRef } from 'react';
import CarouselItem from '../CarouselItem/CarouselItem';
import { fetchMovies } from '../../utils/api';

const Carousel = ({ title, category }) => {
  const [movies, setMovies] = useState([]);
  const carouselRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', updateButtonVisibility);
      return () => carousel.removeEventListener('scroll', updateButtonVisibility);
    }
  }, []);

  useEffect(() => {
    fetchMovies(category).then((response) => {
      setMovies(response.data.results);
      updateButtonVisibility();
    });
  }, [category]);

  useEffect(() => {
    updateButtonVisibility();
  }, [movies]);

  const scrollLeft = () => {
    if (carouselRef.current) {
        carouselRef.current.scrollBy({ left: -carouselRef.current.offsetWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
        carouselRef.current.scrollBy({ left: carouselRef.current.offsetWidth, behavior: 'smooth' });
    }
  };

  const updateButtonVisibility = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft + clientWidth < scrollWidth);
    }
  };

  

  return (
    <div className="carousel">
      <h2 className='carousel-title'>{title}</h2>
      {showLeftButton && (
        <button className="carousel-button left" onClick={scrollLeft} data-testid="left-button">
          &#10094;
        </button>
      )}
      <div className="carousel-items" ref={carouselRef} data-testid="carousel-items">
        {movies.map((movie) => (
          <CarouselItem key={movie.id} movie={movie} category={category} isWishlist={false}/>
        ))}
      </div>
      {showRightButton && (
        <button className="carousel-button right" onClick={scrollRight} data-testid="right-button">
          &#10095;
        </button>
      )}
    </div>
  );
};

export default Carousel;