import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import useWishlistStore from '../../../store/store';
import { fetchMovie } from '../../../utils/api';
import MovieDetail from '../MovieDetail';
import '@testing-library/jest-dom';

jest.mock('../../../utils/api', () => ({
  fetchMovie: jest.fn(),
}));

jest.mock('../../../store/store', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
}));

const mockAddToWishlist = jest.fn();
const mockFetchMovie = jest.fn();

describe('MovieDetail Component', () => {
  const mockMovie = {
    id: 1,
    title: 'Test Movie',
    release_date: '2022-12-15',
    overview: 'Test overview',
    poster_path: '/test.jpg',
    backdrop_path: '/test-bg.jpg',
  };

  beforeEach(() => {
    useWishlistStore.mockReturnValue({
      addToWishlist: mockAddToWishlist,
    });

    fetchMovie.mockResolvedValue({
      data: mockMovie,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  const renderComponent = (movieId, category) => {
    const useParams = require('react-router-dom').useParams;
    useParams.mockReturnValue({ movieId, category });

    render(
      <BrowserRouter>
        <MovieDetail />
      </BrowserRouter>
    );
  };

  test('renders correctly with initial data', async () => {
    renderComponent({ movieId: 1, category: 'popular' });

    await waitFor(() => expect(fetchMovie).toHaveBeenCalledWith({ movieId: 1, category: 'popular' }));

    expect(screen.getByText(/Test Movie/i)).toBeInTheDocument();
    expect(screen.getByText(/2022/i)).toBeInTheDocument();
    expect(screen.getByText(/Test overview/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Test Movie/i)).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/w500//test.jpg'
    );
  });

  test('calls addToWishlist and shows success popup', async () => {
    renderComponent({ movieId: 1, category: 'popular' });

    await waitFor(() => expect(fetchMovie).toHaveBeenCalledWith({ movieId: 1, category: 'popular' }));

    mockAddToWishlist.mockReturnValueOnce({ success: 'Added to wishlist!' });
    const addButton = screen.queryByTestId('buttonAddWishlist');
    fireEvent.click(addButton);

    expect(mockAddToWishlist).toHaveBeenCalledWith(mockMovie);

    await waitFor(() => {
      expect(screen.getByText(/Added to wishlist!/i)).toBeInTheDocument();
    });
  });

  test('shows error popup when addToWishlist fails', async () => {
    renderComponent({ movieId: 1, category: 'popular' });

    await waitFor(() => expect(fetchMovie).toHaveBeenCalledWith({ movieId: 1, category: 'popular' }));

    mockAddToWishlist.mockReturnValueOnce({ error: 'Failed to add!' });
    const addButton = screen.queryByTestId('buttonAddWishlist');
    fireEvent.click(addButton);

    expect(mockAddToWishlist).toHaveBeenCalledWith(mockMovie);

    await waitFor(() => {
      expect(screen.getByText(/Failed to add!/i)).toBeInTheDocument();
    });
  });

  test('popup disappears after timeout', async () => {
    jest.useFakeTimers();
    renderComponent({ movieId: 1, category: 'popular' });

    await waitFor(() => expect(fetchMovie).toHaveBeenCalledWith({ movieId: 1, category: 'popular' }));

    mockAddToWishlist.mockReturnValueOnce({ success: 'Added to wishlist!' });
    const addButton = screen.queryByTestId('buttonAddWishlist');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText(/Added to wishlist!/i)).toBeInTheDocument();
    });

    jest.runAllTimers();

    await waitFor(() => {
        expect(screen.queryByText(/Added to wishlist!/i)).not.toBeInTheDocument();
    });

    jest.useRealTimers();
  });
});
