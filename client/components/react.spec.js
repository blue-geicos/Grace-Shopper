import Enzyme, {shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import chai, {expect} from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import React from 'react'

chai.use(sinonChai)
Enzyme.configure({adapter: new EnzymeAdapter()})

//IMPORT COMPONENTS
import {SingleItem, AllItems} from '../components'

describe('<AllItems>', () => {
  it('should have an <h1> that renders the right title prop', () => {
    // Make shallow copy
    let AllItemsWrapper = shallow(
      <AllItems items={this.props.items} title="All Products" />
    )
    // Find what we're looking for on component
    let innerText = AllItemsWrapper.find('h1').text()
    // Test It
    expect(innerText).to.equal('All Products')
  })
})

describe('<SingleItem>', () => {
  it('should have an <h1> that renders the right title prop', () => {
    // Make shallow copy
    let SingleItemWrapper = shallow(
      <SingleItem items={this.props.items} title="Congrats" />
    )
    // Find what we're looking for on component
    let innerText = SingleItemWrapper.find('h1').text()
    // Make assertions
    expect(innerText).to.equal('Congrats')
  })
})

describe('<SingleItem>', () => {
  it('calls the addItem function onClick', () => {
    // Make a dummy spy function
    let addItemSpy = sinon.spy()
    // Make shallow copy
    let SingleItemWrapper = shallow(<SingleItem addItem={this.props.addItem} />)
    // Find the button on the component
    let button = SingleItemWrapper.find('Add to Cart').text()
    // click the button
    button.simulate('click')
    // Make assertions
    expect(addItemSpy.calledOnce).to.equal(true)
  })
})
