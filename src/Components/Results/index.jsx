import React from 'react';

import './Results.scss';

function Results(data) {
  return (
    <>
      <div>Result:</div>

      <section className="results">
        <pre>{data ? JSON.stringify(data, undefined, 2) : null}</pre>
      </section>
    </>
  );
}

export default Results;
