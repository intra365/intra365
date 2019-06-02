import React, { Component } from 'react';

import ContextPage from '.'

test('Check that it renders', () => {

    const wrapper = shallow(<ContextPage/>);

    expect(wrapper).toMatchSnapshot();
 
}

)