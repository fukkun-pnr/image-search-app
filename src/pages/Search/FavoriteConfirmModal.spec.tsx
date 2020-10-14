import React from "react";
import { render } from '@testing-library/react';
import { FavoriteConfirmModal } from "app/src/pages/Search/FavoriteConfirmModal";
import Modal from "react-modal";

jest.mock("app/src/pages/Search/FavoriteAddForm");
jest.mock("app/src/pages/Search/FavoriteChoiceForm");

Modal.setAppElement(document.createElement('div'));

describe("pages/Search/FavoriteConfirmModal", () => {
    it("not open", () => {
        const wrapper = render(<FavoriteConfirmModal
            isOpen={false}
            closeModal={jest.fn()}
            addFavorite={jest.fn()}
            favorites={[]}
        />);

        expect(wrapper.queryByTestId("favorite-choice-form")).not.toBeInTheDocument();
        expect(wrapper.queryByTestId("favorite-add-form")).not.toBeInTheDocument();
    });

    it("open", () => {
        const wrapper = render(<FavoriteConfirmModal
            isOpen={true}
            closeModal={jest.fn()}
            addFavorite={jest.fn()}
            favorites={[]}
        />);

        expect(wrapper.getByTestId("favorite-choice-form")).toBeInTheDocument();
        expect(wrapper.getByTestId("favorite-add-form")).toBeInTheDocument();
    });

    it.todo("onAddSubmit");
    it.todo("onChoiceSubmit");
});