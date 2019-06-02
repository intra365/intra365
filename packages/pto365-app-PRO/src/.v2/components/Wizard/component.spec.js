import React, { Component } from 'react';

import Wizard from '.'

test('Check that it renders', () => {


    var data = mocks.toolData()
    const wrapper = shallow(<Wizard x toolData={data}/>);

    expect(wrapper).toMatchSnapshot();
 
}

)