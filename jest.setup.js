require('jest-fetch-mock').enableMocks();
require("@testing-library/jest-dom");
require('mutationobserver-shim');

window.IntersectionObserver = jest.fn(() => ({
    observe: jest.fn(),
    unobserve: jest.fn()
}))