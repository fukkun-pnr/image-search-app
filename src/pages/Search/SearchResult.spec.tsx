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

describe("pages/Search/SearchResult", () => {
    let addFavoriteMock: jest.Mock;
    let updateFavoriteMock: jest.Mock;
    let openModalMock: jest.Mock;

    beforeEach(() => {
        addFavoriteMock = jest.fn();
        updateFavoriteMock = jest.fn();
        openModalMock = jest.fn();
        jest.spyOn(favoriteHook, "useFavorite").mockReturnValue({
            favorites: [],
            addFavorite: addFavoriteMock,
            updateFavorite: updateFavoriteMock,
        });

        jest.spyOn(modalHook, "useModal").mockReturnValue({
            isOpen: false,
            closeModal: jest.fn(),
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
            favorites: [],
            closeModal: expect.anything(),
            addFavorite: expect.anything(),
            isOpen: false,
        }, {});
    });

    it("click download", () => {
        const spy = jest.spyOn(utils, "download").mockReturnValue();
        act(() => {
            userEvent.click(screen.getByRole("button", { name: "download" }));
        });
        expect(spy).toBeCalledWith(photoMock.urls.regular, `${photoMock.id}.jpg`);
    });

    it("click save", () => {
        act(() => {
            userEvent.click(screen.getByRole("button", { name: "save" }));
        });
        expect(openModalMock).toBeCalled();
    });
});