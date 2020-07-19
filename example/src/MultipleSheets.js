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

const MultipleSheets = (props) => (
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
    <table className="table">
      <thead>
        <tr>
          <th>id</th>
          <th>team name</th>
          <th>games played</th>
          <th>wins</th>
          <th>losses</th>
        </tr>
      </thead>
      <tbody>
        {props.db.anothersheet.map((data) => (
          <tr key={data.id}>
            <td>{data.id}</td>
            <td>{data.team_name}</td>
            <td>{data.games_played}</td>
            <td>{data.wins}</td>
            <td>{data.losses}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <button className="btn btn-primary" onClick={props.refetch}>
      Refresh
    </button>    
  </div>
);

MultipleSheets.propTypes = {
  db: PropTypes.shape({
    anothersheet: PropTypes.arrayOf(PropTypes.object),
    samplesheet: PropTypes.arrayOf(PropTypes.object),
  }),
};

export default withGoogleSheets(['anothersheet', 'samplesheet'])(
  MultipleSheets
);
