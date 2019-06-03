import React, { Component } from 'react';

import PersonalHomePage from '.'

test('Check that it renders', () => {

    const wrapper = shallow(<PersonalHomePage tenantName="jumpto365"/>);

    expect(wrapper).toMatchSnapshot();
 
}

)