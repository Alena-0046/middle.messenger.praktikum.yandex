import Block from './block'

class FakePage extends Block {
  render (): DocumentFragment {
    const content = new DocumentFragment()
    const paragraph = document.createElement('div')
    paragraph.textContent = 'fake content'
    content.appendChild(paragraph)

    return content
  }
}

const fakeBlock = new FakePage('main', {})

describe('Block', () => {
  test('should return element with given tagname', () => {
    expect(fakeBlock.element.tagName).toEqual('MAIN')
  })

  test('should return element with given content', () => {
    expect(fakeBlock.element.innerHTML).toEqual('<div>fake content</div>')
  })
})


/* import Block, { T } from "../block/block";

class SomePage extends Block<T>{
    render(): string | DocumentFragment {
        const content =  new DocumentFragment();
        const paragraph = document.createElement('p');
        paragraph.textContent = 'page content';
        content.appendChild(paragraph);

        return content;
    }
}

const blockMock = new SomePage({ classAttr: 'content' }, 'main');

describe('Block', () => {
    test('should return element with given tagname', () => {
        expect(blockMock.element.tagName).toEqual('MAIN');
    })

    test('should return element with given content', () => {
        expect(blockMock.element.innerHTML).toEqual('<p>page content</p>');
    })

    te
        expect(blockMock.element.getAttribute('class')).toEqual('content');
    })

    test('setProps() should sets new element props ', () => {
        blockMock.setProps({idAttr: 'paragraph'});
        expect(blockMock.element.getAttribute('id')).toEqual('paragraph');
    })
})*/
