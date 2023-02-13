import Block from '../../core/block'
import Button from '../../components/button/button'
import Form from '../../components/form/form'
import Header from '../../components/header/header'
import InputGroup from '../../components/inputgroup/inputgroup'
import Link from '../../components/link/link'
import template from './login.hbs'

export default class LoginPage extends Block {
  constructor () {
    const props = {
      form: new Form({
        attr: { class: 'login-page__form' },
        header: new Header({
          attr: { class: 'login-page__header' },
          text: 'Вход',
        }),
        inputgroups: [
          new InputGroup('login-page__input-groups', 'login'),
          new InputGroup('login-page__input-groups', 'password'),
        ],
        button: new Button({ text: 'Авторизоваться' }),
        link: new Link({
          attr: { class: 'login-page__link' },
          text: 'Нет аккаунта?',
        }),
      }),
    }

    props.events = {
      submit: {
        handler: (e) => {
          e.preventDefault()
          InputGroup.validate()
        },
        capture: false,
      },
      focus: {
        handler: (e) => {
          e.preventDefault()
          console.log('Login Form - focus event')
        },
        capture: true,
      },
      blur: {
        handler: (e) => {
          e.preventDefault()
          console.log('Login Form - blur event')
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
