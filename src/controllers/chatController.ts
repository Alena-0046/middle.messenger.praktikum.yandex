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
}
export default new ChatController()
