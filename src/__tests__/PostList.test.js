import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import App from "../App";
import { fetchUserWithPosts, fetchUsersWithPosts } from "../api";

require("cross-fetch/polyfill");

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

jest.mock("../api");

describe("PostList", ()=>{
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
                id: 11,
                title:
                "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                body:
                "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
            }
        ]
    };

    test("links to posts use nearest route path", async () => {   
        fetchUserWithPosts.mockImplementation(() => Promise.resolve(mockUser));
        fetchUsersWithPosts.mockImplementation(() => Promise.resolve([mockUsers]));
        render(
            <MemoryRouter initialEntries={["/users/9/posts"]}>
                <App />
            </MemoryRouter>
        );
        
        await screen.findByText(/sunt aut facere repellat provident*/i);
        expect(screen.getByText(/sunt aut facere repellat.*/i).getAttribute('href')).toBe("/users/9/posts/11");
    });


    test("displays 'No post selected' on /posts", async () => {
        fetchUserWithPosts.mockImplementation(() => Promise.resolve(mockUser));
        fetchUsersWithPosts.mockImplementation(() => Promise.resolve([mockUsers]));
        render(
            <MemoryRouter initialEntries={["/users/9/posts"]}>
                <App />
            </MemoryRouter>
        );

        await screen.findByText(/No post selected/i);
        expect(screen.getByText(/No post selected/i)).toBeTruthy();
        expect(screen.queryByText(/Nodio quis facere/i)).toBeFalsy();
    })
});