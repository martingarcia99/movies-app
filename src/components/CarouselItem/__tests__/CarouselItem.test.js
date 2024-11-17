import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CarouselItem from '../CarouselItem';
import useWishlistStore from '../../../store/store';
import '@testing-library/jest-dom';

jest.mock('../../../store/store', () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(), 
}));

const mockNavigate = jest.fn();
const mockRemoveFromWishlist = jest.fn();
describe('CarouselItem Component', () => {

    beforeEach(() => {
        useWishlistStore.mockReturnValue({
            removeFromWishlist: mockRemoveFromWishlist,
        });

        require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const mockMovie = {
        id: 1,
        poster_path: '/path.jpg',
        title: 'Test Movie',
    };

    const renderComponent = (props) => {
        return render(
            <BrowserRouter>
                <CarouselItem {...props} />
            </BrowserRouter>
        );
    };

    test('renders correctly', () => {
        renderComponent({ movie: mockMovie, category: 'action', isWishlist: false });
        const img = screen.getByAltText('Test Movie');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', 'https://image.tmdb.org/t/p/w500//path.jpg');
    });

    test('calls navigate function on click when not in wishlist', () => {
        renderComponent({ movie: mockMovie, category: 'action', isWishlist: false });
        const card = screen.getByRole('img');
        fireEvent.click(card);
        expect(mockNavigate).toHaveBeenCalledWith('/movie/action/1');
        expect(mockNavigate).toHaveBeenCalledTimes(1);
    });

    test('does not navigate when isWishlist is true', () => {
        renderComponent({ movie: mockMovie, category: 'action', isWishlist: true });
        const card = screen.getByRole('img');
        expect(mockNavigate).not.toHaveBeenCalled();
    });

    test('calls removeFromWishlist when delete icon is clicked', () => {
        renderComponent({ movie: mockMovie, category: 'action', isWishlist: true });
        const trashIcon = screen.queryByTestId('trush-button');
        fireEvent.click(trashIcon);
        expect(mockRemoveFromWishlist).toHaveBeenCalledWith(1);
        expect(mockRemoveFromWishlist).toHaveBeenCalledTimes(1);
    });

    test('renders delete icon only if isWishlist is true', () => {
        const { rerender } = renderComponent({ movie: mockMovie, category: 'action', isWishlist: true });
        expect(screen.queryByTestId('trush-button')).toBeInTheDocument();

        rerender(
            <BrowserRouter>
                <CarouselItem movie={mockMovie} category="action" isWishlist={false} />
            </BrowserRouter>
        );
        expect(screen.queryByTestId('trush-button')).not.toBeInTheDocument();
    });
});
