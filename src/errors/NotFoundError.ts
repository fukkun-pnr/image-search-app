export class NotFoundError extends Error {
    path: string;

    errors: { [key: string]: string };

    constructor(path: string, data: Object, errors: { [key: string]: string }) {
        super(`NOT FOUND ${path} data: ${JSON.stringify(data)}`);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, NotFoundError);
        }

        this.name = 'NotFoundError';
        this.path = path;
        this.errors = errors;
    }
}