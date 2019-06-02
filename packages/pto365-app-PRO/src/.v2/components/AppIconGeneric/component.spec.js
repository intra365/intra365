import React, { Component } from 'react';

import AppIconGeneric from '.'


test('Check that it renders 320 px', () => {

    const wrapper = shallow(<AppIconGeneric name="word" size={320} />);

    expect(wrapper).toMatchSnapshot();
 
}

)  


test('Check that it renders disabled color ', () => {

    const wrapper = shallow(<AppIconGeneric name="word" size={320} state="disabled" disabledColor="grey" />);

    expect(wrapper).toMatchSnapshot();
 
}

)  


test('react on click', () => {
    const spy = sinon.spy();
    const wrapper = mount(<AppIconGeneric backgroundColor="#264D8C" name="word" iconUrl="https://jumpto365.com/resources/images/app/Word.png" onClick={spy} />);
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
//     const wrapper = mount(<AppIconGeneric backgroundColor="#264D8C" name="word" iconUrl="https://jumpto365.com/resources/images/app/Word.png" onJump={spy} />);
//     wrapper
//     .find("div")
//     .first()
//     .simulate("click");
    
//     expect(spy.calledOnce).toBe(true);
 
// }
// ) 
