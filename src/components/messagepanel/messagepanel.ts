import Block from '../../core/block'
import template from './messagepanel.hbs'
import Message from '../../components/message/message'
import messageController from '../../controllers/messageController'
import store, { StoreEvents } from '../../core/store'

export default class MessagePanel extends Block {
  constructor () {
    const props = {
      attr: { class: 'right-panel__messages' },
      messages: [
        new Message({
          attr: {
            class: 'right-panel__message',
            textContent: 'If you see this message, old messages were not loaded',
          },
        }),
      ],
    }
    super('div', props)
    store.on(StoreEvents.Updated, () => {
      const messages = store.getState().messages
      if (messages != null) {
        const children: Message[] = []
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
        this.setProps(messages)
      } else {
        messageController.getOldMessages()
      }
    })
    // messageController.getOldMessages()
  }

  // setProps() {

  // }

  render (): DocumentFragment {
    console.log('Messenger - render')
    return this.compile(template, this.props)
  }
}
