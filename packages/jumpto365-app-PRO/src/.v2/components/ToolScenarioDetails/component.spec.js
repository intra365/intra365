import React, { Component } from 'react';

import ToolScenarioDetails from '.'

test('Check that it renders', () => {

    const wrapper = shallow(<ToolScenarioDetails domain="office365" area="SharePoint" name="Increase employee engagement of firstline workers" language="en"  />);

    expect(wrapper).toMatchSnapshot();
 
}

)