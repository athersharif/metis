import React from 'react';
import { mount } from 'enzyme';
import withGoogleSheets from '../withGoogleSheets';

const Component = () => <div />;
const CustomLoadErrorComponent = () => <div />;

const mockDataContext = (context) => {
  const mockContext = React.createContext(context);
  jest.mock('../GoogleSheetsProvider', () => ({
    DataContext: mockContext,
  }));
};

describe('withGoogleSheets', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should render the DefaultLoadErrorComponent when no context and no load error component specified', () => {
    console.error = jest.fn();
    const context = {
      db: undefined,
      error: {
        code: 400,
        message: 'some error',
      },
    };

    mockDataContext(context);

    const WrappedComponent = withGoogleSheets('sheetName')(Component);
    const component = mount(<WrappedComponent />);

    const loadErrorComponent = component.find('DefaultLoadErrorComponent');
    expect(console.error).toHaveBeenCalledWith(context.error);

    expect(loadErrorComponent.exists()).toBe(true);
  });

  it('should render the DefaultLoadErrorComponent per config when no context and no load error component specified', () => {
    console.error = jest.fn();
    const config = {
      dataLoadError: {
        className: 'my-custom-title',
        message: 'my custom error message',
        title: 'My Custom Title',
      },
    };

    const context = {
      db: undefined,
      error: {
        code: 400,
        message: 'some error',
      },
    };

    mockDataContext(context);

    const WrappedComponent = withGoogleSheets('sheetName', config)(Component);
    const component = mount(<WrappedComponent />, { context });

    const loadErrorComponent = component.find('DefaultLoadErrorComponent');

    expect(loadErrorComponent.exists()).toBe(true);
    expect(loadErrorComponent.prop('config')).toEqual(config.dataLoadError);
    expect(console.error).toHaveBeenCalledWith(context.error);

    component.unmount();
  });

  it('should render the CustomLoadErrorComponent per config when no context and load error component specified', () => {
    const config = {
      dataLoadError: {
        component: CustomLoadErrorComponent,
      },
    };

    const context = {
      db: undefined,
      error: {
        code: 400,
        message: 'some error',
      },
    };

    mockDataContext(context);

    const WrappedComponent = withGoogleSheets('sheetName', config)(Component);
    const component = mount(<WrappedComponent />, { context });

    expect(component.find('CustomLoadErrorComponent').exists()).toBe(true);
    expect(console.error).toHaveBeenCalledWith(context.error);

    component.unmount();
  });

  it('should render the Component when context exists', () => {
    const context = {
      db: {
        sheetName: [{ id: 1 }],
      },
    };

    mockDataContext(context);

    const WrappedComponent = withGoogleSheets('sheetName')(Component);
    const component = mount(<WrappedComponent />);

    const mainComponent = component.find('Component');

    expect(mainComponent.exists()).toBe(true);
    expect(mainComponent.prop('db')).toEqual(context.db);

    component.unmount();
  });

  it('should render the Component with multiple sheets data when array of sheet names is provided', () => {
    const context = {
      db: {
        sheetName: [{ id: 1 }],
        someOtherSheet: [{ id: 4 }],
      },
    };

    mockDataContext(context);

    const WrappedComponent = withGoogleSheets(['sheetName', 'someOtherSheet'])(
      Component
    );
    const component = mount(<WrappedComponent />, { context });

    const mainComponent = component.find('Component');

    expect(mainComponent.exists()).toBe(true);
    expect(mainComponent.prop('db')).toEqual(context.db);

    component.unmount();
  });

  it('should render the Component with all sheets data when * is provided', () => {
    const context = {
      db: {
        sheetName: [{ id: 1 }],
        someOtherSheet: [{ id: 4 }],
      },
    };

    mockDataContext(context);

    const WrappedComponent = withGoogleSheets('*')(Component);
    const component = mount(<WrappedComponent />, { context });

    const mainComponent = component.find('Component');

    expect(mainComponent.exists()).toBe(true);
    expect(mainComponent.prop('db')).toEqual(context.db);

    component.unmount();
  });

  it('should render the Component with all sheets data when no argument is provided', () => {
    const context = {
      db: {
        sheetName: [{ id: 1 }],
        someOtherSheet: [{ id: 4 }],
      },
    };

    mockDataContext(context);

    const WrappedComponent = withGoogleSheets()(Component);
    const component = mount(<WrappedComponent />, { context });

    const mainComponent = component.find('Component');

    expect(mainComponent.exists()).toBe(true);
    expect(mainComponent.prop('db')).toEqual(context.db);

    component.unmount();
  });

  it('should render the Component with unchanged results when sheet empty', () => {
    const context = {
      db: {
        sheetName: [{ id: 1 }],
      },
    };

    mockDataContext(context);

    const WrappedComponent = withGoogleSheets(['sheetName', null])(Component);
    const component = mount(<WrappedComponent />, { context });

    const mainComponent = component.find('Component');

    expect(mainComponent.exists()).toBe(true);
    expect(mainComponent.prop('db')).toEqual(context.db);

    component.unmount();
  });

  it("should render the Component with unchanged results when sheet doesn't exist", () => {
    console.error = jest.fn();
    const context = {
      db: {
        sheetName: [{ id: 1 }],
      },
    };

    mockDataContext(context);

    const WrappedComponent = withGoogleSheets([
      'sheetName',
      'someSheetThatDoesntExist',
    ])(Component);
    const component = mount(<WrappedComponent />);

    const mainComponent = component.find('Component');

    expect(mainComponent.exists()).toBe(true);
    expect(mainComponent.prop('db')).toEqual(context.db);
    expect(console.error).toHaveBeenCalledWith(
      '[METIS]: data for someSheetThatDoesntExist was empty'
    );

    component.unmount();
  });
});
