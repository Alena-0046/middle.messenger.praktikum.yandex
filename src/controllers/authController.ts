import authAPI, { type SigninData, type SignupData } from '../api/authAPI'
import Router from '../core/router'
import store from '../core/store'

class AuthController {
  private readonly router: Router

  constructor () {
    this.router = new Router()
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
          console.log('AuthController - signin - error: ' + JSON.stringify(error.response))
        }
      })
  }

  public getUser (): void {
    authAPI.getUser()
      .then((xhr) => {
      // console.log('Get data: ' + JSON.parse(xhr.response))
        store.set('user', JSON.parse(xhr.response))
      }).catch((error) => {
        console.log('AuthController - signin - error: ' + JSON.stringify(error.response))
      })
    /* this.api.getUser()
      .then((data) => {store.set('user', data)})*/
  }
}
export default new AuthController()
