import React, { Component } from 'react';

import OfficeGraph from '.'

test('Check that it renders', () => {

    const wrapper = shallow(<OfficeGraph about="🍕"/>);

    expect(wrapper).toMatchSnapshot();
 
}

)