import React, { Component } from 'react';

import GenericPage from '.'

test('Check that it renders', () => {

    const wrapper = shallow(<GenericPage/>);

    expect(wrapper).toMatchSnapshot();
 
}

)