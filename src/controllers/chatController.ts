import chatAPI from '../api/chatAPI'
import store from '../core/store'

class ChatController {
  public getChats (): void {
    chatAPI.getChats()
      .then((xhr) => {
        const chats = JSON.parse(xhr.response)
        console.log('Get chats')
        if (chats != null && chats.length > 0) {
          if(store.getState().activeChat === null) {
            store.set('activeChat', chats[0].id)
          }

          /* chatAPI.getToken(id)
              .then((xhr) => {
                store.set('token', JSON.parse(xhr.response).token)
              })
              .catch((error) => {
                console.log(error)
              })*/

          store.set('chats', chats)
          console.log('OK')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
  public createChat(title: string): void {
    chatAPI.create(title)
      .then((xhr) => {
        console.log(xhr)
        this.getChats()
      })
      .catch((error) => {
        console.log(error)
      })
  }
  public deleteChat(id: number): void {
    console.log('chatController - deleteChat')
    chatAPI.delete(id)
    .then((xhr) => {
      console.log(xhr)
      this.getChats()
    })
    .catch((error) => {
      console.log(error)
    })
  }

  public addUserToChat(id: number, userId: number) {
    chatAPI.addUsers(id, [userId])
    .then((xhr) => {
      console.log(xhr)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  public deleteUserFromChat(id: number, userId: number) {
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
