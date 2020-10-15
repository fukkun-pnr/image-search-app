import React from "react";
import { render } from '@testing-library/react';
import { Indicator } from "./Indicator";

describe("components/Indicator", () => {
    it("check props", () => {
        const wrapper = render(<Indicator size={100} />);
        const indicator = wrapper.getAllByRole("generic")[1];
        expect(indicator).not.toBeNull();
        expect(indicator.getAttribute("style")).toBe("width: 100px; height: 100px;");
    });

    it("change size", () => {
        const wrapper = render(<Indicator size={200} />);
        const indicator = wrapper.getAllByRole("generic")[1];
        expect(indicator.getAttribute("style")).toBe("width: 200px; height: 200px;");
    });
});