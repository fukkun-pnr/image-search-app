import React from "react";
import MainLayout from "./MainLayout";
import { render } from "@testing-library/react";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    Link: () => <link data-testid="link" />
}));

describe("pages/MainLayout", () => {
    it("default", () => {
        const wrapper = render(<MainLayout />);
        expect(wrapper.getAllByTestId("link")).toHaveLength(2);
        expect(wrapper.getByRole("main")).toBeInTheDocument();
    });
});