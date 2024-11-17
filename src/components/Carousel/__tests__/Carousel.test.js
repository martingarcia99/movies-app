import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Carousel from '../Carousel';
import { fetchMovies } from '../../../utils/api';

jest.mock('../../../utils/api', () => ({
  fetchMovies: jest.fn(),
}));

jest.mock('../../CarouselItem/CarouselItem', () => jest.fn(() => <div data-testid="carousel-item" />));

jest.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(300);
jest.spyOn(HTMLElement.prototype, 'scrollWidth', 'get').mockReturnValue(1200);


describe('Carousel Component', () => {
    const mockMovies = [
        { id: 1, title: 'Movie 1', poster_path: '/movie1.jpg' },
        { id: 2, title: 'Movie 2', poster_path: '/movie2.jpg' },
        { id: 3, title: 'Movie 3', poster_path: '/movie3.jpg' },
        { id: 4, title: 'Movie 4', poster_path: '/movie4.jpg' },
        { id: 5, title: 'Movie 5', poster_path: '/movie5.jpg' },
        { id: 6, title: 'Movie 6', poster_path: '/movie6.jpg' },
        { id: 7, title: 'Movie 7', poster_path: '/movie7.jpg' },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders title and fetches movies on mount', async () => {
        fetchMovies.mockResolvedValue({ data: { results: mockMovies } });
    
        await act(async () => {
          render(<Carousel title="Popular Movies" category="popular" />);
        });
    
        expect(screen.getByText('Popular Movies')).toBeInTheDocument();
        expect(fetchMovies).toHaveBeenCalledWith('popular');
        expect(screen.getAllByTestId('carousel-item')).toHaveLength(mockMovies.length);
    });

    test('renders left and right buttons based on scroll position', async () => {
        fetchMovies.mockResolvedValue({ data: { results: mockMovies } });
    
        await act(async () => {
          render(<Carousel title="Popular Movies" category="popular" />);
        });
    
        const carouselItems = screen.getByTestId('carousel-items');
        const leftButton = screen.queryByTestId('left-button');
        const rightButton = screen.queryByTestId('right-button');
    
        expect(leftButton).toBeNull();
        expect(rightButton).toBeInTheDocument();
    
        fireEvent.scroll(carouselItems, { target: { scrollLeft: 100 } });
    
        expect(screen.getByTestId('left-button')).toBeInTheDocument();
    });

});
