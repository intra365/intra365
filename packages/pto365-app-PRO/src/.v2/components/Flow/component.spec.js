import React, { Component } from 'react';

import Flow from '.'

test('Check that it renders', () => {

    const wrapper = shallow(<Flow about="🍕"/>);

    expect(wrapper).toMatchSnapshot();
 
}

)