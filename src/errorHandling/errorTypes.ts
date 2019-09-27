import ErrorObjectInterface from './errorObjectInterface'

/* Client-side Errors */
export class Error400 extends Error implements ErrorObjectInterface {
    status      = 400;
    title       = "Bad Request";
    message     = "A validation failed";
    userMessage = "An error has ocurred";
}

export class Error401 extends Error implements ErrorObjectInterface {
    status      = 401;
    title       = "Unauthorized";
    message     = "Not authenticated";
    userMessage = "Client needs to authenticate";
}

export class Error403 extends Error implements ErrorObjectInterface {
    status      = 403;
    title       = "Forbidden";
    message     = "Cannot Access";
    userMessage = "Client cannot access this resource";
}

/* Server-side Errors */
export class Error500 extends Error implements ErrorObjectInterface {
    status      = 500;
    title       = "Internal Server Error";
    message     = "An error has ocurred";
    userMessage = "An error has ocurred";
}