import React, { Component } from 'react';

import TOC from '.'

test('Check that it renders', () => {
    const wrapper =  TOC(mocks.TOC(),mocks.url())
    expect(wrapper).toMatchSnapshot();
})


test('Check that it supports frontpage mode', () => {
    const wrapper =  TOC(mocks.TOC(),mocks.url(),"",1,true)
    expect(wrapper).toMatchSnapshot();
})