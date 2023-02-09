enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Options = {
  method: string
  headers?: Record<string, string>
  data?: any
}

function queryStringify (data: any): string {
  if (typeof data !== 'object') {
    throw new Error('Data must be object')
  }

  let result = ''
  for (const key of Object.keys(data)) {
    const value: string = data[key]
    result = result + key + '=' + value + '&'
  }
  if (result.length > 0) {
    result = '?' + result.slice(0, -1)
  }
  return result
}

export class HTTPTransport {
  async get (url: string, options: Options = { method: METHOD.GET }): Promise<XMLHTTPRequest> {
    return await this.request(url, { ...options, method: METHODS.GET }, options.timeout)
  }

  async post (url: string, options: Options = { method: METHOD.POST }): Promise<XMLHTTPRequest> {
    return await this.request(url, { ...options, method: METHODS.POST }, options.timeout)
  }

  async put (url: string, options: Options = { method: METHOD.PUT }): Promise<XMLHTTPRequest> {
    return await this.request(url, { ...options, method: METHODS.PUT }, options.timeout)
  }

  async delete (url: string, options: Options = { method: METHOD.DELETE }): Promise<XMLHTTPRequest> {
    return await this.request(url, { ...options, method: METHODS.DELETE }, options.timeout)
  }

  async request (url: string, options: Options = { method: METHOD.DELETE }, timeout: number = 5000): Promise<XMLHTTPRequest> {
    const { method, headers = {}, data } = options

    return new Promise(function (resolve, reject) {
      if (method === null) {
        reject(new Error('No method'))
        return
      }

      const xhr = new XMLHttpRequest()
      const isGet: boolean = method === METHODS.GET

      xhr.open(method, isGet && !(data == null) ? `${url}${queryStringify(data)}` : url)

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key])
      })

      xhr.onload = function () {
        resolve(xhr)
      }

      xhr.onabort = reject
      xhr.onerror = reject
      xhr.timeout = timeout
      xhr.ontimeout = reject

      if (isGet || (data == null)) {
        xhr.send()
      } else {
        xhr.send(data)
      }
    })
  }
}
