import React, { useState } from 'react';

import './History.scss';

function History({ history }) {
  const [selectedData, setSelectedData] = useState(null);

  const handleItemClick = (apiCall) => {
    setSelectedData(apiCall.data);
  };
  if (history.length) {
    return (
      <div className="history">
        <p>History:</p>
        <ul>
          {history
            .slice()
            .reverse()
            .map((apiCall, index) => (
              <li key={index} onClick={() => handleItemClick(apiCall)}>
                <div>Method: {apiCall.method}</div>
                <div>URL: {apiCall.url}</div>
                <br></br>
              </li>
            ))}
        </ul>
        {selectedData && (
          <div>
            <pre onClick={() => setSelectedData(null)}>
              {JSON.stringify(selectedData, undefined, 2)}
            </pre>
          </div>
        )}
      </div>
    );
  }
}

export default History;
