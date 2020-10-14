import { useFetch } from "./fetch";
import { unsplash } from "app/src/configs/config";

export const useUnsplash = () => {
    const { loading, error, get } = useFetch();

    const search = async (words: string, page: number = 1): Promise<Unsplash.Photo | null> => {
        const res = await get<Unsplash.SearchRandomResponse>(unsplash.domain + "photos/random", {
            query: encodeURIComponent(words),
            orientation: "portrait",
        }, { "Authorization": `Client-ID ${unsplash.apiKey}` }).catch((e) => {

        });

        return res || null;
    }

    return {
        error,
        search,
        loading,
    }
};