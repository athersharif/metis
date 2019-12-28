import React from 'react';
import PropTypes from 'prop-types';
import { withGoogleSheets } from 'react-db-google-sheets';

const Home = props => (
  <div>
    {props.db.sheetName.map(data => (
      <span>{data.id}</span>
    ))}
  </div>
);

Home.propTypes = {
  db: PropTypes.shape({
    sheetName: PropTypes.arrayOf(PropTypes.object)
  })
};

export default withGoogleSheets(Home);
