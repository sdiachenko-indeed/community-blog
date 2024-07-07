import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import App from "../App";
import { fetchUsersWithPosts, fetchUserWithPosts } from "../api"

require("cross-fetch/polyfill");

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

jest.mock("../api");

describe("Post", ()=>{
    beforeEach(() => {
        // Reset the mockNavigate before each test
        mockNavigate.mockReset();
        // Mock the fetch function
        global.fetch = jest.fn(() =>
          Promise.resolve({
            json: () => Promise.resolve({}), // Adjust the resolved value as necessary
          })
        );
      });

    afterEach(() => {
        fetchUserWithPosts.mockReset();
        fetchUsersWithPosts.mockReset();
    });

    test("Delete post redirects to home page", async () => {
        const mockUser ={
              id: 9,
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
              posts: [
                {
                    userId: 9,
                    id: 86,
                    title: "placeat quia et porro iste",
                    body:
                      "quasi excepturi consequatur iste autem temporibus sed molestiae beatae\net quaerat et esse ut\nvoluptatem occaecati et vel explicabo autem\nasperiores pariatur deserunt optio",
                  },
                  {
                    userId: 9,
                    id: 87,
                    title: "nostrum quis quasi placeat",
                    body:
                      "eos et molestiae\nnesciunt ut a\ndolores perspiciatis repellendus repellat aliquid\nmagnam sint rem ipsum est",
                  },
              ]
        };

        window.confirm = jest.fn();
        window.confirm.mockImplementation(() => true);
        fetchUserWithPosts.mockImplementation(() => Promise.resolve(mockUser));
        render(
            <MemoryRouter initialEntries={["/users/9/posts/87"]}>
                <App />
            </MemoryRouter>
        );

        await screen.findByText(/eos et molestiae/i);

        fireEvent.click(screen.getByText(/delete post/i));

        expect(window.confirm).toHaveBeenCalledWith(
            "Are you sure you want to delete this post?"
        );
    });
});