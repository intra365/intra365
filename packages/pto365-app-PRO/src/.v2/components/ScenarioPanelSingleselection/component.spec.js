import React, { Component } from 'react';

import ScenarioPanelSingleSelection from '.'

test('Check that it renders', () => {

    const wrapper = shallow(<ScenarioPanelSingleSelection  scenario={mocks.scenario()}/>);

    expect(wrapper).toMatchSnapshot();
 
}

)