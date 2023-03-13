import Block from '../../core/block'

export default class Message extends Block {
  constructor (props: Record<string, unknown>) {
    super('div', props)
  }

  // render (): DocumentFragment {
  //  return this.compile(template, this.props)
  // }
}
