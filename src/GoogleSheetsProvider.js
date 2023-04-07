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
    this.fetchData();
  }

  fetchData = () => {
    fetch(this.getUrl())
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
   * Constructs and returns the URL for Google Sheets API. Uses the Google Sheets ID and API key from the `REACT_APP_GOOGLE_SHEETS_DOC_ID` and `REACT_APP_GOOGLE_SHEETS_API_KEY` environment variables respectively. The environment variables should be declared as per the [Create React App guidelines](https://create-react-app.dev/docs/adding-custom-environment-variables/).
   *
   */
  getUrl = () =>
    `https://sheets.googleapis.com/v4/spreadsheets/${process.env.REACT_APP_GOOGLE_SHEETS_DOC_ID}?includeGridData=true&fields=sheets(data%2FrowData%2Fvalues%2FformattedValue%2Cproperties%2Ftitle)&key=${process.env.REACT_APP_GOOGLE_SHEETS_API_KEY}`;

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
