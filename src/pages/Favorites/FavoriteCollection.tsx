import React, { useCallback } from "react";
import { FavoriteItem } from "app/src/components/FavoriteItem";
import { FavoriteEditInfoForm } from "app/src/pages/Favorites/FavoriteEditInfoForm";
import { useToggle } from "app/src/hooks/toggle";

type Props = {
    data: App.Favorite;
    onDownload: (data: Unsplash.Photo) => void;
    onSubmit: (data: App.Favorite) => void;
}

export const FavoriteCollection: React.FC<Props> = React.memo((props: Props) => {
    const { isOpen: editable, toggle } = useToggle();

    const onSubmit = useCallback((data: App.FavoriteInputData) => {
        props.onSubmit({
            ...props.data,
            ...data
        });
        toggle();
    }, [props, toggle]);

    return (
        <div className="favorite-collection">
            <div className="favorite-collection__info-wrapper">
                <div className="favorite-collection__info-wrapper__contents">
                    {
                        editable ?
                            <FavoriteEditInfoForm favorite={props.data} onSubmit={onSubmit} /> :
                            (<>
                                <h4 className="favorite-collection__info-wrapper__contents__title">{props.data.title}</h4>
                                <p className="favorite-collection__info-wrapper__contents__description">{props.data.description}</p>
                            </>)
                    }
                </div>
                <div className="favorite-collection__info-wrapper__controll">
                    <button onClick={toggle}>{editable ? "Cancel" : "Edit"}</button>
                </div>
            </div>
            <ul data-testid="favorite-collection__list" className="favorite-collection__list-wrapper">
                {props.data.photos.map((photo, idx) => (
                    <li className="favorite-collection__list-wrapper__list-item" key={idx}><FavoriteItem data={photo} onDownload={props.onDownload} /></li>
                ))}
            </ul>
        </div >
    );
});