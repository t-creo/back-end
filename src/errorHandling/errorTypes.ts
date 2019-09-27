import ErrorObjectInterface from './errorObjectInterface'

/* Client-side Errors */
export class Error400 extends Error implements ErrorObjectInterface {}

export class Error401 extends Error implements ErrorObjectInterface {}

export class Error403 extends Error implements ErrorObjectInterface {}

/* Server-side Errors */
export class Error500 extends Error implements ErrorObjectInterface {}