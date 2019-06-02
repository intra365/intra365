import React, { Component } from 'react';

import Markdown from '.'

test('Check that it renders', () => {
    const wrapper =  Markdown(mocks.markdown(),mocks.url())
    expect(wrapper).toMatchSnapshot();
})


test('Check that it supports frontpage mode', () => {
    const wrapper =  Markdown(mocks.markdown(),mocks.url(),"",1,true)
    expect(wrapper).toMatchSnapshot();
})