import { useCallback, useState } from "react";

export const useFetch = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error>();

    const _fetch = useCallback(async<T>(url: string, method: string, data: Object | null = null, header: { [key: string]: string }) => {
        const abortController = new AbortController(); // cleanupでabortするため
        const timeout = setTimeout(() => { abortController.abort() }, 10000);

        setError(undefined);
        setLoading(true);
        try {
            const response = await fetch(url, {
                headers: {
                    ...header,
                    'Content-Type': 'application/json',
                },
                mode: 'cors',
                method: method,
                signal: abortController.signal,
                body: method === "POST" ? JSON.stringify(data) : null,
            });
            setLoading(false);

            if (!response.ok) {
                const err = new Error(`Fetch failed: ${response.statusText}`);
                setError(err);
                return Promise.reject(err);
            }

            return await response.json() as T;
        } catch (e) {
            setLoading(false);
            setError(e);
            return Promise.reject(new Error(`Fetch failed: ${e}`));
        } finally {
            clearTimeout(timeout);
        }
    }, []);

    const makeUrlParameter = (data: { [key: string]: number | string }) => {
        if (!data) return "";
        return "?" + Object.keys(data).map((k) => k + "=" + data[k].toString()).join("&");
    }

    const get = useCallback(<Res>(url: string, data: { [key: string]: number | string } = {}, header: { [key: string]: string } = {}) => _fetch<Res>(url + makeUrlParameter(data), "GET", null, header), [_fetch]);
    const post = useCallback(<Req, Res>(url: string, data: Req, header: { [key: string]: string } = {}) => _fetch<Res>(url, "POST", data, header), [_fetch]);

    return {
        loading,
        error,
        get,
        post
    };
}