import Block from '../../core/block'
import LeftPanel from '../../components/leftpanel/leftpanel'
import RightPanel from '../../components/rightpanel/rightpanel'
import template from './user.hbs'
import authController from '../../controllers/authController'
// import { type SigninData } from '../api/authAPI'
import store, { StoreEvents } from '../../core/store'

export default class UserPage extends Block {
  constructor () {
    super('main', {
      attr: { class: 'user-page' },
      leftpanel: new LeftPanel(),
      rightpanel: new RightPanel(),
    })

    authController.getUser()

    store.on(StoreEvents.Updated, () => {
      this.setProps(store.getState())
    })
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}
