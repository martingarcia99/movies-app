import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Navbar';
import '@testing-library/jest-dom';

describe('Navbar Component', () => {
  const renderComponent = () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
  };

  test('renders the logo and app name', () => {
    renderComponent();

    const logo = screen.getByRole('img');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/favicon.ico');
    expect(logo).toHaveAttribute('height', '30px');

    const appName = screen.getByText(/Movie App/i);
    expect(appName).toBeInTheDocument();
  });

  test('renders navigation links with correct text and routes', () => {
    renderComponent();

    const homeLink = screen.getByText(/Home/i);
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');

    const wishlistLink = screen.getByText(/Wishlist/i);
    expect(wishlistLink).toBeInTheDocument();
    expect(wishlistLink).toHaveAttribute('href', '/wishlist');
  });

  test('has correct structure and classes', () => {
    renderComponent();

    const navbar = screen.getByRole('navigation');
    expect(navbar).toBeInTheDocument();
    expect(navbar).toHaveClass('navbar');

    const logoContainer = screen.getByText(/Movie App/i).closest('div');
    expect(logoContainer).toHaveClass('navbar__logo');

    const linksContainer = screen.getByText(/Home/i).closest('div');
    expect(linksContainer).toHaveClass('navbar__links');
  });
});
