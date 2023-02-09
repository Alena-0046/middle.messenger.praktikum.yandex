import Block from '../../core/block.ts'

export default class Input extends Block {
  constructor (className: string, props: Record<string, string>, events: Record<string, unknown>) {
    super('input', className, props, {}, events)
  }

  compile (): HTMLElement {
    return this.props.text
  }
}
