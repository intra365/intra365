import React, { Component } from 'react';

import NavigationTop from '.'

test('Check that it renders', () => {

    const wrapper = shallow(<NavigationTop/>);

    expect(wrapper).toMatchSnapshot();
 
}

)