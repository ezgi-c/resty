import React from "react";

import './History.scss'

function History({history}) {  
  if (history.length) {
    return (
      <div className="history">
        <p>History:</p>
        <ul>
          {history.slice().reverse().map((apiCall,index) => (
          // {history.map((apiCall, index) => (
            <li key={index}            >
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