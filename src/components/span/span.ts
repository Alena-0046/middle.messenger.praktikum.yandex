import Block from '../../core/block.ts'

export default class Span extends Block {
  constructor (props: Record<string, string> = {}) {
    super('span', props)
  }
}
