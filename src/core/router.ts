import Route from './route'
// import Block from './block'

export default class Router {
  private readonly routes: Route[]
  private readonly history: History
  private _currentRoute: Route | null
  private readonly _rootQuery: string
  private static __instance: Router | null

  constructor (rootQuery: string) {
    if (Router.__instance != null) {
      return Router.__instance
    }

    this.routes = []
    this.history = window.history
    this._currentRoute = null
    this._rootQuery = rootQuery

    Router.__instance = this
  }

  use (pathname: string, block: unknown): Router {
    // console.log('Router - use - ' + pathname)
    const route = new Route(pathname, block, { rootQuery: this._rootQuery })
    this.routes.push(route)
    return this
  }

  start (): void {
    // console.log('Router - start - ')
    window.onpopstate = (event: PopStateEvent) => {
      console.log('WINDOW ON_POP_STATE_CHANGE')
      const target = event.currentTarget as Window
      this._onRoute(target.location.pathname)
    }
    this._onRoute(window.location.pathname)
  }

  _onRoute (pathname: string): void {
    const route = this.getRoute(pathname)
    if (route == null) {
      console.log('Router - route is null')
      return
    }

    if (this._currentRoute != null && this._currentRoute !== route) {
      this._currentRoute.leave()
    }

    this._currentRoute = route
    // console.log('Router - _onRoute - execute render')
    route.render()
  }

  go (pathname: string): void {
    this.history.pushState({}, '', pathname)
    this._onRoute(pathname)
  }

  back (): void {
    //if (this.routes == null || this.routes.length < 2 || this._currentRoute == null) {
    //  return
    //}
    window.history.back()
  }

  forward (): void {
    //if (this.routes == null || this.routes.length < 2 || this._currentRoute == null) {
    //  return
    //}
    window.history.forward()
  }

  getRoute (pathname: string): Route | undefined {
    return this.routes.find((route) => route.match(pathname))
  }
}
