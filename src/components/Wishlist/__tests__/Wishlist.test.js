import React from "react";
import { render, screen } from "@testing-library/react";
import useWishlistStore from "../../../store/store";
import Wishlist from "../Wishlist";
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";

jest.mock("../../../store/store", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("Wishlist Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderWithRouter = (ui) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  };

  test("renders the wishlist title", () => {
    useWishlistStore.mockReturnValue({ wishlist: [] });

    renderWithRouter(<Wishlist />);
    const title = screen.getByText(/Your Wishlist/i);
    expect(title).toBeInTheDocument();
  });

  test("renders movies in the wishlist", () => {
    const mockWishlist = [
      { id: 1, title: "Movie 1", poster_path: "/path1.jpg" },
      { id: 2, title: "Movie 2", poster_path: "/path2.jpg" },
    ];

    useWishlistStore.mockReturnValue({ wishlist: mockWishlist });

    renderWithRouter(<Wishlist />);

    const carouselItems = screen.getAllByRole("img", { name: /Movie/i });
    expect(carouselItems).toHaveLength(mockWishlist.length);
  });

  test("renders empty wishlist message when there are no movies", () => {
    useWishlistStore.mockReturnValue({ wishlist: [] });

    renderWithRouter(<Wishlist />);

    const emptyMessage = screen.getByText(/No movies on the wishlist/i);
    expect(emptyMessage).toBeInTheDocument();

    const emptyIcon = screen.queryByTestId('cifileoff');
    expect(emptyIcon).toBeInTheDocument();
  });
});
