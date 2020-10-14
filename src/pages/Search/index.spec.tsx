import React from "react";
import Search from ".";
import { render } from "@testing-library/react";
import * as searchHook from "app/src/hooks/search";
import photoMock from "app/src/tests/fixtures/photo.json";

jest.mock("app/src/pages/Search/SearchResult", () => ({
    SearchResult: (props: any) => <div {...props} data-testid="search-result" />
}));

jest.mock("app/src/components/Indicator", () => ({
    Indicator: (props: any) => <div {...props} data-testid="indicator" />
}));

describe("pages/Search", () => {
    it("loading", () => {
        jest.spyOn(searchHook, "useSearch").mockReturnValueOnce({
            loading: true,
            word: "loading",
            searchResult: null,
            setWord: jest.fn(),
            error: undefined
        });
        const wrapper = render(<div id="root"><Search /></div>);
        expect(wrapper.getByRole("textbox").getAttribute("value")).toBe("loading");
        expect(wrapper.queryByTestId("search-result")).toBeNull();
        expect(wrapper.getByTestId("indicator")).toBeInTheDocument();
        expect(wrapper.queryByRole("alert")).toBeNull();
    });

    it("search result", () => {
        jest.spyOn(searchHook, "useSearch").mockReturnValueOnce({
            loading: false,
            word: "search result",
            searchResult: photoMock,
            setWord: jest.fn(),
            error: undefined
        });
        const wrapper = render(<div id="root"><Search /></div>);
        expect(wrapper.getByRole("textbox").getAttribute("value")).toBe("search result");
        expect(wrapper.getByTestId("search-result")).toBeInTheDocument();
        expect(wrapper.queryByTestId("indicator")).toBeNull();
        expect(wrapper.queryByRole("alert")).toBeNull();
    });

    it("error", () => {
        jest.spyOn(searchHook, "useSearch").mockReturnValueOnce({
            loading: false,
            word: "",
            searchResult: null,
            setWord: jest.fn(),
            error: new Error("fail!")
        });
        const wrapper = render(<div id="root"><Search /></div>);
        expect(wrapper.getByRole("textbox").getAttribute("value")).toBe("");
        expect(wrapper.queryByTestId("search-result")).toBeNull();
        expect(wrapper.queryByTestId("indicator")).toBeNull();
        expect(wrapper.getByRole("alert").textContent).toBe("fail!");
    });
});