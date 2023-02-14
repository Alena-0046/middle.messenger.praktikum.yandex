import Block from '../../core/block'
import Button from '../../components/button/button'
import Form from '../../components/form/form'
import Header from '../../components/header/header'
import InputGroup from '../../components/inputgroup/inputgroup'
import Link from '../../components/link/link'
import template from './signup.hbs'

export default class SignupPage extends Block {
  constructor () {
    const props = {
      form: new Form({
        attr: { class: 'signup-page__form' },
        header: new Header({
          attr: { class: 'signup-page__header' },
          text: 'Регистрация',
        }),
        inputgroups: [
          new InputGroup('signup-page__input-groups', 'email'),
          new InputGroup('signup-page__input-groups', 'login'),
          new InputGroup('signup-page__input-groups', 'first_name'),
          new InputGroup('signup-page__input-groups', 'second_name'),
          new InputGroup('signup-page__input-groups', 'phone'),
          new InputGroup('signup-page__input-groups', 'password'),
          new InputGroup('signup-page__input-groups', 'password_repeat'),
        ],
        button: new Button({ text: 'Зарегистрироваться' }),
        link: new Link({
          attr: { class: 'signup-page__link' },
          text: 'Войти',
        }),
      }),
    }


    props.events = {
      submit: {
        handler: (e) => {
          console.log('Signup Form - submit event')
          e.preventDefault()
          InputGroup.validate()
        },
        capture: false,
      },
      focus: {
        handler: (e) => {
          e.preventDefault()
          console.log('Signup Form - focus event')
          // Do not validate input on focus event
          // Users won't see red labels after clicking on input
          
          //if(e.target != null && e.target instanceof HTMLInputElement) {
            //InputGroup.validateInputGroup(e.target)
          //}
        },
        capture: true,
      },
      blur: {
        handler: (e) => {
          e.preventDefault()
          console.log('SignUp Form - blur event')
          if(e.target != null && e.target instanceof HTMLInputElement) {
            InputGroup.validateInputGroup(e.target)
          }
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
