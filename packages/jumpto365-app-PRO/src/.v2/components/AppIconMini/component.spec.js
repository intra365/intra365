import React, { Component } from 'react';

import AppIconMini from '.'


test('Check that it renders', () => {

    const wrapper = shallow(<AppIconMini backgroundColor="#264D8C" name="word" iconUrl="https://jumpto365.com/resources/images/app/Word.png" />);

    expect(wrapper).toMatchSnapshot();
 
}

)  



test('react on click', () => {
    const spy = sinon.spy();
    const wrapper = mount(<AppIconMini backgroundColor="#264D8C" name="word" iconUrl="https://jumpto365.com/resources/images/app/Word.png" onClick={spy} />);
    wrapper
    .find("div")
    .first()
    .simulate("click");
    
    expect(spy.calledOnce).toBe(true);
 
}

) 
