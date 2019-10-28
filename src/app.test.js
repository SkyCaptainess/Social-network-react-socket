import React from "react";
import App from "./app";
import { render, waitForElement } from "@testing-library/react";
import axios from "./axios";

//automatic mock - telling jest to mock axios for me - it will create a dumb copy of axios that includes all the methods i need
//these methods are get and post
jest.mock("./axios");

test("App shows nothing at first", async () => {
    axios.get.mockResolvedValue({
        data: {
            id: 1,
            first: "ž2sdfasdž2ž",
            last: "jfghsdcjfgh",
            url: "dscfghsgfs",
            bio: "gsdfhjgsdjhfgsd"
        }
    });
    const { container } = render(<App />);

    expect(
        // this is how we can check if nothing has been rendered
        container.children.length
    ).toBe(0);

    await waitForElement(() => container.querySelector("div"));

    expect(container.children.length).toBe(1);
});
