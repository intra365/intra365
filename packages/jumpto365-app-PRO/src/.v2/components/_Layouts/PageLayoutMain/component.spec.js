import React, { Component } from 'react';

import ToBeRenamed from '.'

test('Check that it renders', () => {

    const wrapper = shallow(<ToBeRenamed/>);

    expect(wrapper).toMatchSnapshot();
 
}

)