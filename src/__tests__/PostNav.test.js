import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PostsNav from "../user/PostsNav";

describe("PostNav", ()=>{
    test("Go home links to /", async ()=>{
        render(
            <MemoryRouter>
                <PostsNav />
            </MemoryRouter>
        );
        await screen.findByText(/Go Home/i);

        expect(screen.getByText(/Go Home/i).getAttribute('href')).toBe("/");
    })
})