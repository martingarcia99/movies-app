import useWishlistStore from '../store';
import '@testing-library/jest-dom';
import { act } from "@testing-library/react";

describe('useWishlistStore', () => {
  beforeEach(() => {
    useWishlistStore.setState({ wishlist: [] });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('initializes with an empty wishlist', () => {
    const { wishlist } = useWishlistStore.getState();
    expect(wishlist).toEqual([]);
  });

  test('adds a movie to the wishlist successfully', () => {
    const { addToWishlist, wishlist } = useWishlistStore.getState();
    const movie = { id: 1, title: 'Movie 1' };

    act(() => {
        const result = addToWishlist(movie);
        expect(result).toEqual({ success: `The movie "Movie 1" was added to the wishlist.` });
    });
    
    const updatedWishlist = useWishlistStore.getState().wishlist;
    expect(updatedWishlist).toContainEqual(movie);
  });

  test('prevents adding a duplicate movie to the wishlist', () => {
    const { addToWishlist, wishlist } = useWishlistStore.getState();
    const movie = { id: 1, title: 'Movie 1' };

    act(() => {
        const result = addToWishlist(movie);
        expect(result).toEqual({ success: `The movie "Movie 1" was added to the wishlist.` });
    });
  
    act(() => {
        const result = addToWishlist(movie);
        expect(result).toEqual({ error: `The movie "Movie 1" is already on the wishlist.` });
    });

    const updatedWishlist = useWishlistStore.getState().wishlist;
    expect(updatedWishlist).toHaveLength(1);
    expect(updatedWishlist).toContainEqual(movie);
    
  });

  test('removes a movie from the wishlist', () => {
    const { addToWishlist, removeFromWishlist, wishlist } = useWishlistStore.getState();
    const movie1 = { id: 1, title: 'Movie 1' };
    const movie2 = { id: 2, title: 'Movie 2' };

    act(() => {
        addToWishlist(movie1);
        addToWishlist(movie2);
        removeFromWishlist(1);
    });

    const updatedWishlist = useWishlistStore.getState().wishlist;
    expect(updatedWishlist).toHaveLength(1);
    expect(updatedWishlist).not.toContainEqual(movie1);
    expect(updatedWishlist).toContainEqual(movie2);
  });

  test('does nothing when trying to remove a movie not in the wishlist', () => {
    const { addToWishlist, removeFromWishlist, wishlist } = useWishlistStore.getState();
    const movie = { id: 1, title: 'Movie 1' };

    act(() => {
        addToWishlist(movie);
        removeFromWishlist(2);
    });
    
    const updatedWishlist = useWishlistStore.getState().wishlist;
    expect(updatedWishlist).toHaveLength(1);
    expect(updatedWishlist).toContainEqual(movie);
  });
});
