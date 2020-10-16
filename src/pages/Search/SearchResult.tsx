import React, { useCallback } from "react";
import { FavoriteConfirmModal } from 'app/src/pages/Search/FavoriteConfirmModal';
import { useModal } from "app/src/hooks/modal";
import { useFavorite } from "app/src/hooks/favorite";
import { UserInfo } from "app/src/components/UserInfo";
import { download } from "app/src/utils";

type Props = {
    photo: Unsplash.Photo;
}

export const SearchResult = React.memo((props: Props) => {
    const { isOpen, closeModal, openModal } = useModal();
    const { favorites, addFavorite } = useFavorite();

    const onDownload = useCallback(() => {
        download(props.photo.urls.regular, `${props.photo.id}.jpg`);
    }, [props.photo.urls.regular, props.photo.id]);

    const onAddFavorite = useCallback((favorite: App.Favorite) => {
        addFavorite(favorite, props.photo);
        closeModal();
    }, [addFavorite, closeModal, props.photo]);

    return (
        <div
            className="search-result"
            style={{
                backgroundImage: `url(${props.photo.urls.small})`,
                width: 400,
                height: props.photo.height * 400 / props.photo.width
            }}>
            <div className="search-result-controll">
                <button onClick={onDownload}>download</button>
                <button onClick={openModal}>save</button>
            </div>
            <UserInfo user={props.photo.user} />
            <FavoriteConfirmModal
                favorites={favorites}
                addFavorite={onAddFavorite}
                isOpen={isOpen}
                closeModal={closeModal}
            />
        </div >
    );
});

