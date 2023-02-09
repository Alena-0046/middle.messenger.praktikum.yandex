import Block from '../../core/block.ts'
import Button from '../../components/button/button.ts'
import template from './login.hbs'

export default class LoginPage extends Block {
  constructor () {
    const props = {
      header: 'Вход',
      fields: [{
        label: 'Логин',
        name: 'login',
      }, {
        label: 'Пароль',
        name: 'password',
        type: 'password',
      }],
      link: 'Нет аккаунта?', /* ,
      events: {
        click: (e: string): void => {
          console.log('LoginForm click')
        },
      },*/
    }
    const btnProps: Record<string, string> = {
      text: 'Авторизоваться',
      type: 'submit',
    }
    const btn = new Button(btnProps, {})

    super('main', 'login-page', props, { button: btn })
  }

  compile (): HTMLElement {
    return template(this.getPropsAndChildren())
  }

  addEvents (): void {
    const events: Record<string, unknown> = {
      submit: (e) => {
        e.preventDefault()
        console.log('Login submit')
      },
    }
    Object.keys(events).forEach((e) => {
      console.log('Login addEvents - event - ' + typeof (events))
      this.element.addEventListener(e, events[e])
    })
    super.addEvents()
  }
}
