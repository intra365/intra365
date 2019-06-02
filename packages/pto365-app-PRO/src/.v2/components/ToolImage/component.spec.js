import React, { Component } from 'react';

import ToolImage from '.'

test('Check that it renders', () => {

    const wrapper = shallow(<ToolImage about="🍕"/>);

    expect(wrapper).toMatchSnapshot();
 
}

)