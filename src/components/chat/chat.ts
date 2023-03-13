import Block from '../../core/block'
import template from './chat.hbs'
import store, { StoreEvents } from '../../core/store'
import messageController from '../../controllers/messageController'

export default class Chat extends Block {
  constructor (props: Record<string, unknown>) {
    props = {...props,
      events: {
        click: {
          handler: (e) => {
            if(this.props.id != null && this.props.id != store.getState().activeChat) {
              store.set('activeChat', this.props.id)
            }
          },
          capture: false,
        },
      },
    }
    super('div', props)
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}
