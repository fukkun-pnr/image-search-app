import React from "react";
import { act, render, screen } from '@testing-library/react';
import { FavoriteCollection } from "./FavoriteCollection";
import photoMock from "app/src/tests/fixtures/photo.json";
import userEvent from "@testing-library/user-event";


const favoritesMock = {
    id: "id",
    title: "title",
    description: "description",
    photos: [photoMock, photoMock],
}

describe("components/FavoriteCollection", () => {
    let onSubmit: jest.Mock;
    let onDownload: jest.Mock;

    beforeEach(() => {
        onSubmit = jest.fn();
        onDownload = jest.fn();
        render(<FavoriteCollection data={favoritesMock} onDownload={onDownload} onSubmit={onSubmit} />);
    });

    it("check props", () => {
        expect(screen.getByText(favoritesMock.title)).toBeInTheDocument();
        expect(screen.getByText(favoritesMock.description)).toBeInTheDocument();

        const list = screen.getByTestId("favorite-collection__list");
        expect(list.childNodes.length).toBe(favoritesMock.photos.length);
    });

    it("toggle edit info", () => {
        act(() => {
            userEvent.click(screen.getByRole("button", { name: "Edit" }));
        });
        expect(screen.getAllByRole("textbox")).toHaveLength(2);
        expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();

        act(() => {
            userEvent.click(screen.getByRole("button", { name: "Cancel" }));
        });
        expect(screen.queryAllByRole("textbox")).toHaveLength(0);
        expect(screen.queryByRole("button", { name: "Submit" })).not.toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
    });

    it("submit", () => {
        act(() => {
            userEvent.click(screen.getByRole("button", { name: "Edit" }));
        });
    })

    it.todo("on submit");
});