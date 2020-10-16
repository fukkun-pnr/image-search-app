import React from "react";
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchResult } from "./SearchResult";
import photoMock from "app/src/tests/fixtures/photo.json";
import * as favoriteHook from "app/src/hooks/favorite";
import * as modalHook from "app/src/hooks/modal";
import { UserInfo } from "app/src/components/UserInfo";
import { FavoriteConfirmModal } from "app/src/pages/Search/FavoriteConfirmModal";
import * as utils from "app/src/utils";

jest.mock("app/src/components/UserInfo");
jest.mock("app/src/pages/Search/FavoriteConfirmModal");
jest.mock("app/src/utils");

describe("pages/Search/SearchResult", () => {
    const addFavoriteMock = jest.fn();
    const updateFavoriteMock = jest.fn();
    const openModalMock = jest.fn();
    const closeModalMock = jest.fn();
    const favoriteMock = {
        title: "title",
        description: "description",
        photos: [photoMock],
    }

    beforeEach(() => {
        addFavoriteMock.mockReset();
        updateFavoriteMock.mockReset();
        openModalMock.mockReset();
        closeModalMock.mockReset();

        jest.spyOn(favoriteHook, "useFavorite").mockReturnValue({
            favorites: [favoriteMock],
            addFavorite: addFavoriteMock,
            updateFavorite: updateFavoriteMock,
        });

        jest.spyOn(modalHook, "useModal").mockReturnValue({
            isOpen: false,
            closeModal: closeModalMock,
            openModal: openModalMock,
        });

        render(<SearchResult photo={photoMock} />);
    });
    it("check props", () => {
        const div = screen.getAllByRole("generic")[1];
        expect(div.style.backgroundImage).toBe('url(' + photoMock.urls.small + ')');
        expect(div.style.height).toBe((photoMock.height * 400 / photoMock.width) + "px");

        expect(screen.getByTestId("user-info")).toBeInTheDocument();
        expect(UserInfo).toBeCalledWith({ user: photoMock.user }, {});

        expect(screen.getByTestId("favorite-confirm-modal")).toBeInTheDocument();

        expect(FavoriteConfirmModal).toBeCalledWith({
            favorites: [favoriteMock],
            closeModal: expect.anything(),
            addFavorite: expect.anything(),
            isOpen: false,
        }, {});
    });

    it("trigger onAddFavorite", () => {
        const modalMock = FavoriteConfirmModal as jest.Mock;
        modalMock.mock.calls[0][0].addFavorite(modalMock.mock.calls[0][0].favorites[0]);
        expect(addFavoriteMock).toBeCalledWith(favoriteMock, photoMock);
        expect(closeModalMock).toBeCalled();
    });

    it("trigger closeModal", () => {
        const modalMock = FavoriteConfirmModal as jest.Mock;
        modalMock.mock.calls[0][0].closeModal();
        expect(closeModalMock).toBeCalled();
    });

    it("click download", () => {
        act(() => {
            userEvent.click(screen.getByRole("button", { name: "download" }));
        });
        expect(utils.download).toBeCalledWith(photoMock.urls.regular, `${photoMock.id}.jpg`);
    });

    it("click save", () => {
        act(() => {
            userEvent.click(screen.getByRole("button", { name: "save" }));
        });
        expect(openModalMock).toBeCalled();
    });
});