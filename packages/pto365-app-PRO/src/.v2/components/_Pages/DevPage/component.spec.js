import React, { Component } from 'react';

import DevPage from '.'

test('Check that it renders', () => {

    const wrapper = shallow(<DevPage/>);

    expect(wrapper).toMatchSnapshot();
 
}

)