import { useObservable } from "rxjs-hooks";
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { useState } from "react";
import { useUnsplash } from "./unsplash";

export const useSearch = (initialWord: string = "") => {
    const { loading, search, error } = useUnsplash();
    const [word, setWord] = useState<string>(initialWord);

    const searchResult = useObservable<Unsplash.Photo | null, string[]>((_, word$) => word$.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter((word) => word[0]?.length > 1),
        switchMap((word) => search(word[0])),
        map((result) => result)
    ), null, [word]);

    return {
        error,
        loading,
        word,
        setWord,
        searchResult
    };
};