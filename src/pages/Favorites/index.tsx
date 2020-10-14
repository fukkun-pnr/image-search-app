import React, { useCallback } from "react";
import { FavoriteCollection } from "app/src/pages/Favorites/FavoriteCollection";
import { useFavorite } from "app/src/hooks/favorite";
import { download } from "app/src/utils";

export default () => {
    const { favorites, updateFavorite } = useFavorite();

    const onDownload = useCallback((data: Unsplash.Photo) => {
        download(data.urls.regular, `${data.id}.jpg`);
    }, []);

    const onSubmit = useCallback((data: App.Favorite) => {
        updateFavorite(data);
    }, [updateFavorite]);

    return (
        <div className="favorites-page">
            <ul>
                {favorites.map((item, idx) => (
                    <li key={idx}>
                        <FavoriteCollection data={item} onDownload={onDownload} onSubmit={onSubmit} />
                    </li>
                ))}
            </ul>
        </div>
    );
};