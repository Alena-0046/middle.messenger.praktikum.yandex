import BaseAPI from './baseAPI'

export type changePasswordData = {
  oldPassword: string
  newPassword: string
}

export type ChangeProfileData = {
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
}

export default class UserAPI extends BaseAPI {
  constructor () {
    super('https://ya-praktikum.tech/api/v2/user')
  }

  async changeAvatar (data: FormData): Promise<XMLHTTPRequest> {
    return await this.http.put('/profile/avatar', { data })
  }

  async changeProfile (data: ChangeProfileData): Promise<XMLHTTPRequest> {
    return await this.http.put('/profile', { data, headers: { 'Content-Type': 'application/json' } })
  }

  async changePassword (data: ChangePasswordData): Promise<XMLHTTPRequest> {
    return await this.http.put('/password', { data, headers: { 'Content-Type': 'application/json' } })
  }

  async getUserById (id: number): Promise<XMLHTTPRequest> {
    return await this.http.get(`/${id}`)
  }

  async searchUserByLogin (login: string): Promise<XMLHTTPRequest> {
    return await this.http.post('/search', { data: { login }, headers: { 'Content-Type': 'application/json' } })
  }
}
