import type Block from './block'

export default class Route {
  private _pathname: string
  private _block: Block | null
  private readonly _props: Record<string, unknown>

  constructor (pathname: string, view: Block, props: Record<string, unknown>) {
    this._pathname = pathname
    this._blockClass = view
    this._block = null
    this._props = props
  }

  navigate (pathname: string): void {
    if (this.match(pathname)) {
      this._pathname = pathname
      this.render()
    }
  }

  leave (): void {
    if (this._block != null) {
      this._block.hide()
    }
  }

  match (pathname: string): boolean {
    return pathname === this._pathname
  }

  render (): void {
    console.log('R - render')
    if (this._block == null) {
      this._block = new this._blockClass()

      const root = document.body
      root.append(this._block.getContent())
      // root.textContent = block.getContent()

      return
    }
    console.log('R - show')
    this._block.show()
  }
}
