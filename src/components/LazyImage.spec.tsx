import React from "react";
import { render } from '@testing-library/react';
import { LazyImage } from "./LazyImage";

describe("components/LazyImage", () => {
    it("check props", () => {
        const wrapper = render(<LazyImage src="src" alt="alt" />);
        const img = wrapper.getByRole("img");
        expect(img.getAttribute("src")).toBe("src");
        expect(img.getAttribute("alt")).toBe("alt");
    });
});