import React, { act } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GoogleSheetsProvider, { DataContext } from '../GoogleSheetsProvider';

beforeEach(() => {
  jest.restoreAllMocks();
  localStorage.clear();
  global.fetch = jest.fn();
});

const config = {
  sheetId: 'sheet-id',
  sheetApiKey: 'sheet-key',
  driveId: 'drive-id',
  driveApiKey: 'drive-key',
};

const Consumer = () => (
  <DataContext.Consumer>
    {(ctx) => (
      <>
        <pre data-testid="context">{JSON.stringify(ctx)}</pre>
        <button data-testid="refetch" onClick={ctx.refetch}>
          refetch
        </button>
      </>
    )}
  </DataContext.Consumer>
);

const sheetsResponse = {
  sheets: [
    {
      properties: { title: 'home' },
      data: [
        {
          rowData: [
            { values: [{ formattedValue: 'id' }, { formattedValue: 'name' }] },
            { values: [{ formattedValue: '1' }, { formattedValue: null }] },
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

const updatedSheetsResponse = {
  sheets: [
    {
      properties: { title: 'home' },
      data: [
        {
          rowData: [
            { values: [{ formattedValue: 'id' }, { formattedValue: 'name' }] },
            { values: [{ formattedValue: '1' }, { formattedValue: null }] },
            { values: [{ formattedValue: '2' }, { formattedValue: null }] },
          ],
        },
      ],
    },
  ],
};

test('renders loading component initially', async () => {
  fetch.mockResolvedValueOnce({
    json: async () => sheetsResponse,
  });

  render(
    <GoogleSheetsProvider config={config}>
      <Consumer />
    </GoogleSheetsProvider>
  );
  
  await waitFor(() =>
    expect(screen.queryByTestId('context')).not.toBeInTheDocument()
  );
});

test('fetches sheets on mount and provides processed data', async () => {
  fetch.mockResolvedValueOnce({
    json: async () => sheetsResponse,
  });

  render(
    <GoogleSheetsProvider config={config}>
      <Consumer />
    </GoogleSheetsProvider>
  );

  await waitFor(() =>
    expect(screen.getByTestId('context')).toBeInTheDocument()
  );

  const ctx = JSON.parse(screen.getByTestId('context').textContent);

  expect(ctx.db).toEqual({
    home: [{ id: '1', name: null }],
    emptysheet: null,
  });
  expect(ctx.error).toBeNull();
});

test('refetch refetches sheets when modified', async () => {
  fetch.mockResolvedValueOnce({
    json: async () => sheetsResponse,
  });

  render(
    <GoogleSheetsProvider config={config}>
      <Consumer />
    </GoogleSheetsProvider>
  );

  await waitFor(() => screen.getByTestId('refetch'));

  fetch.mockResolvedValueOnce({
    json: async () => updatedSheetsResponse,
  });  

  act(() => {
    fireEvent.click(screen.getByTestId('refetch'));
  });

  await waitFor(() => {
    const ctx = JSON.parse(screen.getByTestId('context').textContent);
    expect(ctx.db.home).toHaveLength(2);
  });
});

test('sets error state when sheets API returns error', async () => {
  fetch.mockResolvedValueOnce({
    json: async () => ({ error: 'boom' }),
  });

  render(
    <GoogleSheetsProvider config={config}>
      <Consumer />
    </GoogleSheetsProvider>
  );

  await waitFor(() => {
    const ctx = JSON.parse(screen.getByTestId('context').textContent);
    expect(ctx.error).toBe('boom');
  });
});

test('handles fetch errors gracefully', async () => {
  jest.spyOn(console, 'error').mockImplementation(() => {});

  fetch.mockRejectedValueOnce(new Error('network'));

  render(
    <GoogleSheetsProvider config={config}>
      <Consumer />
    </GoogleSheetsProvider>
  );

  await waitFor(() =>
    expect(screen.queryByTestId('context')).not.toBeInTheDocument()
  );
});
