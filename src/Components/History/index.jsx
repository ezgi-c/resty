import React from "react";

function History({history}) {  
  if (history.length) {
    return (
      <div>
        <h2>History</h2>
        <ul>
          {history.map((apiCall, index) => (
            <li key={index} 
            // onClick={() => handleHistoryClick(index)}
            >
              <div>Method: {apiCall.method}</div>
              <div>URL: {apiCall.url}</div>
              <div>DATA: {apiCall.data}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
  
  export default History;