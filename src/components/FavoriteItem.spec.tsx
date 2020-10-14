import React from "react";
import { render, act } from '@testing-library/react';
import { FavoriteItem } from "./FavoriteItem";

import photoMock from "app/src/tests/fixtures/photo.json";
import userEvent from "@testing-library/user-event";
import { LazyImage } from "app/src/components/LazyImage";

jest.mock("app/src/components/LazyImage");

describe("components/FavoriteItem", () => {
    it("check props", () => {
        const wrapper = render(<FavoriteItem data={photoMock} onDownload={jest.fn} />);
        expect(wrapper.getByTestId("lazy-image")).toBeInTheDocument();
        expect(LazyImage).toBeCalledWith({
            src: photoMock.urls.thumb
        }, {});
    });

    it("click download button", () => {
        const onDownload = jest.fn();
        const wrapper = render(<FavoriteItem data={photoMock} onDownload={onDownload} />);

        act(() => {
            userEvent.click(wrapper.getByRole("button"));
        });

        expect(onDownload).toBeCalledWith(photoMock);
    })
});