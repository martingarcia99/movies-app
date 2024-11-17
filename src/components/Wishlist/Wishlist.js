import React from 'react';
import useWishlistStore from '../../store/store';
import CarouselItem from '../CarouselItem/CarouselItem';
import { CiFileOff } from "react-icons/ci";

const Wishlist = () => {
    const { wishlist } = useWishlistStore();

    return (
        <div className="wishlist">
            <h2>Your Wishlist</h2>
            {wishlist.length > 0 ? <div className="carousel-items wishlist-detail">
                {wishlist.map((movie) => (
                    <CarouselItem key={movie.id} movie={movie} isWishlist={true}/>
                ))}
            </div>
            : <div className='empty-page'>
                <CiFileOff size={100} data-testid='cifileoff'/>
                <p>No movies on the wishlist</p>
            </div>}
        </div>
    );
};

export default Wishlist;
