import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import NotFound from "../common/NotFound";

describe("NotFound component", () => {
  test("Contains a link to /", async () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    await screen.findByText(/Return Home/i);

    expect(screen.getByText(/Return Home/i).getAttribute('href')).toBe("/");
  });
});
