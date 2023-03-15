import Block from '../../core/block'
import Input from '../../components/input/input'
import Button from '../../components/button/button'
import template from './bottompanel.hbs'
import messageController from '../../controllers/messageController'

export default class BottomPanel extends Block {
  constructor () {
    const props = {
      attr: { class: 'right-panel__bottom-panel' },
      input: new Input({
        attr: {
          class: 'bottom-panel__input',
          name: 'message',
        },
      }),
      button: new Button({
        attr: {
          class: 'circle',
          textContent: '->', // <i class='fa-solid fa-arrow-right'></i>
        },
      }),
      events: {
        click: {
          handler: (e: Event) => {
            if (e.target instanceof HTMLButtonElement) {
              e.preventDefault()
              console.log('BottomPanel - Button clicked')
              if (!Array.isArray(this.children.input)) {
                const input = this.children.input.getContent() as HTMLInputElement
                if (input.value !== '') {
                  messageController.sendMessage(input.value)
                  input.value = ''
                }
              }
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
