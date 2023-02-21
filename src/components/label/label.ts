import Block from '../../core/block'

export default class Label extends Block {
  constructor (props: Record<string, unknown> = {}) {
    super('label', props)
  }
}
