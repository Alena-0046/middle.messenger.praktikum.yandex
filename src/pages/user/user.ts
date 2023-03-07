import Block from '../../core/block'
import LeftPanel from '../../components/leftpanel/leftpanel'
import RightPanel from '../../components/rightpanel/rightpanel'
import template from './user.hbs'

export default class UserPage extends Block {
  constructor () {
    super('main', {
      attr: { class: 'user-page' },
      leftpanel: new LeftPanel(),
      rightpanel: new RightPanel(),
    })
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}
