import Block from '../../core/block.ts'
// import Navigation from '../../components/navigation/navigation.ts'
import template from './signup.hbs'

export default class SignupPage extends Block {
  constructor () {
    const props = {
      header: 'Регистрация',
      fields: [{
        label: 'Почта',
        name: 'email',
        type: 'email',
      }, {
        label: 'Логин',
        name: 'login',
      }, {
        label: 'Имя',
        name: 'first_name',
      }, {
        label: 'Фамилия',
        name: 'second_name',
      }, {
        label: 'Телефон',
        name: 'phone',
        type: 'tel',
      }, {
        label: 'Пароль',
        name: 'password',
        type: 'password',
      }, {
        label: 'Пароль (ещё раз)',
        type: 'password',
      }],
      button: 'Зарегистрироваться',
      link: 'Войти',
    }
    super('main', 'signup-page', props, {})
  }

  compile (): HTMLElement {
    return template(this.getPropsAndChildren())
  }
}
