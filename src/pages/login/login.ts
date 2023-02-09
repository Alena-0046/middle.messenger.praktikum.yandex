import Block from '../../core/block.ts'
import Button from '../../components/button/button.ts'
import Header from '../../components/header/header.ts'
import Label from '../../components/label/label.ts'
import Link from '../../components/link/link.ts'
import Input from '../../components/input/input.ts'
import InputGroup from '../../components/inputgroup/inputgroup.ts'
import Form from '../../components/form/form.ts'
import template from './login.hbs'

export default class LoginPage extends Block {
  constructor () {
    const hdr = new Header('h2', 'login-page__header', { text: 'Вход' })

    const lbl = new Label('login-page__label', { text: 'Логин' })
    const input = new Input('login-page__input', { text: '', name: 'login', type: 'text' })
    const inputgroup = new InputGroup('login-page__input-groups', {}, { input, label: lbl })

    const lbl2 = new Label('login-page__label', { text: 'Пароль' })
    const input2 = new Input('login-page__input', { text: '', name: 'password', type: 'password' })
    const inputgroup2 = new InputGroup('login-page__input-groups', {}, { input: input2, label: lbl2 })

    const btnProps: Record<string, string> = {
      text: 'Авторизоваться',
      type: 'submit',
    }
    const btn = new Button(btnProps, {})
    const link = new Link('login-page__link', { text: 'Нет аккаунта?' })

    const loginForm = new Form('login-page__form', {}, {
      header: hdr,
      inputgroup1: inputgroup,
      inputgroup2: inputgroup2,
      button: btn,
      link,
    })

    super('main', 'login-page', {}, { form: loginForm })
  }

  compile (): HTMLElement {
    return template(this.getPropsAndChildren())
  }

  addEvents (): void {
    const events: Record<string, unknown> = {
      submit: (e) => {
        console.log('Login - submit')
        e.preventDefault()
        this.getElement().querySelectorAll('input').forEach((input) => {
          console.log(String(input.name) + '(' + String(input.type) + '): ' + String(input.value))
        })
      },
      focus: (e) => {
        console.log('Login - focus')
      },
      blur: (e) => {
        console.log('Login - blur')
      },
    }
    Object.keys(events).forEach((e) => {
      this.element.addEventListener(e, events[e])
    })
    super.addEvents()
  }
}
