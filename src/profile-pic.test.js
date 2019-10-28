import React from "react";
import { ProfilePic } from "./profile-pic";
import { render, fireEvent } from "@testing-library/react";

test("renders image with src set to url prop", () => {
    const { container } = render(<ProfilePic imgUrl="/dog.png" />);
    expect(container.querySelector("img").getAttribute("src")).toBe("/dog.png");
});

test("renders img with src set to default.jpg when no url prop is passed", () => {
    const { container } = render(<ProfilePic />);
    expect(container.querySelector("img").getAttribute("src")).toBe(
        "/default.jpg"
    );
});

test("renders first and last props in alt attribute", () => {
    const { container } = render(<ProfilePic first="ivana" last="matijevic" />);

    expect(container.querySelector("img").getAttribute("alt")).toBe(
        "ivana matijevic"
    );
});

test("onClick prop gets called when img is clicked", () => {
    const onClick = jest.fn();
    const { container } = render(<ProfilePic onClick={onClick} />);
    fireEvent.click(container.querySelector("img"));
    fireEvent.click(container.querySelector("img"));
    fireEvent.click(container.querySelector("img"));
    expect(onClick.mock.calls.length).toBe(3);
});
