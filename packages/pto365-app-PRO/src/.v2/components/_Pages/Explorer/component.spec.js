import React, { Component } from 'react';

import ExplorerPage from '.'

test('Check that it renders', () => {

    const wrapper = shallow(<ExplorerPage context={mocks.user()}/>);

    expect(wrapper).toMatchSnapshot();
 
}

)