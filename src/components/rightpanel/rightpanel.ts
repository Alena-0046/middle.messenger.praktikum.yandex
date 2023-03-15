import Block from '../../core/block'
import Input from '../../components/input/input'
import Button from '../../components/button/button'
import BottomPanel from '../../components/bottompanel/bottompanel'
import MessagePanel from '../../components/messagepanel/messagepanel'
import template from './rightpanel.hbs'
import store, { StoreEvents } from '../../core/store'
import chatController from '../../controllers/chatController'

export default class RightPanel extends Block {
  constructor () {
    const props = {
      attr: { class: 'right-panel' },
      input: new Input({
        attr: {
          class: 'right-panel_input',
          placeholder: 'ID пользователя',
        },
      }),
      buttons: [
        new Button({
          attr: {
            class: 'top-panel__button',
            textContent: 'Добавить', // <i class='fa-solid fa-ellipsis-vertical'></i>
          },
          events: {
            click: {
              handler: () => {
                console.log('Right Panel - add user')
                if(!Array.isArray(this.children.input)){
                const input = this.children.input.getContent() as HTMLInputElement
                if (input.value !== '') {
                  const userId = parseInt(input.value)
                  if (!isNaN(userId)) {
                    // @ts-expect-error
                    chatController.addUserToChat(this.props.name, userId)
                    input.value = ''
                  }
                }
                }
              },
              capture: false,
            },
          },
        }),
        new Button({
          attr: {
            class: 'top-panel__button',
            textContent: 'Удалить', // <i class='fa-solid fa-ellipsis-vertical'></i>
          },
          events: {
            click: {
              handler: () => {
                console.log('Right Panel - delete user')
                if(!Array.isArray(this.children.input)) {
                const input = this.children.input.getContent() as HTMLInputElement
                if (input.value !== '') {
                  const userId = parseInt(input.value)
                  if (!isNaN(userId)) {
                    // @ts-expect-error
                    chatController.deleteUserFromChat(this.props.name, userId)
                    input.value = ''
                  }
                }
                }
              },
              capture: false,
            },
          },
        }),
        new Button({
          attr: {
          // class: 'top-panel__button',
            textContent: 'Удалить чат', // <i class='fa-solid fa-ellipsis-vertical'></i>
          },
          events: {
            click: {
              handler: () => {
                console.log('Right Panel - delete chat')
                // @ts-expect-error
                chatController.deleteChat(this.props.name)
              },
              capture: false,
            },
          },
        }),
      ],
      messagepanel: new MessagePanel(),
      bottompanel: new BottomPanel(),
    }
    super('div', props)
    store.on(StoreEvents.Updated, () => {
      const activeChat = store.getState().activeChat
      if (activeChat != null) {
        this.setProps({ name: activeChat })
        this.show()
      } else {
        console.log('ACTIVE CHAT IS NULL')
        this.hide()
      }
    })
  }

  init (): void {
    super.init()
    this.hide()
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}
