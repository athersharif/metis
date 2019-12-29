/**
 *
 * withGoogleSheets HOC to fetch results per sheet
 *
 * metis <https://github.com/athersharif/metis>
 *
 * Copyright (c) 2019-Present, Ather Sharif.
 * Released under the MIT License.
 *
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import isArray from 'lodash/isArray';
import DefaultLoadErrorComponent from './DefaultLoadErrorComponent';

/**
 *
 * Higher-Order Component to fetch data from Google Sheets.
 *
 * @param {(string|array)} sheets The name of the Google Sheets sheet.
 * @param {object} [config={}] The config for the HOC
 * @param {object} [config.dataLoadError={}] The config for the Load Error Component.
 * @param {function} [config.dataLoadError.component] The custom component to render when unable to fetch from Google Sheets.
 * @param {string} [config.dataLoadError.className="data-load-error"] The class name of the Component for custom styling and control.
 * @param {string} [config.dataLoadError.message="An error occurred fetching records from Google Sheets"] The error message to display when unable to fetch results, rendered as a `P` tag.
 * @param {string} [config.dataLoadError.title="Data Load Error"] The title to display, rendered as an `H1` tag
 *
 */
const withGoogleSheets = (sheets = '*', config = {}) => WrappedComponent =>
  class extends Component {
    displayName = 'DBGoogleSheets';

    static propTypes = {
      db: PropTypes.object
    };

    static contextTypes = {
      db: PropTypes.object,
      error: PropTypes.object
    };

    render() {
      let result = this.props.db || {};
      const { db, error } = this.context;

      if (error) {
        console.error(error);

        config = {
          ...config,
          dataLoadError: {
            ...(config.dataLoadError || {}),
            title:
              config.dataLoadError && config.dataLoadError.title
                ? config.dataLoadError.title
                : `Data Load Error: HTTP Status: ${error.code}`,
            message:
              config.dataLoadError && config.dataLoadError.message
                ? config.dataLoadError.message
                : error.message
          }
        };
      } else {
        if (sheets === '*') {
          result = db;
        } else {
          if (!isArray(sheets)) {
            sheets = [sheets];
          }

          sheets
            .filter(s => s)
            .forEach(sheet => {
              const data = get(db, sheet);

              if (data) {
                result[sheet] = data;
              } else {
                console.error(`[METIS]: data for ${sheet} was empty`);
              }
            });
        }
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
