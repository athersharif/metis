import React from 'react';
import { mount, shallow } from 'enzyme';
import 'babel-polyfill';
import GoogleSheetsProvider from '../GoogleSheetsProvider';

const Component = () => <div />;
const CustomLoadingComponent = () => <div />;

const response = {
  sheets: [
    {
      properties: { title: 'home' },
      data: [
        {
          rowData: [
            {
              values: [{ formattedValue: 'id' }, { formattedValue: 'name' }],
            },
            {
              values: [{ formattedValue: '1' }],
            },
          ],
        },
      ],
    },
    {
      properties: { title: 'emptysheet' },
      data: [{}],
    },
  ],
};

const refetch = jest.fn();

const result = {
  db: {
    home: [{ id: '1', name: null }],
    emptysheet: null,
  },
  error: null,
  refetch,
};

const errorResponse = {
  error: {
    code: 403,
    message: 'some error happened',
  },
  refetch,
};

const errorResult = {
  db: null,
  error: {
    code: 403,
    message: 'some error happened',
  },
  refetch,
};

describe('GoogleSheetsProvider', () => {
  it('should render db context', (done) => {
    fetch.mockResponseOnce(JSON.stringify(response));

    const component = shallow(
      <GoogleSheetsProvider>
        <Component />
      </GoogleSheetsProvider>
    );

    setImmediate(() => {
      const context = component.update().props().value;

      expect(context.db).toEqual(result.db);
      expect(context.error).toEqual(result.error);
      expect(context.refetch).toEqual(expect.any(Function));
      expect(component.find('ContextProvider').exists()).toBe(true);

      done();

      component.unmount();
    });
  });

  it('should render error context on error', (done) => {
    fetch.mockResponseOnce(JSON.stringify(errorResponse));

    const component = shallow(
      <GoogleSheetsProvider>
        <div />
      </GoogleSheetsProvider>
    );

    setImmediate(() => {
      const context = component.update().props().value;

      expect(context.db).toEqual(errorResult.db);
      expect(context.error).toEqual(errorResult.error);

      done();

      component.unmount();
    });
  });

  it('should should log error when fetch fails', (done) => {
    fetch.mockRejectOnce('some error');
    console.error = jest.fn();

    const component = shallow(
      <GoogleSheetsProvider>
        <div />
      </GoogleSheetsProvider>
    );

    setImmediate(() => {
      component.update();

      expect(console.error).toHaveBeenCalledWith('some error');

      done();

      component.unmount();
    });
  });

  it('should refetch data when refetch is called', (done) => {
    fetch.mockResponseOnce(JSON.stringify(response));

    const component = shallow(
      <GoogleSheetsProvider>
        <div />
      </GoogleSheetsProvider>
    );

    setImmediate(async () => {
      let context = component.update().props().value;

      const newResponse = response;
      newResponse.sheets[0].data[0].rowData.push({
        values: [{ formattedValue: '2' }],
      });

      const newResult = result;
      newResult.db.home.push({ id: '2', name: null });

      fetch.mockResponseOnce(JSON.stringify(newResponse));

      await context.refetch();

      setImmediate(() => {
        context = component.update().props().value;

        expect(context.db).toEqual(newResult.db);
        expect(context.error).toEqual(newResult.error);

        done();

        component.unmount();
      });
    });
  });

  it('should render the DefaultLoadingComponent per config when no context and no loading component specified', (done) => {
    const config = {
      dataLoading: {
        className: 'my-custom-title',
        message: 'my custom error message',
        title: 'My Custom Title',
      },
    };

    fetch.mockResponseOnce(JSON.stringify(response));

    const component = mount(
      <GoogleSheetsProvider config={config}>
        <div />
      </GoogleSheetsProvider>
    );

    const loadingComponent = component.find('DefaultLoadingComponent');

    expect(loadingComponent.exists()).toBe(true);
    expect(loadingComponent.prop('config')).toEqual(config.dataLoading);

    setImmediate(() => {
      done();

      component.unmount();
    });
  });

  it('should render the CustomLoadingComponent per config when no loading component specified', (done) => {
    const config = {
      dataLoading: {
        component: CustomLoadingComponent,
      },
    };

    fetch.mockResponseOnce(JSON.stringify(response));

    const component = mount(
      <GoogleSheetsProvider config={config}>
        <div />
      </GoogleSheetsProvider>
    );

    expect(component.find('CustomLoadingComponent').exists()).toBe(true);

    setImmediate(() => {
      done();

      component.unmount();
    });
  });
});
