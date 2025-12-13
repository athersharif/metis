import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, cleanup } from '@testing-library/react';
import DefaultLoadErrorComponent from '../DefaultLoadErrorComponent';

afterEach(cleanup);

describe('DefaultLoadErrorComponent', () => {
  test('renders correctly with default arguments', () => {
    const { container } = render(<DefaultLoadErrorComponent config={{}} />);

    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(
      'Data Load Error'
    );
    expect(
      screen.getByText('An error occurred fetching records from Google Sheets')
    ).toBeInTheDocument();
    expect(container.querySelector('div').className).toBe('data-load-error');
  });

  test('renders correctly with empty config argument', () => {
    const { container } = render(<DefaultLoadErrorComponent config={{}} />);

    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(
      'Data Load Error'
    );
    expect(
      screen.getByText('An error occurred fetching records from Google Sheets')
    ).toBeInTheDocument();
    expect(container.querySelector('div').className).toBe('data-load-error');
  });

  test('renders correctly with custom class name', () => {
    const config = { className: 'my-custom-class' };
    const { container } = render(<DefaultLoadErrorComponent config={config} />);

    expect(container.querySelector('div').className).toBe(config.className);
  });

  test('renders correctly with custom title', () => {
    const config = { title: 'My Custom Title' };
    render(<DefaultLoadErrorComponent config={config} />);

    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(
      config.title
    );
  });

  test('renders correctly with custom message', () => {
    const config = { message: 'my custom error message' };
    render(<DefaultLoadErrorComponent config={config} />);

    expect(screen.getByText(config.message)).toBeInTheDocument();
  });

  test('renders correctly with custom config arguments', () => {
    const config = {
      className: 'my-custom-title',
      message: 'my custom error message',
      title: 'My Custom Title',
    };
    const { container } = render(<DefaultLoadErrorComponent config={config} />);

    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(
      config.title
    );
    expect(screen.getByText(config.message)).toBeInTheDocument();
    expect(container.querySelector('div').className).toBe(config.className);
  });
});
