import React, { Component } from 'react';

import Excel from '.'

test('Check that it can detect WTW', () => {


    
    const format  =  Excel.detectFormat(mocks.excelData(),"for Meetings")

    expect(format).toBe("WTW");
 
}

)
test('Check that it can detect PTO', () => {


    
    const format  =  Excel.detectFormat(mocks.excelData(),"of Office365")

    expect(format).toBe("PTO");
 
}

)



test('Check that it renders', () => {




    const wrapper =  Excel.toJSON(mocks.excelData())

    expect(wrapper).toMatchSnapshot();
 
}

)