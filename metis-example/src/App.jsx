import SingleSheet from './SingleSheet';
import MultipleSheets from './MultipleSheets';
import AllSheets from './AllSheets';
import './App.css'

/**
 *
 * the below is for running the example in the context of this repo.
 *
 * for your app, use:
 *
 * import GoogleSheetsProvider from 'react-db-google-sheets';
 *
 */
import GoogleSheetsProvider from '#external/metis.esm.min.mjs';

const App = () => {
  const env = import.meta.env;
  const docId = env.VITE_METIS_SHEETS_DOC_ID;
  const apiKey = env.VITE_METIS_SHEETS_API_KEY;
  const metisConfig = {
    sheetId: docId,
    sheetApiKey: apiKey,
    driveId: docId,
    driveApiKey: apiKey,
  };

  return (
    <GoogleSheetsProvider config={metisConfig}>
      <div className="container">
        <h1>Metis Examples</h1>
        <div className="section">
          <h2>Single Sheet Example</h2>
          <SingleSheet />
        </div>
        <div className="section">
          <h2>Multiple Sheets Example</h2>
          <MultipleSheets />
        </div>
        <div className="section">
          <h2>All Sheets Example</h2>
          <AllSheets />
        </div>
      </div>
    </GoogleSheetsProvider>
  )
}

export default App
