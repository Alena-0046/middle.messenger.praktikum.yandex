import Block from '../../core/block'
import template from './rightpanel.hbs'

export default class RightPanel extends Block {
  constructor () {
    super('div', { attr: { class: 'right-panel'}})
  }

  render (): string {
    return template(this.getPropsAndChildren())
  }
}
