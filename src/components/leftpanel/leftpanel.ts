import Block from '../../core/block.ts'
import template from './leftpanel.hbs'

export default class LeftPanel extends Block {
  constructor () {
    super('div', 'left-panel', {}, {})
  }

  compile (): HTMLElement {
    return template(this.getPropsAndChildren())
  }
}
