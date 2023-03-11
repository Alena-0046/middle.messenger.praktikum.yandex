import BaseAPI from './baseAPI'

export default class ChatAPI extends BaseAPI {
  constructor () {
    super('https://ya-praktikum.tech/api/v2/chats')
  }

  async getChats (offset: number = 0, limit: number = 10, titleToFilter: string = ''): Promise<XMLHTTPRequest> {
    return await this.http.get('', { data: {}, headers: { 'Content-Type': 'application/json' } })
  }

  async addUsers (chatId: number, userIds: number[]): Promise<XMLHTTPRequest> {
    return await this.http.put('/users', { data: { chatId, users: userIds }, headers: { 'Content-Type': 'application/json' } })
  }

  async getUsers (id: number, limit: number = 10, offset: number = 0, nameToFilter: string = '', emailToFilter: string = ''): Promise<XMLHTTPRequest> {
    return await this.http.get(`/${id}/users`, { data: {}, headers: { 'Content-Type': 'application/json' } })
  }

  async deleteUsers (chatId: number, userIds: number[]): Promise<XMLHTTPRequest> {
    return await this.http.delete('/users', { data: { chatId, users: userIds }, headers: { 'Content-Type': 'application/json' } })
  }

  async create (title: string): Promise<XMLHTTPRequest> {
    return await this.http.post('/', { data: { title }, headers: { 'Content-Type': 'application/json' } })
  }

  async delete (id: number): Promise<XMLHTTPRequest> {
    return await this.http.delete('/', { data: { chatId: id }, headers: { 'Content-Type': 'application/json' } })
  }

  /* request (): Promise<XMLHTTPRequest> {
    return chatAPIInstance.get('/full')
  }*/
}
