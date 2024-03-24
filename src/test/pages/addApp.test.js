import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { AddApp } from "../../pages";

jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));
jest.mock("../../appCodesStore", () => ({
  createApp: jest.fn(),
}));
describe("AddApp Component", () => {
  it("renders correctly", () => {
    const { getByText, getByLabelText } = render(<AddApp />);
    expect(screen.getByText("Add App")).toBeInTheDocument();
    expect(screen.getByLabelText("Name:")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("submits form with correct data", () => {
    const { getByLabelText, getByText } = render(<AddApp />);
    const input = screen.getByLabelText("Name:");
    const submitButton = screen.getByText("Submit");

    // Mocking user input
    fireEvent.change(input, {});
    fireEvent.click(submitButton);
  });
});
