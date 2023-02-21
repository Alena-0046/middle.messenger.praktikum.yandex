import Block from '../../core/block'

export default class Button extends Block {
  constructor (props: Record<string, unknown>) {
    super('a', props)
  }
}
