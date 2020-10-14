import { useSearch } from "./search";
import { act, renderHook } from '@testing-library/react-hooks';
import * as unsplashHook from "./unsplash";

import photoMock from "app/src/tests/fixtures/photo.json";

describe("hooks/search", () => {
    beforeAll(() => {
        jest.useFakeTimers()
    })
    afterAll(() => {
        jest.useRealTimers()
    })
    it("useSearch", async () => {
        const searchMock = jest.fn();
        jest.spyOn(unsplashHook, "useUnsplash").mockReturnValue({
            loading: false,
            error: undefined,
            search: searchMock,
        });
        searchMock.mockResolvedValue(photoMock);
        const { result } = renderHook(() => useSearch());

        act(() => {
            result.current.setWord("hoge");
        });

        await act(async () => {
            jest.advanceTimersByTime(400);
        });
        expect(searchMock).not.toBeCalled();

        await act(async () => {
            jest.advanceTimersByTime(200);
        });
        expect(searchMock).toBeCalledWith("hoge");
    });
});