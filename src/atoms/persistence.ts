import { MutableSnapshot, useRecoilTransactionObserver_UNSTABLE } from "recoil";
import { favoritesState } from "./favorites";


export const initializeState = (snapshot: MutableSnapshot) => {
    const value = localStorage.getItem(favoritesState.key);
    if (value) {
        snapshot.set(favoritesState, JSON.parse(value).value);
    }
}

export const PersistenceObserver = () => {
    useRecoilTransactionObserver_UNSTABLE(({ snapshot }) => {
        const loadable = snapshot.getLoadable(favoritesState);
        if (loadable.state === 'hasValue') {
            localStorage.setItem(
                favoritesState.key,
                JSON.stringify({ value: loadable.contents }),
            );
        }
    });
    return null;
}