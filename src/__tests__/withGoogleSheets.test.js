import React from 'react';
import PropTypes from 'prop-types';
import '@testing-library/jest-dom';
import { render, screen, cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
  jest.resetModules();
});

const makeMockDataContext = (context) => {
  const mockContext = React.createContext(context);
  jest.doMock('../GoogleSheetsProvider', () => ({ DataContext: mockContext }));
};

describe('withGoogleSheets (RTL)', () => {
  test('renders DefaultLoadErrorComponent when no context and no load error component specified', async () => {
    console.error = jest.fn();
    const context = { db: undefined, error: { code: 400, message: 'some error' } };

    makeMockDataContext(context);
    const { default: withGoogleSheets } = require('../withGoogleSheets');

    const Component = () => <div />;
    const Wrapped = withGoogleSheets('sheetName')(Component);

    render(<Wrapped />);

    expect(console.error).toHaveBeenCalledWith(context.error);
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Data Load Error: HTTP Status: 400');
  });

  test('renders DefaultLoadErrorComponent per config when specified', () => {
    console.error = jest.fn();
    const config = {
      dataLoadError: {
        className: 'my-custom-title',
        message: 'my custom error message',
        title: 'My Custom Title',
      },
    };
    const context = { db: undefined, error: { code: 400, message: 'some error' } };

    makeMockDataContext(context);
    const { default: withGoogleSheets } = require('../withGoogleSheets');

    const Component = () => <div />;
    const Wrapped = withGoogleSheets('sheetName', config)(Component);

    render(<Wrapped />);

    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(config.dataLoadError.title);
    expect(screen.getByText(config.dataLoadError.message)).toBeInTheDocument();
    expect(console.error).toHaveBeenCalledWith(context.error);
  });

  test('renders CustomLoadErrorComponent per config when provided', () => {
    const config = { dataLoadError: { component: () => <div data-testid="custom-load-error" /> } };
    const context = { db: undefined, error: { code: 400, message: 'some error' } };

    makeMockDataContext(context);
    const { default: withGoogleSheets } = require('../withGoogleSheets');

    const Component = () => <div />;
    const Wrapped = withGoogleSheets('sheetName', config)(Component);

    render(<Wrapped />);

    expect(screen.getByTestId('custom-load-error')).toBeInTheDocument();
    expect(console.error).toHaveBeenCalledWith(context.error);
  });

  test('renders wrapped Component when context exists', () => {
    const context = { db: { sheetName: [{ id: 1 }] } };

    makeMockDataContext(context);
    const { default: withGoogleSheets } = require('../withGoogleSheets');

    const Component = ({ db }) => <pre data-testid="db">{JSON.stringify(db)}</pre>;
    Component.propTypes = { db: PropTypes.object };    
    const Wrapped = withGoogleSheets('sheetName')(Component);

    render(<Wrapped />);

    expect(screen.getByTestId('db')).toHaveTextContent(JSON.stringify(context.db));
  });

  test('renders wrapped Component with multiple sheets when array provided', () => {
    const context = { db: { sheetName: [{ id: 1 }], someOtherSheet: [{ id: 4 }] } };

    makeMockDataContext(context);
    const { default: withGoogleSheets } = require('../withGoogleSheets');

    const Component = ({ db }) => <pre data-testid="db">{JSON.stringify(db)}</pre>;
    Component.propTypes = { db: PropTypes.object };    
    const Wrapped = withGoogleSheets(['sheetName', 'someOtherSheet'])(Component);

    render(<Wrapped />);

    expect(screen.getByTestId('db')).toHaveTextContent(JSON.stringify(context.db));
  });

  test('renders all sheets when "*" provided', () => {
    const context = { db: { sheetName: [{ id: 1 }], someOtherSheet: [{ id: 4 }] } };

    makeMockDataContext(context);
    const { default: withGoogleSheets } = require('../withGoogleSheets');

    const Component = ({ db }) => <pre data-testid="db">{JSON.stringify(db)}</pre>;
    Component.propTypes = { db: PropTypes.object };    
    const Wrapped = withGoogleSheets('*')(Component);

    render(<Wrapped />);

    expect(screen.getByTestId('db')).toHaveTextContent(JSON.stringify(context.db));
  });

  test('renders all sheets when no argument provided', () => {
    const context = { db: { sheetName: [{ id: 1 }], someOtherSheet: [{ id: 4 }] } };

    makeMockDataContext(context);
    const { default: withGoogleSheets } = require('../withGoogleSheets');

    const Component = ({ db }) => <pre data-testid="db">{JSON.stringify(db)}</pre>;
    Component.propTypes = { db: PropTypes.object };
    const Wrapped = withGoogleSheets()(Component);

    render(<Wrapped />);

    expect(screen.getByTestId('db')).toHaveTextContent(JSON.stringify(context.db));
  });

  test('leaves results unchanged when sheet is null in the list', () => {
    const context = { db: { sheetName: [{ id: 1 }] } };

    makeMockDataContext(context);
    const { default: withGoogleSheets } = require('../withGoogleSheets');

    const Component = ({ db }) => <pre data-testid="db">{JSON.stringify(db)}</pre>;
    Component.propTypes = { db: PropTypes.object };
    const Wrapped = withGoogleSheets(['sheetName', null])(Component);

    render(<Wrapped />);

    expect(screen.getByTestId('db')).toHaveTextContent(JSON.stringify(context.db));
  });

  test("logs when sheet doesn't exist and leaves results unchanged", () => {
    console.error = jest.fn();
    const context = { db: { sheetName: [{ id: 1 }] } };

    makeMockDataContext(context);
    const { default: withGoogleSheets } = require('../withGoogleSheets');

    const Component = ({ db }) => <pre data-testid="db">{JSON.stringify(db)}</pre>;
    Component.propTypes = { db: PropTypes.object };
    const Wrapped = withGoogleSheets(['sheetName', 'someSheetThatDoesntExist'])(Component);

    render(<Wrapped />);

    expect(screen.getByTestId('db')).toHaveTextContent(JSON.stringify(context.db));
    expect(console.error).toHaveBeenCalledWith('[METIS]: data for someSheetThatDoesntExist was empty');
  });
});
