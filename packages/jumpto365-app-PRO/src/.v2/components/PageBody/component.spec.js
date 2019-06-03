import React, { Component } from 'react';

import PageBody from '.'

test('Check that it renders', () => {

    const wrapper = shallow(<PageBody about="🍕"/>);

    expect(wrapper).toMatchSnapshot();
 
}

)