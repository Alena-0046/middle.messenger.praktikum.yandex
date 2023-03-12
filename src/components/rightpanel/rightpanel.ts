import Block from '../../core/block'
// import Input from '../../components/input/input'
// import Button from '../../components/button/button'
import BottomPanel from '../../components/bottompanel/bottompanel'
import MessagePanel from '../../components/messagepanel/messagepanel'
import template from './rightpanel.hbs'

export default class RightPanel extends Block {
  constructor () {
    const props = {
      attr: { class: 'right-panel' },
      messagepanel: new MessagePanel(),
      bottompanel: new BottomPanel(),
    }
    super('div', props)
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}
