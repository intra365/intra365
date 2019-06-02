import React, { Component } from 'react';

import NavigationFooter from '.'

test('Check that it renders', () => {

    const wrapper = shallow(<NavigationFooter about="🍕"/>);

    expect(wrapper).toMatchSnapshot();
 
}

)