import React from 'react';
import { mount } from 'enzyme';
import 'babel-polyfill';
import GoogleSheetsProvider from '../GoogleSheetsProvider';

const response = {
  sheets: [
    {
      properties: { title: 'home' },
      data: [
        {
          rowData: [
            {
              values: [{ formattedValue: 'id' }, { formattedValue: 'name' }]
            },
            {
              values: [{ formattedValue: '1' }]
            }
          ]
        }
      ]
    }
  ]
};

const result = {
  db: {
    home: [{ id: '1', name: null }]
  }
};

describe('GoogleSheetsProvider', () => {
  it('should render db context', async done => {
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

      expect(context).toEqual(result);

      done();

      component.unmount();
    });
  });

  it('should should log error when fetch fails', async done => {
    fetch.mockRejectOnce('some error');
    console.log = jest.fn();

    const component = mount(
      <GoogleSheetsProvider>
        <div />
      </GoogleSheetsProvider>
    );

    setImmediate(() => {
      expect(console.log).toHaveBeenCalledWith('some error');

      done();

      component.unmount();
    });
  });
});
