import React, { Component } from 'react';

import AppGroup from '.'
var apps = ["word","excel","teams","unknown"]
test('Check that it renders', () => {

    const wrapper = shallow(<AppGroup apps={apps}  about="🍕"/>);

    expect(wrapper).toMatchSnapshot();
 
}

)





test('react on click', () => {
    const spy = sinon.spy();
    const wrapper = mount(<AppGroup apps={apps} onClick={spy} />);
    wrapper
    .find("div")
    .first()
    .simulate("click");
    
    expect(spy.calledOnce).toBe(false);
 
}

) 
