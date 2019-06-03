import React, { Component } from 'react';

import AppIconLarge from '.'


test('Check that it renders', () => {

    const wrapper = shallow(<AppIconLarge backgroundColor="#264D8C" name="word" iconUrl="https://jumpto365.com/resources/images/app/Word.png" />);

    expect(wrapper).toMatchSnapshot();
 
}

)  



test('react on click', () => {
    const spy = sinon.spy();
    const wrapper = mount(<AppIconLarge backgroundColor="#264D8C" name="word" iconUrl="https://jumpto365.com/resources/images/app/Word.png" onClick={spy} />);
    wrapper
    .find("div")
    .first()
    .simulate("click");
    
    expect(spy.calledOnce).toBe(true);
 
}
)



//TODO: Implement test for onJump
// test('react on jump', () => {
//     const spy = sinon.spy();
//     const wrapper = mount(<AppIconLarge backgroundColor="#264D8C" name="word" iconUrl="https://jumpto365.com/resources/images/app/Word.png" onJump={spy} />);
//     wrapper
//     .find("div")
//     .first()
//     .simulate("click");
    
//     expect(spy.calledOnce).toBe(true);
 
// }
// ) 
