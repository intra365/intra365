import React, { Component } from 'react';

import PeriodicTable from '.'

test('Check that it renders', () => {

    const wrapper = shallow(<PeriodicTable about="🍕"/>);

    expect(wrapper).toMatchSnapshot();
 
}

)