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
  protected tag: string
  protected class: string
  // protected meta: Object
  protected props: Record<string, string>// {[key: string]: string}
  protected children: Record<string, Block> // {[key: string]: Block}
  protected setUpdate: boolean
  protected eventBus: EventBus

  constructor (tagName: string, className: string, props: Record <string, string>, children: Record<string, Block>) {
    // this.element = document.createElement(tagName)
    this.class = className

    this.tag = tagName
    this.props = props
    this.children = children

    this.eventBus = new EventBus()
    this.registerEvents()
    this.eventBus.emit(EVENTS.INIT)
    // console.log('Block - constructor() - end')
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
    this.element = document.createElement(this.tag)
    this.element.id = 'abcd'
    this.element.style.class = this.class
    this.element.classList.add(this.class)
    this.eventBus.emit(EVENTS.FLOW_RENDER)
  }

  abstract compile (): HTMLElement

  render (): void {
    // console.log('Block - render()')
    // this.removeEvents()
    this.element.innerHTML = ''
    this.element.innerHTML = this.compile()
    this.addEvents()
    // this.addAttributes()
  }

  addEvents (): void {
    /* const { events = {} } = this.props
    if (!events)
      return
    Object.keys(events).forEach((eventName) => {
      this.element.addEventListener(eventName, events[eventName]);
    })*/
  }

  show (): void {
    this.getElement().style.display = 'block'
  }

  hide (): void {
    this.getElement().style.display = 'none'
  }
/*
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

  _render (): void {
    // this._element.innerHTML = this.render()
  }

  render (): void {
  }

  getContent (): HTMLElement {
    return this.element
  }

  makePropsProxy (): boolean {
    return true
  }

  _createDocumentElement (name: string): HTMLElement {
    return document.createElement(name)
  }*/
}
