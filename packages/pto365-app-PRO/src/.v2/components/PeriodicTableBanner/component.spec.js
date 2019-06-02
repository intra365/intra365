import React, { Component } from 'react';

import PeriodicTableBanner from '.'

test('Check that it renders', () => {

    const wrapper = shallow(<PeriodicTableBanner about="🍕"/>);

    expect(wrapper).toMatchSnapshot();
 
}

)