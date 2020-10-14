import React from "react";
import { act, render, screen } from '@testing-library/react';
import { FavoriteAddForm } from "./FavoriteAddForm";
import userEvent from "@testing-library/user-event";


describe("pages/Search/FavoriteAddForm", () => {
    let onSubmit: jest.Mock;
    let title: HTMLInputElement;
    let description: HTMLInputElement;
    beforeEach(() => {
        onSubmit = jest.fn();
        render(<FavoriteAddForm onSubmit={onSubmit} />);

        title = screen.getAllByRole("textbox")[0] as HTMLInputElement;
        description = screen.getAllByRole("textbox")[1] as HTMLInputElement;
    });

    it("required title and description", async () => {
        act(() => {
            userEvent.click(screen.getByRole("button"));
        });
        expect(await screen.findAllByRole("alert")).toHaveLength(2);
        expect(onSubmit).not.toBeCalled();
    });

    it("invalid title for minLength", async () => {
        description.value = "aaaa";
        act(() => {
            userEvent.type(title, "h");
            userEvent.click(screen.getByRole("button"));
        });
        expect(await screen.findAllByRole("alert")).toHaveLength(1);
    });

    it("invalid title for maxLength", async () => {
        description.value = "aaaa";
        act(() => {
            userEvent.type(title, 'a'.repeat(31));
            userEvent.click(screen.getByRole("button"));
        });
        expect(await screen.findAllByRole("alert")).toHaveLength(1);
    });

    it("invalid description for minLength", async () => {
        title.value = "aaaa";
        act(() => {
            userEvent.type(description, "h");
            userEvent.click(screen.getByRole("button"));
        });
        expect(await screen.findAllByRole("alert")).toHaveLength(1);
    });

    it("invalid description for maxLength", async () => {
        title.value = "aaaa";
        act(() => {
            userEvent.type(description, 'a'.repeat(129));
            userEvent.click(screen.getByRole("button"));
        });
        expect(await screen.findAllByRole("alert")).toHaveLength(1);
    });

    it("valid ", async () => {
        await act(async () => {
            userEvent.type(title, 'a'.repeat(30));
            userEvent.type(description, 'a'.repeat(128));
            userEvent.click(screen.getByRole("button"));
            expect(await screen.queryAllByRole("alert")).toHaveLength(0);
        });
        expect(onSubmit.mock.calls[0][0]).toStrictEqual({
            title: 'a'.repeat(30),
            description: 'a'.repeat(128),
        });
    });
});