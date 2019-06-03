import React, { Component } from 'react';

import PageLayoutFrontpage from '.'

test('Check that it renders', () => {

    const wrapper = shallow(<PageLayoutFrontpage/>);

    expect(wrapper).toMatchSnapshot();
 
}

)