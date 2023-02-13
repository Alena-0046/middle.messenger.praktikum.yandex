import Block from '../../core/block.ts'

export default class Header extends Block {
  constructor (props: Record<string, string>) {
    super('h2', props)
  }
}
