import Block from '../../core/block.ts'
import LeftPanel from '../../components/leftpanel/leftpanel.ts'
import RightPanel from '../../components/rightpanel/rightpanel.ts'
import template from './user.hbs'

export default class UserPage extends Block {
  constructor () {
    console.log('User ctor')
    const children = {
      leftpanel: new LeftPanel(),
      rightpanel: new RightPanel(),
    }
    super('main', 'user-page', {}, children)
  }

  compile (): HTMLElement {
    return template(this.getPropsAndChildren())
  }
}
