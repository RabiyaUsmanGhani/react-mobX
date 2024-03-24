// app.test.js
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import "@testing-library/jest-dom";
// import { App,  } from "./app";
import App from "./App";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { AddApp, AppsList } from "./pages";

test("full app rendering/navigating", async () => {
  render(<App />);
});

test("landing on a bad page", () => {
  const badRoute = "/some/bad/route";

  // use <MemoryRouter> when you want to manually control the history
  render(
    <MemoryRouter initialEntries={["/"]}>
      <AppsList />
    </MemoryRouter>
  );
});

test("rendering a component that uses useLocation", () => {
  const route = "/some-route";

  // use <MemoryRouter> when you want to manually control the history
  render(
    <MemoryRouter initialEntries={["/add"]}>
      <AddApp />
    </MemoryRouter>
  );
});
