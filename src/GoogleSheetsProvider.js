/**
 *
 * Google Sheets Provider for the React app
 *
 * metis <https://github.com/athersharif/metis>
 *
 * Copyright (c) 2019-Present, Ather Sharif.
 * Released under the MIT License.
 *
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import flatMap from 'lodash/flatMap';
import DefaultLoadingComponent from './DefaultLoadingComponent';

export const DataContext = React.createContext({
  db: null,
  error: null,
  refetch: null,
});

/**
 *
 * Provider for the React App
 *
 * @param {object} [config={}] The config for the HOC
 * @param {object} [config.dataLoading={}] The config for the Load Error Component.
 * @param {function} [config.dataLoading.component] The custom component to render when loading results from Google Sheets.
 * @param {string} [config.dataLoading.className="data-load-error"] The class name of the Component for custom styling and control.
 * @param {string} [config.dataLoading.text="Loading..."] The text to display when loading results, rendered as a `P` tag.
 * @param {string} [config.sheetId=null] The Google Sheets Document ID to fetch data from.
 * @param {string} [config.sheetApiKey=null] The Google Sheets API Key to use for authentication.
 * @param {string} [config.driveId=null] The Google Drive Document ID to check for last modified time.
 * @param {string} [config.driveApiKey=null] The Google Drive API Key to use for authentication.
 *
 */
class GoogleSheetsProvider extends Component {
  static propTypes = {
    children: PropTypes.node,
    config: PropTypes.object,
  };

  constructor() {
    super();
    this.state = {
      db: null,
      error: null,
      refetch: this.refetch,
    };
  }

  componentDidMount() {
    /**
     *
     * Constructs the URL for Google Sheets API using the DOC ID and API KEY passed in the configs.
     *
     */
    this.sheetsApiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${this.props?.config?.sheetId}?includeGridData=true&fields=sheets(data%2FrowData%2Fvalues%2FformattedValue%2Cproperties%2Ftitle)&key=${this.props?.config?.sheetApiKey}`;

    /**
     *
     * Constructs the URL for Google Drive API using the DOC ID and API KEY passed in the configs.
     *
     */
    this.driveApiUrl = `https://www.googleapis.com/drive/v3/files/${this.props?.config?.driveId}?fields=modifiedTime&key=${this.props?.config?.driveApiKey}`;

    this.fetchData();
  }

  /**
   * Fetches Google Sheets data.
   */
  fetchData = () => {
    fetch(this.sheetsApiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          this.setState({ error: data.error });
        } else {
          this.setState({ db: this.processData(data) });
        }
      })
      .catch((error) => console.error(error));
  };

  refetch = () => this.fetchData();

  /**
   *
   * Processes the raw data from the Google Sheets API into a readable key/value format accessible via `withGoogleSheets` HOC.
   *
   * @param {object} data
   * @param {array} data.sheets Raw sheets data from the Google Sheets API
   *
   */
  processData = ({ sheets }) => {
    let result = {};

    sheets.forEach((sheet) => {
      const {
        properties: { title: id },
        data,
      } = sheet;

      if (data[0].rowData) {
        let [headerRow, ...records] = data[0].rowData;
        headerRow = flatMap(headerRow.values, (row) => row.formattedValue);
        result = {
          ...result,
          [id]: records.map((record) => {
            let result = {};

            headerRow.forEach((value, index) => {
              result = {
                [value]: record.values[index]
                  ? record.values[index].formattedValue
                  : null,
                ...result,
              };
            });

            return result;
          }),
        };
      } else {
        result = {
          ...result,
          [id]: null,
        };
      }
    });

    return result;
  };

  render() {
    const { config } = this.props;
    const loadingComponentConfig =
      config && config.dataLoading ? config.dataLoading : {};
    const LoadingComponent = loadingComponentConfig.component
      ? loadingComponentConfig.component
      : DefaultLoadingComponent;

    return this.state.db || this.state.error ? (
      <DataContext.Provider value={this.state}>
        {this.props.children}
      </DataContext.Provider>
    ) : (
      <LoadingComponent config={loadingComponentConfig} />
    );
  }
}

export default GoogleSheetsProvider;
