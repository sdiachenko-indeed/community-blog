import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen} from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom/extend-expect";
import { fetchUsersWithPosts, fetchUserWithPosts } from "../api"

require("cross-fetch/polyfill");

jest.mock("../api");

describe("App", () => {
  afterEach(() => {
    fetchUserWithPosts.mockReset();
    fetchUsersWithPosts.mockReset();
  });

  test("Navigating to an unknown URL shows 'Page not found!'", async () => {
    fetchUserWithPosts.mockImplementation(() =>
      Promise.reject(
        new Error("When the implementation is correct, this will not be called")
      )
    );

    fetchUsersWithPosts.mockImplementation(() =>
      Promise.reject(
        new Error("When the implementation is correct, this will not be called")
      )
    );

    render(
      <MemoryRouter initialEntries={["/this/route/does/not/exist"]}>
          <App />
      </MemoryRouter>
    );

    await screen.findByText(/page not found/i);

    expect(screen.getByText("Page not found!")).toBeInTheDocument();
  });

  test("/ does not show 'Go Home', user info, or blog posts", async () => {
    const mockUsers = [
      {
        id: 10,
        name: "Clementina DuBuque",
        username: "Moriah.Stanton",
        email: "Rey.Padberg@karina.biz",
        address: {
          street: "Kattie Turnpike",
          suite: "Suite 198",
          city: "Lebsackbury",
          zipcode: "31428-2261",
          geo: {
            lat: "-38.2386",
            lng: "57.2232",
          },
        },
        phone: "024-648-3804",
        website: "ambrose.net",
        company: {
          name: "Hoeger LLC",
          catchPhrase: "Centralized empowering task-force",
          bs: "target end-to-end models",
        },
        posts: [],
      },
    ];

    fetchUserWithPosts.mockImplementation(() =>
      Promise.reject(
        new Error("When the implementation is correct, this will not be called")
      )
    );

    fetchUsersWithPosts.mockImplementation(() => Promise.resolve(mockUsers));

    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    await screen.findByText(/Clementina DuBuque/i);

    expect(screen.queryAllByText(/email/i)).toHaveLength(0);
    expect(screen.queryAllByText(/go home/i)).toHaveLength(0);
    expect(screen.queryAllByText(/profile/i)).toHaveLength(0);
    expect(screen.queryAllByText(/sunt aut facere/i)).toHaveLength(0);
    expect(screen.queryAllByText(/user name/i)).toHaveLength(0);
    expect(screen.queryAllByText(/delete/i)).toHaveLength(0);
    expect(screen.queryAllByText(/no post selected/i)).toHaveLength(0);
  });
});
