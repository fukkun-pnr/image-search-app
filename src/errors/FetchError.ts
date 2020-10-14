export class FetchError extends Error {
    path: string;

    errors: { [key: string]: string };

    constructor(path: string, data: Object, errors: { [key: string]: string }) {
        super(`FETCH ERROR ${path} data: ${JSON.stringify(data)}`);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, FetchError);
        }

        this.name = 'FetchError';
        this.path = path;
        this.errors = errors;
    }
}