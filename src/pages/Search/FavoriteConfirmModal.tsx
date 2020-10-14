import React from "react";
import Modal from "react-modal";
import { FavoriteAddForm } from "app/src/pages/Search/FavoriteAddForm";
import { FavoriteChoiceForm } from "app/src/pages/Search/FavoriteChoiceForm";


type Props = {
    isOpen: boolean;
    closeModal: () => void;
    addFavorite: (favorite: App.Favorite) => void;
    favorites: App.FavoriteCollection;
}

export const FavoriteConfirmModal = (props: Props) => {
    const onAddSubmit = (data: App.FavoriteInputData) => {
        const favorite = {
            ...data,
            photos: [],
        };

        props.addFavorite(favorite);
    };

    const onChoiceSubmit = (data: App.FavoriteChoiceData) => {
        const item = props.favorites.find((f) => f.id === data.favoriteId);
        if (!item) return;
        props.addFavorite(item);
    }

    return (
        <Modal
            className="modal"
            overlayClassName="modal-overlay"
            isOpen={props.isOpen}
            onRequestClose={props.closeModal}
        >
            <div className="favorite-confirm-modal-content">
                <div className="favorite-confirm-modal-content__list">
                    <h3>List</h3>
                    <FavoriteChoiceForm favorites={props.favorites} onSubmit={onChoiceSubmit} />
                </div>
                <div className="favorite-confirm-modal-content__new-list">
                    <h3>New List</h3>
                    <FavoriteAddForm onSubmit={onAddSubmit} />
                </div>
            </div>
        </Modal>
    );
};


