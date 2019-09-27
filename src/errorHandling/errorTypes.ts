/* Client-side Errors */ 
export function error400() {
  return {
    status      : 400,
    title       : 'Bad Request',
    message     : 'A validation failed',
    userMessage : 'An error has ocurred',
  }
}

export function error401() {
  return {
    status      : 401,
    title       : 'Unauthorized',
    message     : 'Not authenticated',
    userMessage : 'Client needs to authenticate',
  }
}

export function error403() {
  return {
    status      : 403,
    title       : 'Forbidden',
    message     : 'Cannot Access',
    userMessage : 'Client cannot access this resource',
  }
}

/* Server-side Errors */
export function error500() {
  return {
    status      : 500,
    title       : 'Internal Server Error',
    message     : 'An error has ocurred',
    userMessage : 'An error has ocurred',
  }
}

export function invalidError() {
  return {
    status      : -1,
    title       : 'Invalid Error Code',
    message     : 'Invalid error code',
    userMessage : 'Invalid error code',
  }
}