import React, { Component } from 'react';

import AppIcon from '.'


test('Check that it renders 320 px', () => {

    const wrapper = shallow(<AppIcon name="word" size={320} />);

    expect(wrapper).toMatchSnapshot();
 
}

)  



