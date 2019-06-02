import React, { Component } from 'react';

import Login from '.'
import Authorized from './Authorized'

test('Check that login renders', () => {

    const wrapper = shallow(<Login  isAuthenticated={false} tenant={mocks.tenant()}/>);

    expect(wrapper).toMatchSnapshot();
 
}

)

test('Check that it renders', () => {

    const wrapper = shallow(<Authorized tenant={mocks.tenant()}/>);

    expect(wrapper).toMatchSnapshot();
 
}

)