# Metis

Higher-Order Component (HOC) for React that allows using Google Sheets as a Database.

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/athersharif/metis/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/react-db-google-sheets.svg?style=flat)](https://www.npmjs.com/package/react-db-google-sheets) [![Travis](https://travis-ci.org/athersharif/metis.svg?branch=master)](https://travis-ci.org/athersharif/metis)

## Installation

```npm install react-db-google-sheets --save```

## Usage

### App.js

Wrap your App using the `GoogleSheetsProvider`:

```
import React from 'react';
import GoogleSheetsProvider from 'react-db-google-sheets';

const App = () => (
  <GoogleSheetsProvider>
    <MyApp />
  </GoogleSheetsProvider>
);

export default App;
```

### Component (say Hello.js)

Use the `withGoogleSheets` HOC to fetch the data from a given sheet into your component, `Hello.js`:

```
import React from 'react';
import PropTypes from 'prop-types';
import { withGoogleSheets } from 'react-db-google-sheets';

const Hello = props => (
  <div>
    {props.db.sheet1.map(data => (
      <span>{data.id}</span>
    ))}
  </div>
);

Hello.propTypes = {
  db: PropTypes.shape({
    sheet1: PropTypes.arrayOf(PropTypes.object)
  })
};

export default withGoogleSheets('sheet1')(Hello);
```

#### Fetching data from multiple sheets

`withGoogleSheets`, can either take a single sheet name or an array of sheet names as an argument. 

```
export default withGoogleSheets(['sheet1', 'sheet2', 'sheet3'])(Hello);
```

Fetching data from all sheets is also supported by passing `*` as the argument. Passing no argument defaults to this as well.

```
export default withGoogleSheets('*')(Hello);
```

or

```
export default withGoogleSheets()(Hello);
```

#### Error fetching data

If there was an error fetching data (for example, if the API key or DOC id was incorrect, or the DOC did not have the right permissions), by default, a basic `DefaultLoadErrorComponent` is rendered in place of the Component. The `DefaultLoadErrorComponent` looks like this:

```
const DefaultLoadErrorComponent = ({ config }) => (
  <div className={config.className || DEFAULTS.className}>
    <h1 className="title">
      {config.title || DEFAULTS.title}
    </h1>
    <p className="message">
      {config.message || DEFAULTS.message}
    </p>
  </div>
);
```

This component uses the following defaults:

```
const DEFAULTS = {
  className: 'data-load-error',
  message: [error message returned from the error response],
  title: 'Data Load Error: HTTP Status: [error code returned from error response]'
};
```

It is possible to override these defaults by passing a `config` parameter to `withGoogleSheets`:

```
const config = {
  dataLoadError: {
    className: 'my-custom-classname'
  }
};

withGoogleSheets('sheet1', config)(Hello);
```

If you'd like to use your own component (say `CustomLoadErrorComponent`) instead of the default one:

```
const CustomLoadErrorComponent = () => <div />;
const config = {
  dataLoadError: {
    component: CustomLoadErrorComponent
  }
};

withGoogleSheets('sheet1', config)(Hello);
```

## Specifying DOC ID and API key

The Google Sheets DOC ID and API key are needed to fetch data from Google Sheets. For security purposes, we recommend these variables to be set using the environment variables declared as per the [Create React App guidelines](https://create-react-app.dev/docs/adding-custom-environment-variables/). We recommend using the `.env` file (for security purposes, it's good practice to push a "sample" env file (`.env.sample`) to git instead of the actual `.env` file by adding the `.env` file to `.gitignore`). The DOC ID and API key can be set using the following two variables:

```
REACT_APP_GOOGLE_SHEETS_API_KEY=[YOUR-API-KEY]
REACT_APP_GOOGLE_SHEETS_DOC_ID=[YOUR-DOC-ID]
```

### Getting the DOC ID

The DOC ID can be obtained from the URL of the Google Sheet. For example:

```
https://docs.google.com/spreadsheets/d/[THIS-IS-THE-DOC-ID]/
```

**Note: Make sure this file is viewable to public**. Given this, you may want to consider using a traditional database if database contains private information such as passwords, etc. Google Sheets as a Database is very much intended for simple websites where the information is public -- such as landing pages, resume/portfolio websites, etc.

### Getting the API key

- **Step 1**: Head over to [Google API Console](https://console.developers.google.com/).
- **Step 2**: Create a new Project [here](https://console.developers.google.com/projectcreate). Use any project name that makes sense to you.
- **Step 3**: Click on `Enable APIs and Services` and search for `Google Sheets`. `Google Sheets API` will show up as the sole result. Click on it.
- **Step 4**: Enable the API by click `Enable`.
- **Step 5**: Once the API is enabled, you'll see `Credentials` on the left sidebar. Click on it. Then, click on `Create Credentials` > `API Key` (you may have to refresh for this option to become visible).
- **Step 6**: You will now see a screen that says `API key created` with the API key. This is your API key.

It's always a good idea to learn more about the keys and quota, and what it all really means. But for the sake of simplicity, that API key is all you need. **It is important that you read the [`Google Sheets API Usage Limits`](https://developers.google.com/sheets/api/limits)**. More specifically:

> This version of the Google Sheets API has a limit of 500 requests per 100 seconds per project, and 100 requests per 100 seconds per user. Limits for reads and writes are tracked separately. There is no daily usage limit.

If your need involves more than what is included for free from Google, you might want to use a traditional database or pay a small price for using Google Sheets as a Database.

## Dev Tools

### Lint

[ESLint](https://github.com/eslint/eslint) is used for linting.

Command: `make lint` / `npm run lint`

### Tests

[Jest](https://jestjs.io/) and [Enzyme](https://airbnb.io/enzyme/) are used as testing frameworks and for coverage. Adding/modifying tests for the proposed changes and ensuring that the coverage is at 100% is crucial. To run tests in watch mode:

`npm run test`

To generate coverage report:

`npm run test:coverage`

### Docs

[JSDoc](https://github.com/jsdoc/jsdoc) is used for documentation. It's important to follow the guidelines for JSDoc to add informative and descriptive comments and documentation to the code. Documentation can be found [here](https://athersharif.github.io/metis/).

Command: `make docs` / `npm run docs`

### Code formatter

[Prettier](https://github.com/prettier/prettier) is used for code formatting.

Command: `make prettier` / `npm run prettier`

### Build

[Babel](https://babeljs.io/) is used for build purposes. Runs lint, tests, code formatter and docs as well.

Command: `make build` / `npm run prepublish`

## Contributing

Pull requests are welcome and appreciated. Contributing guidelines can be found [here](https://github.com/athersharif/metis/blob/master/CONTRIBUTING.md).

## License

Licensed under MIT. Can be found [here](https://github.com/athersharif/metis/blob/master/LICENSE).