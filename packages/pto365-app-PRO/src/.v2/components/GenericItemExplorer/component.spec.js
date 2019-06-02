import React, { Component } from 'react';
import GenericItemExplorer from '.'


test('Render the list with default view', () => {

    const wrapper = shallow(<GenericItemExplorer tasks={mocks.tasks()} defaultView="toolsinonecolumn"/>);
    
    
    expect(wrapper).toMatchSnapshot();
 
}

)

test('Render the list with one column for tools', () => {

    const wrapper = shallow(<GenericItemExplorer  tasks={mocks.tasks()} defaultView="toolsinonecolumn"/>);
    
    
    expect(wrapper).toMatchSnapshot();
 
}

)
test('Simulate a full render', () => {
  const wrapper = render(<GenericItemExplorer tasks={mocks.tasks()} defaultView="some thing uinkownn"/>);
    
    expect(1).toBe(1); //TODO : Make this proper
 
}

) 
