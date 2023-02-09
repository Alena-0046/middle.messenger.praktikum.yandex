import Block from '../../core/block.ts'

export default class Label extends Block {
  constructor (className: string, props: Record<string, string>, events: Record<string, unknown>) {
    super('label', className, props, {}, events)
  }

  compile (): HTMLElement {
    return this.props.text
  }
}
