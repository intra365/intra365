import React, { Component } from 'react';

import FileUpload from '.'

test('Check that it renders', () => {

    const wrapper = shallow(<FileUpload about="🍕"/>);

    expect(wrapper).toMatchSnapshot();
 
}

)