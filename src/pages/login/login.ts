import Block from '../../core/block'
import Button from '../../components/button/button'
import Form from '../../components/form/form'
import InputGroup from '../../components/inputgroup/inputgroup'
import Link from '../../components/link/link'
import template from './login.hbs'

export default class LoginPage extends Block {
  constructor () {
    const props = {
      form: new Form({
        attr: { class: 'login-page__form' },
        header_class: 'login-page__header',
        header_name: 'Вход',
        inputgroups: [
          new InputGroup('login-page__input-groups', 'login'),
          new InputGroup('login-page__input-groups', 'password'),
        ],
        button: new Button({ attr: { textContent: 'Авторизоваться' } }),
        link: new Link({
          attr: {
            class: 'login-page__link',
            textContent: 'Нет аккаунта?',
            href: '#signup',
          },
        }),
      }),
    }

    props.events = {
      submit: {
        handler: (e) => {
          console.log('Login Form - submit event')
          e.preventDefault()
          InputGroup.validate()
        },
        capture: false,
      },
    }
    super('main', props)
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}
