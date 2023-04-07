import React from 'react';
import PropTypes from 'prop-types';

/**
 *
 * the below is for running the example in the context of this repo.
 *
 * for your app, use:
 *
 * import { withGoogleSheets } from 'react-db-google-sheets';
 *
 */
import { withGoogleSheets } from '../../dist';

const SingleSheet = (props) => (
  <div>
    <table className="table">
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>email</th>
        </tr>
      </thead>
      <tbody>
        {props.db.samplesheet.map((data) => (
          <tr key={data.id}>
            <td>{data.id}</td>
            <td>{data.name}</td>
            <td>{data.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <button className="btn btn-primary" onClick={props.refetch}>
      Refresh
    </button>
  </div>
);

SingleSheet.propTypes = {
  db: PropTypes.shape({
    samplesheet: PropTypes.arrayOf(PropTypes.object),
  }),
};

export default withGoogleSheets('samplesheet')(SingleSheet);
