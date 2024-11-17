import { create } from 'zustand';

const useWishlistStore = create((set, get) => ({
  wishlist: JSON.parse(localStorage.getItem('wishlist')) || [],
  addToWishlist: (movie) => {
    const { wishlist } = get();
    const movieExists = wishlist.some((item) => item.id === movie.id);

    if (movieExists) {
      return { error: `The movie "${movie.title}" is already on the wishlist.` };
    }
    const updatedWishlist = [...get().wishlist, movie];
    set((state) => ({
      wishlist: [...state.wishlist, movie],
    }));
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    return { success: `The movie "${movie.title}" was added to the wishlist.` };
  },
  removeFromWishlist: (movieId) => {
    const updatedWishlist = get().wishlist.filter((movie) => movie.id!== movieId);
    set((state) => ({
        wishlist: updatedWishlist
    })),
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
   },
}));

export default useWishlistStore;
