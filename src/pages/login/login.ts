import Block from '../../core/block'
import Button from '../../components/button/button'
import Form from '../../components/form/form'
import InputGroup from '../../components/inputgroup/inputgroup'
import Link from '../../components/link/link'
import template from './login.hbs'
import authController from '../../controllers/authController'
import { type SigninData } from '../../api/authAPI'
import store, { StoreEvents } from '../../core/store'

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
          },
          href: '/sign-up',
        }),
      }),
      events: {
        submit: {
          handler: (e: Event) => {
            console.log('Login Form - submit event')
            e.preventDefault()
            const data = InputGroup.validate()
            if (data !== null) {
              // const user = store.getState().user
              // if (user != null && user.login !== data.login) {
              //   authController.logout()
              // }
              authController.signin(data as SigninData)
            }
          },
          capture: false,
        },
      },
    }
    super('main', props)

    authController.getUser()

    store.on(StoreEvents.Updated, () => {
      console.log('LoginPage - store updated')
      this.setProps(store.getState())
    })
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}
