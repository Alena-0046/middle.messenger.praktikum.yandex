import Block from '../../core/block'
import Button from '../../components/button/button'
import InputGroup from '../../components/inputgroup/inputgroup'
import Link from '../../components/link/link'
import template from './profile.hbs'
import authController from '../../controllers/authController'
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
      buttons: [/*
         new Button({
          attr: { class: 'save_button' },
          text: 'Сохранить',
        }),*/
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
        }), /*
        new Button({
          attr: { class: 'buttons__change-password' },
          text: 'Изменить пароль',
        }),*/
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

    // authController.getUser()

    store.on(StoreEvents.Updated, () => {
      // console.log('Profile - ctor - store updated')
      this.setProps(store.getState())
    })

    // authController.getUser()
  }

  /* componentDidUpdate (oldProps: Record<string, unknown>, newProps: Record<string, unknown>): boolean {
    console.log('Profile - didUpdate()')
    return true
  }*/

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}
