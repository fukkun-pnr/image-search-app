import React from "react";
import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchInput } from "./SearchInput";

describe("pages/Search/SearchInput", () => {
    it("props", () => {
        const wrapper = render(<SearchInput word="test" changeInput={jest.fn()} />);

        const input = wrapper.getByRole("textbox");
        expect(input).not.toBeNull();
        expect(input.getAttribute("value")).toBe("test");
    });

    it("change event", () => {
        const changeInputMock = jest.fn();
        const wrapper = render(<SearchInput word="" changeInput={changeInputMock} />);

        const input = wrapper.getByRole("textbox");
        expect(input.getAttribute("value")).toBe("");

        act(() => {
            userEvent.type(input, "test");
        });

        expect(changeInputMock).toBeCalledWith("test");
    });
});