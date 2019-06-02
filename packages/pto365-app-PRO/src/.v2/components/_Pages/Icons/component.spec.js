import React, { Component } from 'react';

import IconsPage from '.'

test('Check that it renders', () => {

    const wrapper = shallow(<IconsPage/>);

    expect(wrapper).toMatchSnapshot();
 
}

)