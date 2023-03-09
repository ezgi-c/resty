import React, { useReducer } from 'react';

import './App.scss';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';

const initialState = {
  loading: false,
  data: null,
  requestParams: {},
  requestJson: {},
  history: [],
  currentApiCall: null,
}

const UPDATE_LOADING = 'update loading';
const UPDATE_DATA = "update data";
const UPDATE_REQ_PARAMS = 'update request params'
const UPDATE_REQ_JSON = 'update request json'
const UPDATE_HISTORY = "update history";
const UPDATE_API_CALL = 'update current API call';

function handleState(state, action) {
  if (action[0] === UPDATE_LOADING) {
    const loadingStatus = action[1];
    state.loading = loadingStatus;
  }

  if (action[0] === UPDATE_DATA) {
    const newData = action[1];
    state.data = newData;
  }

  if (action[0] === UPDATE_REQ_PARAMS) {
    const newParams = action[1];
    state.requestParams = newParams;
  }

  if (action[0] === UPDATE_REQ_JSON) {
    const newRequestJson = action[1];
    state.requestJson = newRequestJson;
  }

  if (action[0] === UPDATE_HISTORY) {
    const newApiCall = action[1];
    // const newApiCall = { method, url, results };
    state.history = [...state.history, newApiCall];
  }

  if (action[0] === UPDATE_API_CALL) {
    const index = action[1];
    state.currentApiCall = state.history[index];
  }

  return {...state};
}

function App() {
  // const [data, setData] = useState(null);
  // const [requestParams, setRequestParams] = useState({});

  const [state, dispatch] = useReducer(handleState, initialState);

  // const data = state.data;
  // const requestParams = state.requestParams;

  const { loading, data, requestParams, history, currentApiCall } = state;

  const callApi = async (requestParams) => {
    // requestParams is the formData object with url and method properties
    const { url, method, requestJson } = requestParams;


    try {
      dispatch([UPDATE_LOADING, true]);

      const response = await fetch(url, { method }, {requestJson});
      const data = await response.json();

      dispatch([UPDATE_DATA, data]);
      dispatch([UPDATE_REQ_PARAMS, requestParams]);  
      dispatch([UPDATE_REQ_JSON, requestJson]);  
      dispatch([UPDATE_HISTORY, { method, url, data} ])  
      console.log(state.history);  

      dispatch([UPDATE_LOADING, false]);

    } catch (e) {
      console.error(e);

      dispatch([ UPDATE_DATA, null ]);
      dispatch([ UPDATE_REQ_PARAMS, {} ]);
      dispatch([ UPDATE_REQ_JSON, {} ]);

      dispatch([UPDATE_LOADING, false]);
    }

    const handleHistoryClick= (index) => {
      const clickedItem = state.history[index];
      dispatch([UPDATE_DATA, clickedItem.data]);
      dispatch([UPDATE_REQ_PARAMS, clickedItem.requestParams]);
      dispatch([UPDATE_HISTORY, clickedItem]);
    }
  };

  return (
    <React.Fragment>
      <Header data-testid="header" />
      {loading && <div>Loading...</div>}
      <div>Request Method: {requestParams.method}</div>
      <div>URL: {requestParams.url}</div>
      <Form handleApiCall={callApi} />
      <Results data={data} />
      <Footer data-testid="footer" />
      <div>History:</div>
      <ul>
        {state.history.map((api))}
      </ul>
    </React.Fragment>
  );
}

export default App;
