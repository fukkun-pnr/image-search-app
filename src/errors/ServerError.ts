export class ServerError extends Error {
    path: string;

    errors: { [key: string]: string };

    constructor(path: string, data: Object, errors: { [key: string]: string }) {
        super(`SERVER ERROR ${path} data: ${JSON.stringify(data)}`);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ServerError);
        }

        this.name = 'ServerError';
        this.path = path;
        this.errors = errors;
    }
}