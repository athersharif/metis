import React from 'react';
import { mount } from 'enzyme';
import flowRight from 'lodash/flowRight';
import withGoogleSheets from '../withGoogleSheets';

const Component = () => <div />;
const CustomLoadErrorComponent = () => <div />;
const WrappedComponent = withGoogleSheets('sheetName')(Component);

describe('withGoogleSheets', () => {
  it('should render the DefaultLoadErrorComponent when no context and no load error component specified', () => {
    const context = { db: undefined };

    const component = mount(<WrappedComponent />, { context });

    const loadErrorComponent = component.find('DefaultLoadErrorComponent');

    expect(loadErrorComponent.exists()).toBe(true);
  });

  it('should render the DefaultLoadErrorComponent per config when no context and no load error component specified', () => {
    const config = {
      dataLoadError: {
        className: 'my-custom-title',
        message: 'my custom error message',
        title: 'My Custom Title'
      }
    };
    const WrappedComponent = withGoogleSheets('sheetName', config)(Component);
    const context = { db: undefined };

    const component = mount(<WrappedComponent />, { context });

    const loadErrorComponent = component.find('DefaultLoadErrorComponent');

    expect(loadErrorComponent.exists()).toBe(true);
    expect(loadErrorComponent.prop('config')).toEqual(config.dataLoadError);

    component.unmount();
  });

  it('should render the CustomLoadErrorComponent per config when no context and load error component specified', () => {
    const config = {
      dataLoadError: {
        component: CustomLoadErrorComponent
      }
    };
    const WrappedComponent = withGoogleSheets('sheetName', config)(Component);
    const context = { db: undefined };

    const component = mount(<WrappedComponent />, { context });

    expect(component.find('CustomLoadErrorComponent').exists()).toBe(true);

    component.unmount();
  });

  it('should render the Component when context exists', () => {
    const context = {
      db: {
        sheetName: [{ id: 1 }]
      }
    };

    const component = mount(<WrappedComponent />, { context });

    const mainComponent = component.find('Component');

    expect(mainComponent.exists()).toBe(true);
    expect(mainComponent.prop('db')).toEqual(context.db);

    component.unmount();
  });

  it('should render the Component with appended data when context exists', () => {
    const context = {
      db: {
        sheetName: [{ id: 1 }],
        someOtherSheet: [{ id: 4 }]
      }
    };

    const WrappedComponent = flowRight(
      withGoogleSheets('sheetName'),
      withGoogleSheets('someOtherSheet')
    )(Component);

    const component = mount(<WrappedComponent />, { context });

    const mainComponent = component.find('Component');

    expect(mainComponent.exists()).toBe(true);
    expect(mainComponent.prop('db')).toEqual(context.db);

    component.unmount();
  });

  it('should render the Component with unchanged results when sheet empty', () => {
    const context = {
      db: {
        sheetName: [{ id: 1 }]
      }
    };

    const WrappedComponent = flowRight(
      withGoogleSheets('sheetName'),
      withGoogleSheets(null)
    )(Component);
    const component = mount(<WrappedComponent />, { context });

    const mainComponent = component.find('Component');

    expect(mainComponent.exists()).toBe(true);
    expect(mainComponent.prop('db')).toEqual(context.db);

    component.unmount();
  });

  it("should render the Component with unchanged results when sheet doesn't exist", () => {
    const context = {
      db: {
        sheetName: [{ id: 1 }]
      }
    };

    const WrappedComponent = flowRight(
      withGoogleSheets('sheetName'),
      withGoogleSheets('someSheetThatDoesntExist')
    )(Component);
    const component = mount(<WrappedComponent />, { context });

    const mainComponent = component.find('Component');

    expect(mainComponent.exists()).toBe(true);
    expect(mainComponent.prop('db')).toEqual(context.db);

    component.unmount();
  });
});
