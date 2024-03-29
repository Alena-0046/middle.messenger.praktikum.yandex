import chatAPI from '../api/chatAPI'
import store from '../core/store'

class ChatController {
  public getChats (): void {
    chatAPI.getChats()
      .then((xhr) => {
        const chats = JSON.parse(xhr.response)
        // console.log('Get chats')
        if (chats != null) {
          // console.log('Get chats ' + chats.length)
          if (chats.length > 0 && store.getState().activeChat === null) {
            store.set('activeChat', chats[0].id)
          } else if (chats.length === 0) {
            store.set('activeChat', null)
          }
          store.set('chats', chats)
          console.log('OK')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  public createChat (title: string): void {
    chatAPI.create(title)
      .then((xhr) => {
        console.log(xhr)
        this.getChats()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  public deleteChat (id: number): void {
    console.log('chatController - deleteChat')
    chatAPI.delete(id)
      .then((xhr) => {
        console.log(xhr)
        store.set('activeChat', null)
        this.getChats()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  public addUserToChat (id: number, userId: number): void {
    chatAPI.addUsers(id, [userId])
      .then((xhr) => {
        console.log(xhr)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  public deleteUserFromChat (id: number, userId: number): void {
    chatAPI.deleteUsers(id, [userId])
      .then((xhr) => {
        console.log(xhr)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
export default new ChatController()
