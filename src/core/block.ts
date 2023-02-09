import EventBus from './eventBus.ts'

enum EVENTS {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_RENDER = 'flow:render',
}

export default abstract class Block {
  protected id: string
  protected element: HTMLElement
  protected class: string
  // protected meta: Object
  protected props: Record<string, string>
  protected children: Record<string, Block>
  protected events: Record<string, unknown>
  protected setUpdate: boolean
  protected eventBus: EventBus

  constructor (tagName: string, className: string, props: Record <string, string>, children: Record<string, Block>, events: Record<string, unknown> = {}) {
    this.element = document.createElement(tagName)
    this.element.classList.add(className)

    this.props = props
    this.children = children
    this.events = events

    this.eventBus = new EventBus()
    this.registerEvents()
    this.eventBus.emit(EVENTS.INIT)
  }

  getElement (): HTMLElement {
    return this.element
  }

  getPropsAndChildren (): Record<string, string | Block> {
    const combined = { ...this.props, ...this.children }
    Object.keys(this.children).forEach((key) => {
      const value = this.children[key].getElement().outerHTML
      combined[key] = value
    })
    /* for (const key in this.children) {
      if (this.children.hasOwnProperty(key)) {
      const value = this.children[key].getElement().outerHTML
      combined[key] = value
      }
    }*/
    return combined
  }

  registerEvents (): void {
    this.eventBus.on(EVENTS.INIT, this.init.bind(this))
    // this.eventBus.on(EVENTS.FLOW_CMD, this.componentDidMount.bind(this))
    // this.eventBus.on(EVENTS.FLOW_CPU, this.componentDidUpdate.bind(this))
    this.eventBus.on(EVENTS.FLOW_RENDER, this.render.bind(this))
  }

  init (): void {
    // console.log(`Block - init - started, tag = ${this.tag}`)
    // this.element = document.createElement(this.tag)
    this.element.id = 'abcd'
    this.eventBus.emit(EVENTS.FLOW_RENDER)
  }

  abstract compile (): HTMLElement

  render (): void {
    this.removeEvents()
    this.element.innerHTML = ''
    this.element.innerHTML = this.compile()
    this.addEvents()
  }

  addEvents (): void {
    Object.keys(this.events).forEach((e) => {
      this.element.addEventListener(e, this.events[e])
    })
  }

  removeEvents() : void {
  }

  show (): void {
    this.getElement().style.display = 'block'
  }

  hide (): void {
    this.getElement().style.display = 'none'
  }

  componentDidMount (): void {
  }

  dispatchComponentDidMount (): void {
    this.eventBus.emit(Events.FLOW_CMD)
  }

  _componentDidUpdate (oldProps: object, newProps: object): void {
    const response = this.componentDidUpdate(oldProps, newProps)
    if (response) {
      this._render()
    }
  }

  componentDidUpdate (oldProps: object, newProps: object): boolean {
    return true
  }

  setProps (newProps: object): void {
    if (newProps != null) {
      Object.assign(this.props, newProps)
    }
  }

  private makePropsProxy (props: unknown): unknown {
    // const self = this
    console.log('Block - makePropsProxy - start')
    return new Proxy(props, {
      get (target: unknown, prop: unknown): unknown {
        const value: unknown = target[prop]
        return typeof value === 'function' ? value.bind(target) : value
      },
      set (target: unknown, prop: unknown, value: unknown): boolean {
        target[prop] = value
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, self._prevProps, target)
        return true
      },
      deleteProperty () {
        throw new Error('Нет доступа')
      },
    })
  }
}
