import Block from '../../core/block'
import Button from '../../components/button/button'
import Input from '../../components/input/input'
import InputGroup from '../../components/inputgroup/inputgroup'
import Link from '../../components/link/link'
import template from './profile.hbs'
import authController from '../../controllers/authController'
import userController from '../../controllers/userController'
import store, { StoreEvents } from '../../core/store'

export default class ProfilePage extends Block {
  constructor () {
    const props = {
      attr: { class: 'profile-page' },

      link: new Link({
        attr: {
          class: 'circle',
          textContent: '<-', // <i class='fa-solid fa-arrow-left'></i>
        },
        href: '/messenger',
      }),

      input: new Input({
        attr: {
          id: 'profile__avatar-input',
          type: 'file',
        },
      }),

      button: new Button({
        attr: {
          textContent: 'Изменить аватар',
        },
        events: {
          click: {
            handler: () => {
              const input = document.getElementById('profile__avatar-input')
              if (input != null && input.files.length > 0) {
                const file = input.files[0]
                const data = new FormData()
                data.append('avatar', file)
                userController.changeAvatar(data)
                authController.getUser()
              }
            },
            capture: false,
          },
        },
      }),

      inputgroups: [
        new InputGroup('profile__input-group', 'email'),
        new InputGroup('profile__input-group', 'login'),
        new InputGroup('profile__input-group', 'first_name'),
        new InputGroup('profile__input-group', 'nick'),
        new InputGroup('profile__input-group', 'second_name'),
        new InputGroup('profile__input-group', 'phone'),
        new InputGroup('profile__input-group', 'password'),
        new InputGroup('profile__input-group', 'password_repeat'),
      ],
      buttons: [
        new Button({
          attr: {
            class: 'buttons__change-data-button',
            textContent: 'Изменить данные',
          },
          events: {
            click: {
              handler: () => {
                console.log('Profile - ChangeData button clicked')
                InputGroup.validate()
              },
              capture: false,
            },
          },
        }),
        new Button({
          attr: {
            class: 'buttons__change-password',
            textContent: 'Изменить пароль',
          },
        }),
        new Button({
          attr: {
            class: 'buttons__exit-button',
            textContent: 'Выйти',
          },
          events: {
            click: {
              handler: () => {
                console.log('Profile - Exit clicked')
                authController.logout()
              },
              capture: false,
            },
          },
        }),
      ],
    }

    super('main', props)

    authController.getUser()

    store.on(StoreEvents.Updated, () => {
      const user = store.getState().user
      if (user != null) {
        this.setProps({ ava: user.avatar })
      }
    })
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}
