import { atom } from "recoil";

export const favoritesState = atom<App.FavoriteCollection>({
    key: 'favoritesState', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});