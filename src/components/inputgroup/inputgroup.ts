import Block from '../../core/block.ts'
import template from './inputgroup.hbs'

export default class InputGroup extends Block {
  constructor (className: string, props: Record <string, string>, children: Record<string, Block>, events: Record<string, unknown>) {
    super('div', className, props, children, events)
  }

  compile (): HTMLElement {
    return template(this.getPropsAndChildren())
  }
}
