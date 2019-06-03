import React, { Component } from 'react';

import UserPage from '.'

test('Check that it renders', () => {

    const wrapper = shallow(<UserPage context={mocks.user()}/>);

    expect(wrapper).toMatchSnapshot();
 
}

)