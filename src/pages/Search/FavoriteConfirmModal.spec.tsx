import React from "react";
import Modal from "react-modal";
import { render } from '@testing-library/react';
import { FavoriteConfirmModal } from "app/src/pages/Search/FavoriteConfirmModal";
import { FavoriteChoiceForm } from "app/src/pages/Search/FavoriteChoiceForm";
import { FavoriteAddForm } from "app/src/pages/Search/FavoriteAddForm";

jest.mock("app/src/pages/Search/FavoriteAddForm");
jest.mock("app/src/pages/Search/FavoriteChoiceForm");

Modal.setAppElement(document.createElement('div'));

describe("pages/Search/FavoriteConfirmModal", () => {
    const addFavoriteMock = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    const favoriteMock = {
        id: "1",
        title: "title",
        description: "description",
        photos: [],
    }
    it("not open", () => {
        const wrapper = render(<FavoriteConfirmModal
            isOpen={false}
            closeModal={jest.fn()}
            addFavorite={addFavoriteMock}
            favorites={[]}
        />);

        expect(wrapper.queryByTestId("favorite-choice-form")).not.toBeInTheDocument();
        expect(wrapper.queryByTestId("favorite-add-form")).not.toBeInTheDocument();
    });

    it("open", () => {
        const wrapper = render(<FavoriteConfirmModal
            isOpen={true}
            closeModal={jest.fn()}
            addFavorite={addFavoriteMock}
            favorites={[]}
        />);

        expect(wrapper.getByTestId("favorite-choice-form")).toBeInTheDocument();
        expect(wrapper.getByTestId("favorite-add-form")).toBeInTheDocument();
    });

    it("onChoiceSubmit", () => {
        render(<FavoriteConfirmModal
            isOpen={true}
            closeModal={jest.fn()}
            addFavorite={addFavoriteMock}
            favorites={[favoriteMock]}
        />);

        const choiceFormMock = FavoriteChoiceForm as jest.Mock;
        choiceFormMock.mock.calls[0][0].onSubmit({ favoriteId: "0" });
        expect(addFavoriteMock).not.toBeCalled();
        choiceFormMock.mock.calls[0][0].onSubmit({ favoriteId: "1" });
        expect(addFavoriteMock).toBeCalledWith(favoriteMock);
    });

    it("onAddSubmit", () => {
        render(<FavoriteConfirmModal
            isOpen={true}
            closeModal={jest.fn()}
            addFavorite={addFavoriteMock}
            favorites={[favoriteMock]}
        />);

        const addFormMock = FavoriteAddForm as jest.Mock;

        let formData = {
            "title": "title2",
            "description": "description2",
        };
        addFormMock.mock.calls[0][0].onSubmit(formData);
        expect(addFavoriteMock).toBeCalledWith({
            ...formData,
            photos: [],
        });

        formData = {
            "title": "title3",
            "description": "description3",
        };
        addFormMock.mock.calls[0][0].onSubmit(formData);
        expect(addFavoriteMock).toBeCalledWith({
            ...formData,
            photos: [],
        });
    });
});