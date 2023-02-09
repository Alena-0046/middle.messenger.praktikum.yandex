import Block from '../../core/block.ts'
// import Navigation from '../../components/navigation/navigation.ts'
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
      button: 'Авторизоваться',
      link: 'Нет аккаунта?',
    }
    super('main', 'login-page', props, {})
  }

  compile (): HTMLElement {
    return template(this.getPropsAndChildren())
  }
}
