import React from "react";
import { render } from '@testing-library/react';
import { UserInfo } from "./UserInfo";

import userMock from "app/src/tests/fixtures/user.json";

describe("components/UserInfo", () => {
    it("check props", () => {
        const wrapper = render(<UserInfo user={userMock} />);
        expect(wrapper.getAllByRole("generic")[1].className).toBe("user-info");
        expect(wrapper.getByRole("link").getAttribute("href")).toBe(userMock.links.html);
        expect(wrapper.getByRole("img").getAttribute("src")).toBe(userMock.profile_image.small);
    });

    it("add className", () => {
        const wrapper = render(<UserInfo user={userMock} className="test" />);
        expect(wrapper.getAllByRole("generic")[1].className).toBe("user-info test");
    });
});