import React, { Component } from 'react';

import ToolPage from '.'

test('Check that it renders', () => {

    const wrapper = shallow(<ToolPage name="word" />);

    expect(wrapper).toMatchSnapshot();
 
}

)