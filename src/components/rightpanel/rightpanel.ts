import Block from '../../core/block'
import template from './rightpanel.hbs'

export default class RightPanel extends Block {
  constructor () {
    super('div', { attr: { class: 'right-panel' } })
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}
