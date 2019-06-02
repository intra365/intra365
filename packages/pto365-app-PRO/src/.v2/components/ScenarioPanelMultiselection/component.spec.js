import React, { Component } from 'react';

import ScenarioPanelMultiSelection from '.'

test('Check that it renders', () => {

    const wrapper = shallow(<ScenarioPanelMultiSelection  scenarios={[mocks.scenariosPanel(),mocks.scenariosPanel()]}/>);

    expect(wrapper).toMatchSnapshot();
 
}

)