import React, { useState } from 'react';

import './App.scss';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';

function App() {
  const [data, setData] = useState(null);
  const [requestParams, setRequestParams] = useState({});

  const callApi = async (requestParams) => {
    // requestParams is the formData object with url and method properties
    const { url, method } = requestParams;

    try {
      const response = await fetch(url, { method });
      const data = await response.json();
      setData(data);
      setRequestParams(requestParams);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <React.Fragment>
      <Header data-testid="header" />
      <div>Request Method: {requestParams.method}</div>
      <div>URL: {requestParams.url}</div>
      <Form handleApiCall={callApi} />
      <Results data={data} />
      <Footer data-testid="footer" />
    </React.Fragment>
  );
}

export default App;
