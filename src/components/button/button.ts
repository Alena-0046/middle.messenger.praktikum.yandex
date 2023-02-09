import Block from '../../core/block.ts'

export default class Button extends Block {
  constructor (props: Record<string, string>, events: Record<string, unknown>) {
    console.log('constructor')
    super('button', 'button', props, {}, events)
  }

  compile (): HTMLElement {
    return this.props.text
  }
}
