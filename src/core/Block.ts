import EventBus from './EventBus'

export class Block {
  private readonly eventBus: EventBus
  private readonly _meta: object
  private readonly element: HTMLElement
  private _element: HTMLElement
  private readonly props: object

  constructor (name: string = 'div', props: object = {}) {
    this.eventBus = new EventBus()
    this._meta = { name, props }
    this.props = this._makePropsProxy(props)
    this._registerEvents(eventBus)
    eventBus.emit(Block.EVENTS.INIT)
  }

  show (): void {
    this.getContent().style.display = 'block'
  }

  hide (): void {
    this.getContent().style.display = 'none'
  }

  _registerEvents (): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  _createResources (): void {
    this._element = this._documentCreateElement(this._meta)
  }

  init (): void {
    this._createResources()
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER)
  }

  _componentDidMount (): void {
    this.componentDidMount()
  }

  componentDidMount (): void {
  }

  dispatchComponentDidMount (): void {
    this.eventBus.emit(Block.Events.FLOW_CMD)
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
