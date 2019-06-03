import React, { Component } from 'react';

import MastHead from '.'

test('Check that it renders', () => {

    const wrapper = shallow(<MastHead/>);

    expect(wrapper).toMatchSnapshot();
 
}

)