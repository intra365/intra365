import React, { Component } from 'react';
import ScenarioListWithFilter from '.'
import TestData from '../../data/TestData'

test('Find a filter item', () => {

    const wrapper = shallow(<ScenarioListWithFilter areas={TestData.areas}  tools={TestData.tools} tasks={TestData.tasks}/>);
    
    
    expect(wrapper).toMatchSnapshot();
 
}

)