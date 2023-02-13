import EventBus from './eventBus.ts'

enum EVENTS {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_RENDER = 'flow:render',
}

export default abstract class Block {
  protected _element: HTMLElement
  protected _meta: Record<string, unknown>
  protected props: Record<string, unknown>
  protected children: Record<string, Block | Block[]>
  protected eventBus: EventBus

  constructor (tag: string, all: Record<string, unknown>) {
    // this._element = document.createElement(tag)
    this._meta = { tag, all }

    const tempProps = {}
    const tempChildren = {}
    Object.entries(all).forEach(([key, value]) => {
      if (value instanceof Block ||
      (Array.isArray(value) && value.length > 0 && value[0] instanceof Block)) {
        tempChildren[key] = value
      } else {
        tempProps[key] = value
      }
    })

    this.props = this._makePropsProxy(tempProps)
    this.children = tempChildren

    this.eventBus = new EventBus()
    this.registerEvents()
    this.eventBus.emit(EVENTS.INIT)
  }

  registerEvents (): void {
    this.eventBus.on(EVENTS.INIT, this.init.bind(this))
    this.eventBus.on(EVENTS.FLOW_CMD, this._componentDidMount.bind(this))
    this.eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    this.eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  init (): void {
    console.log('init')
    const { tag } = this._meta
    this._element = document.createElement(tag)
    this.eventBus.emit(EVENTS.FLOW_RENDER)
  }

  _componentDidMount (): void {
    // this.componentDidMount()
  }

  componentDidMount (oldProps: Record<string, unknown>): void {
  }

  dispatchComponentDidMount (): void {
    this.eventBus.emit(EVENTS.FLOW_CMD)
  }

  _componentDidUpdate (oldProps: Record<string, unknown>, newProps: Record<string, unknown>): void {
    const needRender = this.componentDidUpdate(oldProps, newProps)
    if (needRender) {
      _render()
    }
  }

  componentDidUpdate (oldProps: Record<string, unknown>, newProps: Record<string, unknown>): boolean {
    return true
  }

  _render (): void {
    this._removeEvents()
    this._element.innerHTML = this.render()
    this._addAttributes()
    this._addEvents()
  }

  _addAttributes (): void {
    const { attr = {} } = this.props
    Object.entries(attr).forEach(([key, value]) => {
      if (key === 'class') {
        this._element.classList.add(value)
      } else {
        this._element[key] = value
      }
    })
  }

  render (): string {
    const text = this.props.text
    if (typeof text === 'string') {
      return text
    }
    return ''
  }

  _makePropsProxy (props: Record<string, unknown>): Record<string, unknown> {
    return new Proxy(props, {
      get (target: Record<string, unknown>, prop: string): any {
        const value = target[prop]
        return typeof value === 'function' ? value.bind(target) : value
      },
      set (target: Record<string, unknown>, prop: string, value: any): boolean {
        target[prop] = value
        return true
      },
      deleteProperty (): boolean {
        throw new Error('Нет доступа')
      },
    })
  }

  /* setProps = (nextProps) => {
    if (nextProps == null) {
      return
    }
  }*/
  setProps (nextProps: Record<string, unknown>): void {
    /* if (nextProps == null) {
      return
    }
    */
  }

  get element (): HTMLElement {
    return this._element
  }

  getPropsAndChildren (): Record<string, unknown> {
    const combined = { ...this.props }
    Object.entries(this.children).forEach(([key, value]) => {
      if (value instanceof Block) {
        combined[key] = value.element.outerHTML
      } else {// value is Block[]
        combined[key] = ''
        value.forEach((child) => {
          combined[key] = (combined[key] as string) + (child.element.outerHTML as string)
        })
      }
    })

    return combined
  }

  /* getContent (): HTMLElement {
    return this.element
  }*/

  show (): void {
    this._element.style.display = 'block'
  }

  hide (): void {
    this._element.style.display = 'none'
  }

  private _addEvents (): void {
    const { events = {} } = this.props

    Object.entries(events).forEach(([key, value]) => {
      this._element.addEventListener(key, value.handler, value.capture)
    })
    /* Object.keys(events).forEach((eventName) => {
      this._element.addEventListener(eventName, events[eventName])
    })*/
  }

  private _removeEvents (): void {
    const { events = {} } = this.props

    Object.entries(events).forEach(([key, value]) => {
      this._element.removeEventListener(key, value.handler)
    })
  }

  static renderDOM (query: string, block: Block): Element {
    const root = document.querySelector(query)

    root.append(block.getContent())
    block.dispatchComponentDidMount()

    return root
  }
}
