export const download = (url: string, name: string) => {
    const elm = document.createElement("a");
    const file = new Blob(
        [url],
        { type: "image/*" }
    );
    elm.href = URL.createObjectURL(file);
    elm.download = name;
    elm.click();
};