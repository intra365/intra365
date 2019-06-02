import React, { Component } from 'react';

import ToolDetails from '.'

test('Check that it renders', () => {


    var data = mocks.toolData()
    const wrapper = shallow(<ToolDetails x toolData={data}/>);

    expect(wrapper).toMatchSnapshot();
 
}

)