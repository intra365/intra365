import React, { Component } from 'react';

import LoginPage from '.'

test('Check that it renders', () => {

    const wrapper = shallow(<LoginPage />);

    expect(wrapper).toMatchSnapshot();
 
}

)