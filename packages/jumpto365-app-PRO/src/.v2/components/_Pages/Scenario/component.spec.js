import React, { Component } from 'react';

import ScenarioPage from '.'

test('Check that it renders', () => {

    const wrapper = shallow(<ScenarioPage domain="dummy"/>);

    expect(wrapper).toMatchSnapshot();
 
}

)