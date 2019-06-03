import React, { Component } from 'react';

import PageLayoutPublisher from '.'

test('Check that it renders', () => {

    const wrapper = shallow(<PageLayoutPublisher/>);

    expect(wrapper).toMatchSnapshot();
 
}

)