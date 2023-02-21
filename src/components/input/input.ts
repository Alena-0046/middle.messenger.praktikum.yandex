import Block from '../../core/block'

export default class Input extends Block {
  constructor (props: Record<string, unknown> = {}) {
    super('input', props)
  }
/*
  validate (): boolean {
    let result = true
    switch (this.element.props.name) {
      case 'first_name':
      case 'second_name':
        const name = new RegExp('^$')
        result = name.test(this.element.value)
        break
      case 'login':
        const login = new RegExp('^$')
        result = login.test(this.element.value)
        break
      case 'email':
        const email = new RegExp('^$')
        result = email.test(this.element.value)
        break
      case 'password':
        const strongPassword = new RegExp('^(?=.*[A-Z])(?=.*[0-9]).{8,40}$')
        result = strongPassword.test(this.element.value)
        break
      case 'phone':
        const phone = new RegExp('^[\+]?[0-9]{10,15}$')
        result = phone.test(this.element.value)
        break
      case 'message':
        const notEmpty = new RegExp('^.+$')
        result = notEmpty.test(this.element.value)
        break
      default:
        console.log('Input - validate - default case')
        break
    }
    return result
  }*/
}
