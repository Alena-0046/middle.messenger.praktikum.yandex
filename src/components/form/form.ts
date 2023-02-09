import Block from '../../core/block.ts'
import template from './form.hbs'

export default class Form extends Block {
  constructor (className: string, props: Record <string, string>, children: Record<string, Block>, events: Record<string, unknown>) {
    super('form', className, props, children, events)
  }

  compile (): HTMLElement {
    return template(this.getPropsAndChildren())
  }

  addEvents (): void {
    const events: Record<string, unknown> = {
      submit: (e) => {
        console.log('Form - submit')
        e.preventDefault()
        this.getElement().querySelectorAll('input').forEach((input) => {
          console.log(String(input.name) + '(' + String(input.type) + '): ' + String(input.value))
        })
      },
      focus: (e) => {
        console.log('Form - focus')
      },
      blur: (e) => {
        console.log('Form - blur')
      },
    }
    Object.keys(events).forEach((e) => {
      this.element.addEventListener(e, events[e])
    })
    super.addEvents()
  }
}
