import React, { Component } from 'react';

import ToolCardLarge from '.'


test('Check that it renders', () => {


    const wrapper = shallow(<ToolCardLarge color="#264D8C" name="word" iconUrl="https://jumpto365.com/resources/images/app/Word.png"  />);


    expect(wrapper).toMatchSnapshot();
 
}

)

