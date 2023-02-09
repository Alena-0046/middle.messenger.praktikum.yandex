import Block from '../../core/block.ts'

export default class Header extends Block {
  constructor (tagName: string, className: string, props: Record<string, string>) {
    super(tagName, className, props, {}, {})
  }

  compile (): HTMLElement {
    return this.props.text
  }
}
