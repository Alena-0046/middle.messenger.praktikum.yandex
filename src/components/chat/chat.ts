import Block from '../../core/block'
import template from './chat.hbs'

export default class Chat extends Block {
  constructor (props: Record<string, unknown>) {
    super('div', props)
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}
