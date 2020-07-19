import React from 'react';
import { mount } from 'enzyme';
import DefaultLoadingComponent from '../DefaultLoadingComponent';

describe('DefaultLoadingComponent', () => {
  it('should render correctly with default arguments', () => {
    const component = mount(<DefaultLoadingComponent />);

    const text = component.find('p.text');
    const className = component.find('div').prop('className');

    expect(text.text()).toEqual('Loading...');
    expect(className).toEqual('data-loading');

    component.unmount();
  });

  it('should render correctly with empty config argument', () => {
    const config = {};

    const component = mount(<DefaultLoadingComponent config={config} />);

    const text = component.find('p.text');
    const className = component.find('div').prop('className');

    expect(text.text()).toEqual('Loading...');
    expect(className).toEqual('data-loading');

    component.unmount();
  });

  it('should render correctly with custom class name', () => {
    const config = { className: 'my-custom-class' };

    const component = mount(<DefaultLoadingComponent config={config} />);

    const className = component.find('div').prop('className');

    expect(className).toEqual(config.className);

    component.unmount();
  });

  it('should render correctly with custom text', () => {
    const config = { text: 'my custom error text' };

    const component = mount(<DefaultLoadingComponent config={config} />);

    const text = component.find('p.text');

    expect(text.text()).toEqual(config.text);

    component.unmount();
  });

  it('should render correctly with custom config arguments', () => {
    const config = {
      className: 'my-custom-title',
      text: 'my custom loading text',
    };

    const component = mount(<DefaultLoadingComponent config={config} />);

    const text = component.find('p.text');
    const className = component.find('div').prop('className');

    expect(text.text()).toEqual(config.text);
    expect(className).toEqual(config.className);

    component.unmount();
  });
});
