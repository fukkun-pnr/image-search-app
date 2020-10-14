import fetchMock from "jest-fetch-mock";
import { act, renderHook } from '@testing-library/react-hooks';
import { useFetch } from "./fetch";

describe("hooks/fetch", () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it("check loading", async () => {
        fetchMock.mockResponseOnce(JSON.stringify({}));
        const { result } = renderHook(() => useFetch());
        expect(result.current.loading).toBe(false);

        let promise: Promise<any>;
        act(() => {
            promise = result.current.get<any>("");
        });
        expect(result.current.loading).toBe(true);
        await act(async () => {
            await promise;
        });
        expect(result.current.loading).toBe(false);
    });

    it("get", async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ test: "testVal" }));
        const { result } = renderHook(() => useFetch());

        let res: any;
        await act(async () => {
            res = await result.current.get("hoge", { "key1": "test" }, { "hKey": "hVal" });
        });
        expect(fetchMock.mock.calls[0][0]).toBe("hoge?key1=test");
        expect(fetchMock.mock.calls[0][1]?.body).toBeNull();
        expect(fetchMock.mock.calls[0][1]?.headers).toStrictEqual({
            "Content-Type": "application/json",
            "hKey": "hVal",
        });
        expect(fetchMock.mock.calls[0][1]?.method).toBe("GET");
        expect(fetchMock.mock.calls[0][1]?.mode).toBe("cors");
        expect(res).toStrictEqual({ "test": "testVal" });
    });

    it("post", async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ test: "testVal" }));
        const { result } = renderHook(() => useFetch());
        let res: any;
        await act(async () => {
            res = await result.current.post("hoge", { "key1": "test" }, { "hKey": "hVal" });
        });
        expect(fetchMock.mock.calls[0][0]).toBe("hoge");
        expect(fetchMock.mock.calls[0][1]?.body).toStrictEqual(JSON.stringify({ "key1": "test" }));
        expect(fetchMock.mock.calls[0][1]?.headers).toStrictEqual({
            "Content-Type": "application/json",
            "hKey": "hVal",
        });
        expect(fetchMock.mock.calls[0][1]?.method).toBe("POST");
        expect(fetchMock.mock.calls[0][1]?.mode).toBe("cors");
        expect(res).toStrictEqual({ "test": "testVal" });
    });
});