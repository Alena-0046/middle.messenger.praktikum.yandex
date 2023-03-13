import userAPI from '../api/userAPI'
import store from '../core/store'

class UserController {
  public changeAvatar (data: FormData): void {
    console.log('UserController - change avatar')
    userAPI.changeAvatar(data)
      .then((xhr) => {
        const parsed = JSON.parse(xhr.response)
        store.set('user', parsed)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
export default new UserController()
