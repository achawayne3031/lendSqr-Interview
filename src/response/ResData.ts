

export const ResponseData = (
    status: string,
    success: boolean,
    message: string,
    data: any,
    token: string,
    debug: any
  ) => {
    return { status: status, success: success, message: message, data: data, token: token, debug: debug }
  }
  
  