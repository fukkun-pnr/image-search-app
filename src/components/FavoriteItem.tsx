import React from "react";
import { LazyImage } from "./LazyImage";

type Props = {
    data: Unsplash.Photo;
    onDownload: (data: Unsplash.Photo) => void;
}

export const FavoriteItem = React.memo((props: Props) => {
    return (
        <div className="favorite-item">
            <div className="favorite-item__img-wrapper">
                <div className="favorite-item__img-wrapper__controll"><button onClick={() => props.onDownload(props.data)}>download</button></div>
                <LazyImage src={props.data.urls.thumb} />
            </div>
        </div>
    );
});