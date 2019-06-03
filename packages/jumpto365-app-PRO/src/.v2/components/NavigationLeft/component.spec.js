import React, { Component } from 'react';

import NavigationLeft from '.'

test('Check that it renders', () => {

    const wrapper = shallow(<NavigationLeft/>);

    expect(wrapper).toMatchSnapshot();
 
}

)