import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, cleanup } from '@testing-library/react';
import DefaultLoadingComponent from '../DefaultLoadingComponent';

afterEach(cleanup);

describe('DefaultLoadingComponent', () => {
  test('renders correctly with default arguments', () => {
    const config = {};
    const { container } = render(<DefaultLoadingComponent config={config} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(container.querySelector('div').className).toBe('data-loading');
  });

  test('renders correctly with empty config argument', () => {
    const { container } = render(<DefaultLoadingComponent config={{}} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(container.querySelector('div').className).toBe('data-loading');
  });

  test('renders correctly with custom class name', () => {
    const config = { className: 'my-custom-class' };
    const { container } = render(<DefaultLoadingComponent config={config} />);
    expect(container.querySelector('div').className).toBe(config.className);
  });

  test('renders correctly with custom text', () => {
    const config = { text: 'my custom error text' };
    render(<DefaultLoadingComponent config={config} />);
    expect(screen.getByText(config.text)).toBeInTheDocument();
  });

  test('renders correctly with custom config arguments', () => {
    const config = {
      className: 'my-custom-title',
      text: 'my custom loading text',
    };
    const { container } = render(<DefaultLoadingComponent config={config} />);
    expect(screen.getByText(config.text)).toBeInTheDocument();
    expect(container.querySelector('div').className).toBe(config.className);
  });
});
