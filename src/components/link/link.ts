import Block from '../../core/block.ts'

export default class Link extends Block {
  constructor (className: string, props: Record<string, string>, events: Record<string, unknown>) {
    super('a', className, props, {}, events)
  }

  compile (): HTMLElement {
    return this.props.text
  }
}
