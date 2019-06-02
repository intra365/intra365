import React, { Component } from 'react';

import _DeveloperToolsPage from '.'

test('Check that it renders', () => {

    const wrapper = shallow(<_DeveloperToolsPage context={mocks.context()}/>);

    expect(wrapper).toMatchSnapshot();
 
}

)