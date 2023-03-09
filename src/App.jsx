import React, { useReducer } from 'react';

import './App.scss';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';

const initialState = {
  data: null,
  requestParams: {},
}

const UPDATE_DATA = "update data";
const UPDATE_REQ_PARAMS = 'update request params'

function handleState(state, action) {
  if (action[0] === UPDATE_DATA) {
    const newData = action[1];
    state.data = newData;
  }

  if (action[0] === UPDATE_REQ_PARAMS) {
    const newParams = action[1];
    state.requestParams = newParams;
  }

  return {...state};
}

function App() {
  // const [data, setData] = useState(null);
  // const [requestParams, setRequestParams] = useState({});

  const [state, dispatch] = useReducer(handleState, initialState);

  const data = state.data;
  const requestParams = state.requestParams;


  const callApi = async (requestParams) => {
    // requestParams is the formData object with url and method properties
    const { url, method } = requestParams;

    try {
      const response = await fetch(url, { method });
      const data = await response.json();
      dispatch([UPDATE_DATA, data]);
      dispatch([UPDATE_REQ_PARAMS, requestParams]);      
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
