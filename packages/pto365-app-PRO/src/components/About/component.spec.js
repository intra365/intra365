import React, { Component } from 'react';

import About from '.'

test('Check that it renders', () => {

    const wrapper = shallow(<About about="🍕"/>);

    expect(wrapper).toMatchSnapshot();
 
}

)