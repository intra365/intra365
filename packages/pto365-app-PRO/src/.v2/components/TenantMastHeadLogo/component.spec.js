import React, { Component } from 'react';

import TenantMastHeadLogo from '.'

test('Check that it renders', () => {

    const wrapper = shallow(<TenantMastHeadLogo tenant={mocks.tenant()}/>);

    expect(wrapper).toMatchSnapshot();
 
}

)