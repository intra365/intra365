import React, { Component } from 'react';

import GroupBox from '.'

test('Check that it renders', () => {

    const wrapper = shallow(<GroupBox about="🍕"/>);

    expect(wrapper).toMatchSnapshot();
 
}

)