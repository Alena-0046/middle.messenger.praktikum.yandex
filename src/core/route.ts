import type Block from './block'

export default class Route {
  private _pathname: string
  private readonly _blockClass: unknown
  private _block: Block | null
  private readonly _props: Record<string, unknown>

  constructor (pathname: string, view: unknown, props: Record<string, unknown>) {
    this._pathname = pathname
    this._blockClass = view
    this._block = null
    this._props = props
    //console.log(this._props)
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
    // console.log('R - render')
    if (this._block == null) {
      // @ts-expect-error
      this._block = new this._blockClass()

      const root = document.body
      // @ts-expect-error
      root.append(this._block.getContent())
      // root.textContent = block.getContent()

      return
    }
    // console.log('R - show')
    this._block.show()
  }
}
