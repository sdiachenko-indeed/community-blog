import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import App from "../App";
import { fetchUserWithPosts , fetchUsersWithPosts} from "../api";
import '@testing-library/jest-dom';
require("cross-fetch/polyfill");

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

jest.mock("../api");

describe("User", ()=>{
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
    });

    

    test("Navigating to an unknown user shows error message and link to /", async () => {
        fetchUserWithPosts.mockImplementation(() => Promise.reject(new Error('fail')));
        render(
            <MemoryRouter initialEntries={["/users/10"]}>
                <App />
            </MemoryRouter>
        );
        
        await screen.findByText(/Return Home/i);
        expect(screen.getByText(/Return Home/i).getAttribute("href")).toBe("/");
    });

    test("PostList shows on /:userId/posts route", async () => {
        const mockUser = {
          id: 7,
          name: "Kurtis Weissnat",
          username: "Elwyn.Skiles",
          email: "Telly.Hoeger@billy.biz",
          address: {
            street: "Rex Trail",
            suite: "Suite 280",
            city: "Howemouth",
            zipcode: "58804-1099",
            geo: {
              lat: "24.8918",
              lng: "21.8984",
            },
          },
          phone: "210.067.6132",
          website: "elvis.io",
          company: {
            name: "Johns Group",
            catchPhrase: "Configurable multimedia task-force",
            bs: "generate enterprise e-tailers",
          },
          posts: [
            {
              userId: 7,
              id: 61,
              title: "voluptatem doloribus consectetur est ut ducimus",
              body:
                "ab nemo optio odio\ndelectus tenetur corporis similique nobis repellendus rerum omnis facilis\nvero blanditiis debitis in nesciunt doloribus dicta dolores\nmagnam minus velit",
            },
            {
              userId: 7,
              id: 62,
              title: "beatae enim quia vel",
              body:
                "enim aspernatur illo distinctio quae praesentium\nbeatae alias amet delectus qui voluptate distinctio\nodit sint accusantium autem omnis\nquo molestiae omnis ea eveniet optio",
            },
            {
              userId: 7,
              id: 63,
              title:
                "voluptas blanditiis repellendus animi ducimus error sapiente et suscipit",
              body:
                "enim adipisci aspernatur nemo\nnumquam omnis facere dolorem dolor ex quis temporibus incidunt\nab delectus culpa quo reprehenderit blanditiis asperiores\naccusantium ut quam in voluptatibus voluptas ipsam dicta",
            },
          ],
        };
    
        fetchUserWithPosts.mockImplementation(() => Promise.resolve(mockUser));
        render(
            <MemoryRouter initialEntries={["/users/7/posts"]}>
              <App />
            </MemoryRouter>
        );
    
        const postLink = await screen.findByText(/voluptas/i);
    
        expect(postLink.getAttribute("href")).toBe("/users/7/posts/63");
    });

    test("UserProfile shows on /:userId route", async () => {
        const mockUser = {
          id: 8,
          name: "Nicholas Runolfsdottir V",
          username: "Maxime_Nienow",
          email: "Sherwood@rosamond.me",
          address: {
            street: "Ellsworth Summit",
            suite: "Suite 729",
            city: "Aliyaview",
            zipcode: "45169",
            geo: {
              lat: "-14.3990",
              lng: "-120.7677",
            },
          },
          phone: "586.493.6943 x140",
          website: "jacynthe.com",
          company: {
            name: "Abernathy Group",
            catchPhrase: "Implemented secondary concept",
            bs: "e-enable extensible e-tailers",
          },
          posts: [
            {
              userId: 8,
              id: 76,
              title: "doloremque officiis ad et non perferendis",
              body:
                "ut animi facere\ntotam iusto tempore\nmolestiae eum aut et dolorem aperiam\nquaerat recusandae totam odio",
            },
            {
              userId: 8,
              id: 77,
              title: "necessitatibus quasi exercitationem odio",
              body:
                "modi ut in nulla repudiandae dolorum nostrum eos\naut consequatur omnis\nut incidunt est omnis iste et quam\nvoluptates sapiente aliquam asperiores nobis amet corrupti repudiandae provident",
            },
          ],
        };
    
        fetchUserWithPosts.mockImplementation(() => Promise.resolve(mockUser));
        render(
            <MemoryRouter initialEntries={["/users/8"]}>
              <App />
            </MemoryRouter>
        );
    
        await screen.findByText(/Sherwood@rosamond.me/i);
    
   
        // Check if it's an anchor tag with the correct href
        expect(screen.getByText("Profile")).toHaveAttribute("href", "/users/8");
        expect(screen.getByText("Posts")).toHaveAttribute("href", "/users/8/posts");

      });
})