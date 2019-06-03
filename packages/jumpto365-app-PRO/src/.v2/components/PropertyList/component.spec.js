import React, { Component } from 'react';

import PropertyList from '.'

test('Check that it renders', () => {

    const wrapper = shallow(<PropertyList about="🍕" properties={[]}/>);

    expect(wrapper).toMatchSnapshot();
 
}

)