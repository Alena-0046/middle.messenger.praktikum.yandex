import Block from '../../core/block'
// import Input from '../../components/input/input'
// import Button from '../../components/button/button'
import BottomPanel from '../../components/bottompanel/bottompanel'
import MessagePanel from '../../components/messagepanel/messagepanel'
import template from './rightpanel.hbs'
import store, { StoreEvents } from '../../core/store'
import messageController from '../../controllers/messageController'

export default class RightPanel extends Block {
  constructor () {
    const props = {
      attr: { class: 'right-panel' },
      messagepanel: new MessagePanel(),
      bottompanel: new BottomPanel(),
    }
    super('div', props)
    store.on(StoreEvents.Updated, () => {
      const activeChat = store.getState().activeChat
      if(activeChat != null) {
        this.setProps({name: "Чат: " + activeChat})
        this.show()
      } else {
        console.log('ACTIVE CHAT IS NULL')
        this.hide()
      }
    })
  }
  init() {
    super.init()
    this.hide()
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}
