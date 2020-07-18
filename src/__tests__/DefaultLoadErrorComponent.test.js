import React from 'react';
import { mount } from 'enzyme';
import DefaultLoadErrorComponent from '../DefaultLoadErrorComponent';

describe('DefaultLoadErrorComponent', () => {
  it('should render correctly with default arguments', () => {
    const component = mount(<DefaultLoadErrorComponent />);

    const title = component.find('h1.title');
    const message = component.find('p.message');
    const className = component.find('div').prop('className');

    expect(title.text()).toEqual('Data Load Error');
    expect(message.text()).toEqual(
      'An error occurred fetching records from Google Sheets'
    );
    expect(className).toEqual('data-load-error');

    component.unmount();
  });

  it('should render correctly with empty config argument', () => {
    const config = {};

    const component = mount(<DefaultLoadErrorComponent config={config} />);

    const title = component.find('h1.title');
    const message = component.find('p.message');
    const className = component.find('div').prop('className');

    expect(title.text()).toEqual('Data Load Error');
    expect(message.text()).toEqual(
      'An error occurred fetching records from Google Sheets'
    );
    expect(className).toEqual('data-load-error');

    component.unmount();
  });

  it('should render correctly with custom class name', () => {
    const config = { className: 'my-custom-class' };

    const component = mount(<DefaultLoadErrorComponent config={config} />);

    const className = component.find('div').prop('className');

    expect(className).toEqual(config.className);

    component.unmount();
  });

  it('should render correctly with custom title', () => {
    const config = { title: 'My Custom Title' };

    const component = mount(<DefaultLoadErrorComponent config={config} />);

    const title = component.find('h1.title');

    expect(title.text()).toEqual(config.title);

    component.unmount();
  });

  it('should render correctly with custom message', () => {
    const config = { message: 'my custom error message' };

    const component = mount(<DefaultLoadErrorComponent config={config} />);

    const message = component.find('p.message');

    expect(message.text()).toEqual(config.message);

    component.unmount();
  });

  it('should render correctly with custom config arguments', () => {
    const config = {
      className: 'my-custom-title',
      message: 'my custom error message',
      title: 'My Custom Title',
    };

    const component = mount(<DefaultLoadErrorComponent config={config} />);

    const title = component.find('h1.title');
    const message = component.find('p.message');
    const className = component.find('div').prop('className');

    expect(title.text()).toEqual(config.title);
    expect(message.text()).toEqual(config.message);
    expect(className).toEqual(config.className);

    component.unmount();
  });
});
