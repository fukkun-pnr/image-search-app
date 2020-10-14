import clonedeep from "lodash.clonedeep";
import { v4 as uuidv4 } from 'uuid';

import { favoritesState } from "app/src/atoms/favorites";
import { useRecoilState } from "recoil";

export const useFavorite = () => {
    const [favorites, setFavorites] = useRecoilState(favoritesState);

    const addFavorite = (favorite: App.Favorite, photo: Unsplash.Photo) => {
        const state = clonedeep(favorites);
        const idx = state.findIndex((e) => e.id === favorite.id);
        if (idx < 0) {
            favorite.id = uuidv4();
            favorite.photos = [photo];
            state.push(favorite);
        }
        else {
            state[idx].photos.push(photo);
        }
        setFavorites(state);
    };

    const updateFavorite = (favorite: App.Favorite) => {
        const state = clonedeep(favorites);
        const idx = state.findIndex((e) => e.id === favorite.id);
        if (idx < 0) return;
        state[idx] = favorite;
        setFavorites(state);
    };

    return {
        favorites,
        addFavorite,
        updateFavorite
    };
};