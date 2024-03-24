// AppsList.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AppsList } from "../../pages";
import { BrowserRouter } from "react-router-dom";
import appCodeStore from "./../../appCodesStore";

describe("App list Component", () => {
  test('renders "Authenticators list" heading', () => {
    const { getByText } = render(
      <BrowserRouter>
        <AppsList />
      </BrowserRouter>
    );
    const headingElement = screen.getByText(/Authenticators list/i);
    expect(headingElement).toBeInTheDocument();
  });

  jest.mock("react-router-dom", () => {
    const actualModule = jest.requireActual("react-router-dom");
    return {
      ...actualModule,
      useNavigate: jest.fn(),
    };
  });
  test("renders app list items with name and code", () => {
    // Mock store data

    const { getByText } = render(
      <BrowserRouter>
        <AppsList store={appCodeStore} />
      </BrowserRouter>
    );

    // Check if app names and codes are rendered for each item
    appCodeStore?.appsList?.forEach((app) => {
      const nameElement = screen.getByText(app?.name);
      const codeElement = screen.getByText(app?.code);
      expect(nameElement).toBeInTheDocument();
      expect(codeElement).toBeInTheDocument();
    });
  });

  test("renders remaining percentage for each app", () => {
    // Mock store data

    const { getByText } = render(
      <BrowserRouter>
        <AppsList store={appCodeStore} />
      </BrowserRouter>
    );
  });

  it("navigates to /add when Add button is clicked", () => {
    const { getByText } = render(
      <BrowserRouter>
        <AppsList store={appCodeStore} />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText("Add"));
    expect(window.location.pathname).toBe("/add");
  });
  // Add more test cases as needed
});
