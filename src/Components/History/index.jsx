import React from "react";

import './History.scss'

function History({history}) {  
  if (history.length) {
    return (
      <div className="history">
        <h2>History</h2>
        <ul>
          {history.map((apiCall, index) => (
            <li key={index} 
            // onClick={() => handleHistoryClick(index)}
            >
              <div>Method: {apiCall.method}</div>
              <div>URL: {apiCall.url}</div>
              {/* <div>DATA: {apiCall.data}</div> */}
              <pre>Data: 
                {apiCall.data ? JSON.stringify(apiCall.data, undefined, 2) : null}</pre>
              <br></br>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
  
  export default History;