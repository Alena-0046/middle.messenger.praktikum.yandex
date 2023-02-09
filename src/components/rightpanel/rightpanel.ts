import Block from '../../core/block.ts'
import template from './rightpanel.hbs'

export default class RightPanel extends Block {
  constructor () {
    super('div', 'right-panel', {}, {})
  }

  compile (): HTMLElement {
    return template(this.getPropsAndChildren())
  }
}
