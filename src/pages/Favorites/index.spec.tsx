import React from "react";
import * as favoriteHook from "app/src/hooks/favorite";
import Favorites from ".";
import { render } from "@testing-library/react";

describe("pages/Favorites", () => {
    const favoriteMock = {
        title: "aaaa",
        description: "bbbbb",
        photos: [],
    }
    it("default", () => {
        const useFavoriteMock = jest.spyOn(favoriteHook, "useFavorite");
        useFavoriteMock.mockReturnValueOnce({
            favorites: [favoriteMock, favoriteMock],
            addFavorite: jest.fn,
            updateFavorite: jest.fn
        });

        const wrapper = render(<Favorites />);
        expect(wrapper.getAllByRole("listitem")).toHaveLength(2);
    });

    it.todo("onDownload");
    it.todo("onSubmit");
});