import React, { Component } from 'react';

import SharePage from '.'

test('Check that it renders', () => {

    const wrapper = shallow(<SharePage/>);

    expect(wrapper).toMatchSnapshot();
 
}

)