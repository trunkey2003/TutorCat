class AppError extends Error {
    constructor(statusCode, msg) {
        super();

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AppError);
        }

        this.message = msg;
        this.statusCode = statusCode;
    }
}

module.exports = { AppError };
