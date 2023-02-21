import EventBus from './eventBus.ts'

enum EVENTS {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_RENDER = 'flow:render',
}

export default abstract class Block<Props extends Record<string, any> = unknown> {
  protected _element: HTMLElement
  protected _meta: Record<string, unknown>
  protected props: Props
  protected children: Record<string, Block | Block[]>
  protected eventBus: EventBus

  constructor (tag: string, all: Props) {
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
    const { tag } = this._meta
    this._element = document.createElement(tag)
    this.eventBus.emit(EVENTS.FLOW_RENDER)
  }

  private _componentDidMount (): void {
    this.componentDidMount()
  }

  componentDidMount (): void {
  }

  dispatchComponentDidMount (): void {
    this.eventBus.emit(EVENTS.FLOW_CMD)
  }

  _componentDidUpdate (oldProps: Props, newProps: Props): void {
    const needRender = this.componentDidUpdate(oldProps, newProps)
    if (needRender) {
      _render()
    }
  }

  componentDidUpdate (oldProps: Props, newProps: Props): boolean {
    return true
  }

  _render (): void {
    this._removeEvents()
    this._element.innerHTML = this.render()
    this._addAttributes()
    this._addEvents()
  }

  private _addAttributes (): void {
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

  private _makePropsProxy (props: Props): Props {
    return new Proxy(props, {
      get (target: Props, prop: string): unknown {
        const value = target[prop]
        return typeof value === 'function' ? value.bind(target) : value
      },
      set (target: Props, prop: string, value: unknown): boolean {
        target[prop] = value
        return true
      },
      deleteProperty (): boolean {
        throw new Error('Нет доступа')
      },
    })
  }

  setProps = (nextProps: Props): void => {
    if (nextProps == null) {
      return
    }
    Object.assign(this.props, nextProps)
  }

  get element (): HTMLElement {
    return this._element
  }

  getPropsAndChildren (): Props {
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

  getContent (): HTMLElement {
    return this.element
  }

  show (): void {
    this.getContent().style.display = 'block'
  }

  hide (): void {
    this.getContent().style.display = 'none'
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
