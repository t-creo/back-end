import * as ErrorTypes from './errorTypes'

export default function errorHandler(errorType : string) {

  switch(errorType) {
  case '400': { return ErrorTypes.error400() }
  case '401': { return ErrorTypes.error401() }
  case '403': { return ErrorTypes.error403() }
  case '500': { return ErrorTypes.error500() }
  default   : { return ErrorTypes.invalidError() }
  }

}