import React from "react";
import * as favoriteHook from "app/src/hooks/favorite";
import Favorites from ".";
import { screen, render } from "@testing-library/react";
import { FavoriteCollection } from "app/src/pages/Favorites/FavoriteCollection";
import photoMock from "app/src/tests/fixtures/photo.json";
import { download } from "app/src/utils";

jest.mock("app/src/pages/Favorites/FavoriteCollection");
jest.mock("app/src/utils");

describe("pages/Favorites", () => {
    const favoriteMock = {
        title: "aaaa",
        description: "bbbbb",
        photos: [photoMock],
    }
    const updateFavoriteMock = jest.fn();
    const addFavoriteMock = jest.fn();

    beforeEach(() => {
        jest.spyOn(favoriteHook, "useFavorite").mockReturnValueOnce({
            favorites: [favoriteMock, favoriteMock],
            addFavorite: addFavoriteMock,
            updateFavorite: updateFavoriteMock
        });
        render(<Favorites />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("default", () => {
        expect(screen.getAllByRole("listitem")).toHaveLength(2);
    });

    it("onDownload", () => {
        const collectionMock = FavoriteCollection as jest.Mock;
        collectionMock.mock.calls[0][0].onDownload(photoMock);
        expect(download).toBeCalledWith(photoMock.urls.regular, `${photoMock.id}.jpg`);
    });

    it("onSubmit", () => {
        const collectionMock = FavoriteCollection as jest.Mock;
        collectionMock.mock.calls[0][0].onSubmit(favoriteMock);
        expect(updateFavoriteMock).toBeCalledWith(favoriteMock);
    });
});