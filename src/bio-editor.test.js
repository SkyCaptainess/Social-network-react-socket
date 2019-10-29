import React from "react";
import BioEditor from "./bio-editor";
import axios from "./axios";
import { render, fireEvent } from "@testing-library/react";

jest.mock("./axios");

test("When no bio is passed add button is rendered", () => {
    const { container } = render(<BioEditor />);
    expect(container.querySelector("button").innerHTML).toBe("Add bio");
});

test("When bio is passed edit button is rendered", () => {
    const { container } = render(<BioEditor bio="testString" />);
    expect(container.querySelector("button").innerHTML).toBe("Edit bio");
});

test("Clicking either the Add or Edit button causes a textarea and a Save button to be rendered", () => {
    const onClick = jest.fn();
    const { container } = render(<BioEditor onClick={onClick} />);
    fireEvent.click(container.querySelector("button"));
    expect(container.querySelector(".bioTextArea").children.length).toBe(2);
});

test("Clicking the Save button causes an ajax request", async () => {
    const onClick = jest.fn();
    const { container } = render(<BioEditor />);
    const { data } = await axios.post.mockResolvedValue({
        confirm: true
    });
    fireEvent.click(container.querySelector("#addBio"));
    fireEvent.click(container.querySelector("#save"));

    expect(data.confirm).toBe(true);
});
