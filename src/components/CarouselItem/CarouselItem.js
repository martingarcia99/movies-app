import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useWishlistStore from '../../store/store';
import { FaRegTrashAlt } from "react-icons/fa";

const CarouselItem = ({ movie, category, isWishlist }) => {
    const navigate = useNavigate();
    const { removeFromWishlist } = useWishlistStore();

    useEffect(() =>{
        console.log('render item')
    },[])

    const handleClick = () => {
        navigate(`/movie/${category}/${movie.id}`);
    };

    const handleDelete = (movieId) => {
        removeFromWishlist(movieId);
    };

    return (
        <div className={`carousel-item card ${isWishlist ? 'wishlistItem' : 'homeItem'}`} onClick={!isWishlist ? handleClick : undefined}>
            <img className='image-item' src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} height="500px" alt={movie.title} />
            {isWishlist && <div className="hover-overlay" data-testid="trush-button" onClick={() => handleDelete(movie.id)}>
                <i className="trash-icon">
                    <FaRegTrashAlt />
                </i>
            </div>}
        </div>
    )
};

export default CarouselItem;
