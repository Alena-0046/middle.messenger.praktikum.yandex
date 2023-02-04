import EventBus from './EventBus'

enum EVENTS {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_RENDER = 'flow:render'
}

export class Block {
  _props: object
  _children: object
  _id
  _element: HTMLElement
  _meta: object
  eventBus: EventBus
  _setUpdate: boolean

  constructor (name: string = 'div', props: object = {}) {
    this.eventBus = new EventBus()
    this._meta = { name, props }
    this.props = this._makePropsProxy(props)
    this._registerEvents(eventBus)
    eventBus.emit(EVENTS.INIT)
  }

  show (): void {
    this.getContent().style.display = 'block'
  }

  hide (): void {
    this.getContent().style.display = 'none'
  }

  _registerEvents (): void {
    eventBus.on(EVENTS.INIT, this.init.bind(this))
    eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  _createResources (): void {
    this._element = this._documentCreateElement(this._meta)
  }

  init (): void {
    this._createResources()
    this.eventBus.emit(EVENTS.FLOW_RENDER)
  }

  _componentDidMount (): void {
    this.componentDidMount()
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

  getElement (): HTMLElement {
    return this._element
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
  }
}
