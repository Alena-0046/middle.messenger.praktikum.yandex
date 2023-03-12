import Block from '../../core/block'
import Chat from '../../components/chat/chat'
import Link from '../../components/link/link'
import template from './leftpanel.hbs'
import store, { StoreEvents } from '../../core/store'

export default class LeftPanel extends Block {
  constructor () {
    const props = {
      attr: { class: 'left-panel' },
      link: new Link({
        attr: {
          class: 'left-panel__link',
          textContent: 'Профиль >',
        },
        href: '/settings',
      }),
      chats: [],
    }
    super('div', props)
    store.on(StoreEvents.Updated, () => {
      const chats = store.getState().chats
      if (chats != null) {
        console.log('LeftPanel - GOT CHATS')
        const children: Chat[] = []

        chats.forEach((chat) => {
          let name = chat.title
          let time = ''
          let message = ''

          if (chat.last_message != null) {
            const user = chat.last_message.user
            if (user != null) {
              name = user.login
            }
            time = chat.last_message.time.substring(0, 10)
            message = chat.last_message.content
          }

          console.log(chat)
          children.push(new Chat({
            attr: {
              class: 'chat',
            },
            id: chat.id,
            name,
            message_time: time,
            message_text: message,
            message_count: chat.unread_count,
          }))
        })
        this.children.chats = children
        this.setProps(children)
      }
    })
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}
