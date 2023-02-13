import Block from '../../core/block'
import Button from '../../components/button/button'
import InputGroup from '../../components/inputgroup/inputgroup'
import template from './profile.hbs'

export default class ProfilePage extends Block {
  constructor () {
    const props = {
      attr: { class: 'profile-page' },
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
        /* new Button({
          attr: { class: 'save_button' },
          text: 'Сохранить',
        }),*/
        new Button({
          attr: { class: 'buttons__change-data-button' },
          text: 'Изменить данные',
        }), /*
        new Button({
          attr: { class: 'buttons__change-password' },
          text: 'Изменить пароль',
        }),
        new Button({
          attr: { class: 'buttons__exit-button' },
          text: 'Выйти',
        }),*/
      ],
    }

    props.events = {
      click: {
        handler: (e) => {
          if (e.target != null && e.target instanceof HTMLButtonElement) {
            InputGroup.validate()
          }
          console.log('Profile - click event')
        },
        capture: false,
      },
      focus: {
        handler: (e) => {
          console.log('Profile - focus event')
        },
        capture: true,
      },
      blur: {
        handler: (e) => {
          console.log('Profile - blur event')
        },
        capture: true,
      },
    }

    super('main', props)
  }

  render (): string {
    return template(this.getPropsAndChildren())
  }
}
