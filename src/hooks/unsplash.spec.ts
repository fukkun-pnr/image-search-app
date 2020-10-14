import { act, renderHook } from '@testing-library/react-hooks';
import { useUnsplash } from "./unsplash";
import * as fetchHook from "./fetch";
import { unsplash } from "app/src/configs/config";

describe("hooks/search", () => {
    it("get", async () => {
        const getMock = jest.fn();
        jest.spyOn(fetchHook, "useFetch").mockReturnValueOnce({
            loading: false,
            error: undefined,
            get: getMock,
            post: jest.fn(),
        });

        getMock.mockResolvedValueOnce({ test: "testValue" });

        const { result } = renderHook(() => useUnsplash());

        let res: any;
        await act(async () => {
            res = await result.current.search("word");
        });

        expect(getMock).toBeCalledWith(
            unsplash.domain + "photos/random",
            {
                orientation: "portrait",
                query: "word"
            },
            {
                Authorization: `Client-ID ${unsplash.apiKey}`,
            }
        );

        expect(res).toStrictEqual({ test: "testValue" });
    });

});