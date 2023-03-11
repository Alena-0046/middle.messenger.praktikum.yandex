import Block from '../../core/block'

export default class Input extends Block {
  constructor (props: Record<string, unknown> = {}) {
    super('input', props)
  }
}
