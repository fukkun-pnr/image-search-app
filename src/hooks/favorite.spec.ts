import { renderHook } from '@testing-library/react-hooks';
import { useFavorite } from "./favorite";
import * as recoil from "recoil";
import photoMock from "app/src/tests/fixtures/photo.json";

jest.mock("uuid", () => ({
    ...jest.requireActual("uuid"),
    v4: () => "v4",
}));
describe("hooks/fetch", () => {
    it("addFavorite for have id", () => {
        const setFavoritesMock = jest.fn();
        jest.spyOn(recoil, "useRecoilState").mockReturnValue([
            [],
            setFavoritesMock,
        ])
        const favorite = { title: "hoge", description: "hoge", photos: [] };
        const { result } = renderHook(() => useFavorite());
        result.current.addFavorite(favorite, photoMock);
        expect(setFavoritesMock).toBeCalledWith([{
            ...favorite,
            photos: [photoMock],
        }]);
    })

    it("addFavorite for not id", () => {
        const favorite = { id: "1", title: "hoge", description: "hoge", photos: [] };
        const setFavoritesMock = jest.fn();
        jest.spyOn(recoil, "useRecoilState").mockReturnValue([
            [favorite],
            setFavoritesMock,
        ])
        const { result } = renderHook(() => useFavorite());
        result.current.addFavorite({ id: "2", title: "hoge", description: "hoge", photos: [] }, photoMock);
        expect(setFavoritesMock.mock.calls[0][0][0]).toStrictEqual(favorite);
        expect(setFavoritesMock.mock.calls[0][0][1]["id"]).toStrictEqual("v4");
    })

    it("setFavorite", () => {
        const favorite = { id: "1", title: "hoge", description: "hoge", photos: [] };
        const setFavoritesMock = jest.fn();
        jest.spyOn(recoil, "useRecoilState").mockReturnValue([
            [favorite],
            setFavoritesMock,
        ]);
        const { result } = renderHook(() => useFavorite());
        const newFavorite = { id: "1", title: "hoge2", description: "hoge2", photos: [] };
        result.current.updateFavorite(newFavorite);
        expect(setFavoritesMock.mock.calls[0][0][0]).toStrictEqual(newFavorite);
    });

    it("setFavorite for not id", () => {
        const favorite = { id: "1", title: "hoge", description: "hoge", photos: [] };
        const setFavoritesMock = jest.fn();
        jest.spyOn(recoil, "useRecoilState").mockReturnValue([
            [favorite],
            setFavoritesMock,
        ]);
        const { result } = renderHook(() => useFavorite());
        const newFavorite = { id: "2", title: "hoge2", description: "hoge2", photos: [] };
        result.current.updateFavorite(newFavorite);
        expect(setFavoritesMock).not.toBeCalled();
    });
});