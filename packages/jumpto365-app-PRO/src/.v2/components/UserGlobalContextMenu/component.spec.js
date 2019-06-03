import React, { Component } from 'react';

import UserGlobalContextMenu from '.'

test('Check that it renders', () => {

    const wrapper = shallow(<UserGlobalContextMenu about="🍕"/>);

    expect(wrapper).toMatchSnapshot();
 
}

)