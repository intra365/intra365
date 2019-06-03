import React, { Component } from 'react';
import fs from "fs"
import ExcelExplorer from '.'

test('Check that it renders', () => {


    const wrapper = shallow(<ExcelExplorer excel={mocks.excelData()}/>);

    expect(wrapper).toMatchSnapshot();
 
}

)