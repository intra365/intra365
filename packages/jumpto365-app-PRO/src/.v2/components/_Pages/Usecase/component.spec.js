import React, { Component } from 'react';

import UsecasePage from '.'

test('Check that it renders', () => {

    const wrapper = shallow(<UsecasePage name="word" />);

    expect(wrapper).toMatchSnapshot();
 
}

)