import userAPI from '../api/userAPI'

class UserController {
  public changeAvatar (data: FormData): void {
    console.log('UserController - change avatar')
    userAPI.changeAvatar(data)
      .then((xhr) => {
        console.log('OK')
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
export default new UserController()
