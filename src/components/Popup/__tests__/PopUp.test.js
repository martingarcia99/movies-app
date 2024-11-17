import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import Popup from "../PopUp";
import '@testing-library/jest-dom';

jest.useFakeTimers();

describe("Popup Component", () => {
    afterEach(() => {
        jest.clearAllMocks();
    })

    const renderPopup = (message, duration) => {
        render(<Popup message={message} duration={duration} />);
    };

    test("renders correctly with success message and FaCheck icon", () => {
        const successMessage = { message: "Operation Successful", type: "success" };
        renderPopup(successMessage);

        expect(screen.getByText(/Operation Successful/i)).toBeInTheDocument();

        expect(screen.queryByTestId('facheck')).toBeInTheDocument();
    });

    test("renders correctly with error message and ImCross icon", () => {
        const errorMessage = { message: "Operation Failed", type: "error" };
        renderPopup(errorMessage);

        expect(screen.getByText(/Operation Failed/i)).toBeInTheDocument();

        expect(screen.queryByTestId('imcross')).toBeInTheDocument();
    });

    test("cleans up the timer when unmounted", () => {
        const clearTimeoutSpy = jest.spyOn(global, "clearTimeout");
        const message = { message: "Operation Successful", type: "success" };
        const { unmount } = render(<Popup message={message} duration={3000} />);
        act(() => {
        jest.advanceTimersByTime(3500);
        });

        unmount();

        expect(clearTimeoutSpy).toHaveBeenCalled();
        clearTimeoutSpy.mockRestore();
    });
});
