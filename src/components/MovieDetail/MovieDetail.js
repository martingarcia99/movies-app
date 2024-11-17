import React, { useState, useEffect } from 'react';
import useWishlistStore from '../../store/store';
import { useParams } from 'react-router-dom';
import { fetchMovie } from '../../utils/api';
import PopUp from '../Popup/PopUp'

const MovieDetail = () => {
  const { movieId, category } = useParams();
  const [movie, setMovie] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState({});

  useEffect(() => {
    fetchMovie(movieId).then((response) => {
        setMovie(response.data);
    });
  },[])

  const { addToWishlist } = useWishlistStore();

  const categoryDisplayNames = {
    upcoming: 'Upcoming',
    top_rated: 'Top rated',
    popular: 'Popular',
  };

  const handleAddWishlist = () => {
    const result = addToWishlist(movie); 
    if (result.error) {
        setMessage({ message: result.error, type: 'error'});
    } else {
        setMessage({ message: result.success, type: 'success'});
    }
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3500);
  }

  return (
    <div
      className={`container ${category}`}
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
      }}
    >
      {showPopup && <PopUp message={message}/>}
      <div className="overlay"></div>
      <div className="content">
        <div className={`poster ${category}`}>
          <p className={`category-movie ${category}`}>{categoryDisplayNames[category] || category}</p>
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
        </div>
        <div className="details">
          <h1 className="title">
            {movie.title} <span className="year">({new Date(movie.release_date).getFullYear()})</span>
          </h1>
          <p className="info">{movie.overview}</p>
          <button
            className={`btn ${category}`} 
            onClick={handleAddWishlist}
            data-testid='buttonAddWishlist'
          >
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
