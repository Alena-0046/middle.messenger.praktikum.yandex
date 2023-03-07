import Block from '../../core/block'

export default class Link extends Block {
  constructor (props: Record<string, unknown>) {
    super('a', props)
  }
}
