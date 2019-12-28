/**
 *
 * withGoogleSheets HOC to fetch results per sheet
 *
 * react-db-google-sheets <https://github.com/athersharif/react-db-google-sheets>
 *
 * Copyright (c) 2019-Present, Ather Sharif.
 * Released under the MIT License.
 *
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import DefaultLoadErrorComponent from './DefaultLoadErrorComponent';

/**
 *
 * Higher-Order Component to fetch data from Google Sheets.
 *
 * @param {string} sheet The name of the Google Sheets sheet.
 * @param {object} [config={}] The config for the HOC
 * @param {object} [config.dataLoadError={}] The config for the Load Error Component.
 * @param {function} [config.dataLoadError.component] The custom component to render when unable to fetch from Google Sheets.
 * @param {string} [config.dataLoadError.className="data-load-error"] The class name of the Component for custom styling and control.
 * @param {string} [config.dataLoadError.message="An error occurred fetching records from Google Sheets"] The error message to display when unable to fetch results, rendered as a `P` tag.
 * @param {string} [config.dataLoadError.title="Data Load Error"] The title to display, rendered as an `H1` tag
 *
 */
const withGoogleSheets = (sheet, config = {}) => WrappedComponent =>
  class extends Component {
    displayName = 'DBGoogleSheets';

    static propTypes = {
      db: PropTypes.object
    };

    static contextTypes = {
      db: PropTypes.object
    };

    render() {
      let result = this.props.db || {};
      const { db } = this.context;

      const data = get(db, sheet);

      if (data) {
        result[sheet] = data;
      }

      const errorComponentConfig = config.dataLoadError || {};
      const LoadErrorComponent = errorComponentConfig.component
        ? errorComponentConfig.component
        : DefaultLoadErrorComponent;

      return db && result ? (
        <WrappedComponent {...this.props} db={result} />
      ) : (
        <LoadErrorComponent config={errorComponentConfig} />
      );
    }
  };

export default withGoogleSheets;
