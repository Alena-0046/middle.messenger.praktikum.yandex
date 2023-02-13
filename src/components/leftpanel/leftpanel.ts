import Block from '../../core/block'
import template from './leftpanel.hbs'

export default class LeftPanel extends Block {
  constructor () {
    super('div', { attr: { class: 'left-panel'}})
  }

  render (): string {
    return template(this.getPropsAndChildren())
  }
}
