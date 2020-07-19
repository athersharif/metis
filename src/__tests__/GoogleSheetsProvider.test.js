import React from 'react';
import { mount } from 'enzyme';
import 'babel-polyfill';
import GoogleSheetsProvider from '../GoogleSheetsProvider';

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
  it('should render db context', async (done) => {
    fetch.mockResponseOnce(JSON.stringify(response));

    const component = mount(
      <GoogleSheetsProvider>
        <div />
      </GoogleSheetsProvider>
    );

    setImmediate(() => {
      const context = component
        .find(GoogleSheetsProvider)
        .instance()
        .getChildContext();

      expect(context.db).toEqual(result.db);
      expect(context.error).toEqual(result.error);      
      expect(context.refetch).toEqual(expect.any(Function));
      expect(component.find('DefaultLoadingComponent').exists()).toBe(true);

      done();

      component.unmount();
    });
  });

  it('should render error context on error', async (done) => {
    fetch.mockResponseOnce(JSON.stringify(errorResponse));

    const component = mount(
      <GoogleSheetsProvider>
        <div />
      </GoogleSheetsProvider>
    );

    setImmediate(() => {
      const context = component
        .find(GoogleSheetsProvider)
        .instance()
        .getChildContext();

      expect(context.db).toEqual(errorResult.db);
      expect(context.error).toEqual(errorResult.error);            

      done();

      component.unmount();
    });
  });

  it('should should log error when fetch fails', async (done) => {
    fetch.mockRejectOnce('some error');
    console.error = jest.fn();

    const component = mount(
      <GoogleSheetsProvider>
        <div />
      </GoogleSheetsProvider>
    );

    setImmediate(() => {
      expect(console.error).toHaveBeenCalledWith('some error');

      done();

      component.unmount();
    });
  });

  it('should refetch data when refetch is called', async (done) => {
    fetch.mockResponseOnce(JSON.stringify(response));

    const newResponse = response;
    newResponse.sheets[0].data[0].rowData.push({
      values: [{ formattedValue: '2' }],        
    });

    const newResult = result;
    newResult.db.home.push({ id: '2', name: null });

    const component = mount(
      <GoogleSheetsProvider>
        <div />
      </GoogleSheetsProvider>
    );

    setImmediate(() => {
      let context = component
        .find(GoogleSheetsProvider)
        .instance()
        .getChildContext();

      fetch.mockResponseOnce(JSON.stringify(newResponse));

      context.refetch();

      setImmediate(() => {
        context = component
        .find(GoogleSheetsProvider)
        .instance()
        .getChildContext();

      expect(context.db).toEqual(newResult.db);
      expect(context.error).toEqual(newResult.error);      

      done();

      component.unmount();
      })
    });
  });

  it('should render the DefaultLoadingComponent per config when no context and no loading component specified', async (done) => {
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

    setImmediate(() => {
      const loadingComponent = component.find('DefaultLoadingComponent');

      expect(loadingComponent.exists()).toBe(true);
      expect(loadingComponent.prop('config')).toEqual(config.dataLoading);

      done();

      component.unmount();
    });
  });

  it('should render the CustomLoadingComponent per config when no loading component specified', async (done) => {
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

    setImmediate(() => {
      expect(component.find('CustomLoadingComponent').exists()).toBe(true);

      done();

      component.unmount();
    });
  });
});
