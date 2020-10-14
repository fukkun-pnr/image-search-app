import { download } from "./utils";

describe("utils", () => {
    it("download", () => {
        const createObjectURLMock = jest.fn();
        global.URL.createObjectURL = createObjectURLMock;
        download("url", "name");

        expect(createObjectURLMock).toBeCalledWith(new Blob());
    });
});