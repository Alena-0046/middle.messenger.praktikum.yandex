import authAPI, { type SigninData, type SignupData } from '../api/authAPI'
import Router from '../core/router'
import store from '../core/store'

class AuthController {
  private readonly router: Router

  constructor () {
    this.router = new Router('.app')
  }

  public logout (): void {
    console.log('logout')
    authAPI.logout()
      .then(() => {
        this.router.go('/')
        store.set('user', null)
      })
      .catch((error) => {
        console.log('AuthController - logout - error: ' + JSON.stringify(error.response))
      })
  }

  public signup (data: SignupData): void {
    console.log('signup')
    authAPI.signup(data)
      .then(() => {
        this.router.go('/settings')
      })
      .catch((error) => {
        if (error.response === '{"reason":"User already in system"}') {
          this.router.go('/settings')
        } else {
          console.log('AuthController - signup - error: ' + JSON.stringify(error.response))
        }
      })
  }

  public signin (data: SigninData): void {
    authAPI.signin(data)
      .then(() => {
        this.router.go('/messenger')
      })
      .catch((error) => {
        if (error.response === '{"reason":"User already in system"}') {
          this.router.go('/messenger')
        } else {
          console.log('AuthController - signin - error')
          console.log(error)
        }
      })
  }

  public getUser (): void {
    authAPI.getUser()
      .then((xhr) => {
        store.set('user', JSON.parse(xhr.response))
        // console.log(store.getState().user)
        console.log('AuthController - getUser - OK')
      })
      .catch((error) => {
        console.log('AuthController - getUser - error ')
        console.log(error)
      })
    // store.set('key', 'value')
    // console.log(store.getState())
  }
}
export default new AuthController()
