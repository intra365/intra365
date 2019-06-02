import React, { Component } from 'react';

import MetadataPage from '.'

test('Check that it renders', () => {

    const wrapper = shallow(<MetadataPage context={mocks.user()}/>);

    expect(wrapper).toMatchSnapshot();
 
}

)