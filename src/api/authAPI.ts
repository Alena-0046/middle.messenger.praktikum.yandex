import HTTPTransport from './HTTPTransport'

export type SigninData = {
  login: string
  password: string
}

export type SignupData = {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

class AuthAPI {
  public static readonly url: string = 'https://ya-praktikum.tech/api/v2/auth'
  private readonly http: HTTPTransport

  constructor () {
    this.http = new HTTPTransport(AuthAPI.url)
  }

  async signup (data: SignupData): Promise<XMLHttpRequest> {
    console.log('authAPI - signup - data: ' + JSON.stringify(data))
    return await this.http.post('/signup', { data, headers: { 'Content-Type': 'application/json' } })
  }

  async getUser (): Promise<XMLHttpRequest> {
    return await this.http.get('/user')
  }

  async signin (data: SigninData): Promise<XMLHttpRequest> {
    return await this.http.post('/signin', { data, headers: { 'Content-Type': 'application/json' } })
  }

  async logout (): Promise<XMLHttpRequest> {
    return await this.http.post('/logout')
  }
}
export default new AuthAPI()
