import HomePage from './pages/home/home'
import LoginPage from './pages/login/login'
import SignupPage from './pages/signup/signup'
import ProfilePage from './pages/profile/profile'
import UserPage from './pages/user/user'
import ErrorPage from './pages/error/error'
import type Block from './core/block'

export const enum PageIds {
  Home = 'home',
  User = 'user',
  Profile = 'profile',
  Login = 'login',
  Signup = 'signup',
}

export default class App {
  private static readonly bodyContainer: HTMLElement = document.body

  static loadPage (pageId: string): void {
    let page: Block | null = null
    switch (pageId) {
      case PageIds.Home:
        console.log('Create Home Page')
        page = new HomePage(pageId)
        break
      case PageIds.User:
        console.log('Create User Page')
        page = new UserPage(pageId)
        break
      case PageIds.Profile:
        console.log('Create Profile Page')
        page = new ProfilePage(pageId)
        break
      case PageIds.Login:
        console.log('Create Login Page')
        page = new LoginPage(pageId)
        break
      case PageIds.Signup:
        console.log('Create Signup Page')
        page = new SignupPage(pageId)
        break
      default:
        console.log('Here should be error')
        page = new ErrorPage(pageId)
        break
    }

    if (page != null) {
      App.bodyContainer.innerHTML = ''
      App.bodyContainer.append(page.element)
    }
  }

  enableRouteChange (): void {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1)
      console.log(`Hash changed: ${hash}`)
      App.loadPage(hash)
    })
  }

  run (): void {
    App.loadPage(PageIds.Home)
    this.enableRouteChange()
  }
}
