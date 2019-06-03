import React, { Component } from 'react';

import PageHeader from '.'

test('Check that it renders', () => {

    const wrapper = shallow(<PageHeader about="🍕"/>);

    expect(wrapper).toMatchSnapshot();
 
}

)