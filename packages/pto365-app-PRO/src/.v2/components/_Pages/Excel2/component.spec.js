import React, { Component } from 'react';

import ExcelPage2 from '.'

test('Check that it renders', () => {

    const wrapper = shallow(<ExcelPage2 />);

    expect(wrapper).toMatchSnapshot();
 
}

)