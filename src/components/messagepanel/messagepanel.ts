import Block from '../../core/block'
import template from './messagepanel.hbs'
import Message from '../../components/message/message'
import messageController from '../../controllers/messageController'
import store, { StoreEvents } from '../../core/store'

export default class MessagePanel extends Block {
  constructor () {
    const props = {
      attr: { class: 'right-panel__messages' },
      messages: [],
    }
    super('div', props)
    store.on(StoreEvents.Updated, () => {
      const messages = store.getState().messages
      if (messages != null) {
        const children: Message[] = []
        // @ts-expect-error
        messages.forEach((message) => {
          // console.log(message) // id, user_id, chat, type, time, content, is_read, file
          children.push(new Message({
            attr: {
              class: (store.getState().user.id === message.user_id) ? 'right-panel__my-message' : 'right-panel__message',
              textContent: message.content,
            },
          }))
        })
        this.children.messages = children
        this.setProps({ messages: children })
      } else {
        messageController.getOldMessages()
      }
    })
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}
