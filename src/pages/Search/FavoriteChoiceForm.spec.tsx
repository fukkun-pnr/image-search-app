import React from "react";
import { act, render, screen } from '@testing-library/react';
import { FavoriteChoiceForm } from "./FavoriteChoiceForm";
import userEvent from "@testing-library/user-event";

describe("pages/Search/FavoriteChoiceForm", () => {
    const favorites = [
        {
            id: "1",
            title: "1111",
            description: "1111",
            photos: [],
        },
        {
            id: "2",
            title: "2222",
            description: "2222",
            photos: [],
        }
    ]
    let onSubmit: jest.Mock;
    let favorite: HTMLSelectElement;
    beforeEach(() => {
        onSubmit = jest.fn();
        render(<FavoriteChoiceForm favorites={favorites} onSubmit={onSubmit} />);
        favorite = screen.getByRole("combobox") as HTMLSelectElement;
    });

    it("choice 1", async () => {
        await act(async () => {
            userEvent.selectOptions(favorite, ["1"]);
            userEvent.click(screen.getByRole("button"));
        });
        expect(onSubmit.mock.calls[0][0]).toStrictEqual({ "favoriteId": "1" });
    });

    it("choice 2", async () => {
        await act(async () => {
            userEvent.selectOptions(favorite, ["2"]);
            userEvent.click(screen.getByRole("button"));
        });
        expect(onSubmit.mock.calls[0][0]).toStrictEqual({ "favoriteId": "2" });
    });
});