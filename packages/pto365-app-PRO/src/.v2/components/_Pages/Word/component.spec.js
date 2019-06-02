import React, { Component } from 'react';

import TenantPage from '.'

test('Check that it renders', () => {

    const wrapper = shallow(<TenantPage tenantName="jumpto365"/>);

    expect(wrapper).toMatchSnapshot();
 
}

)