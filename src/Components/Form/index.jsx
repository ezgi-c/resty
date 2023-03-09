import { useReducer } from 'react';

import './Form.scss';

const initialState = {
  url: '',
  method: 'GET',
  requestJson: {}
}

const UPDATE_URL = 'update url';
const UPDATE_METHOD = 'update method';
const UPDATE_REQ_JSON = 'update POST/PUT request json'

function handleState(state, action) {
  if (action[0] === UPDATE_URL) {
    const newUrl = action[1];
    state.url = newUrl;
  }

  if (action[0] === UPDATE_METHOD) {
    const newMethod = action[1];
    state.method = newMethod;
  }

  if (action[0] === UPDATE_REQ_JSON) {
    const newRequestJson = action[1];
    state.requestJson = newRequestJson;
  }

  return {...state};
}

function Form({ handleApiCall }) {

  const [state, dispatch] = useReducer(handleState, initialState);

  const url = state.url;
  const method = state.method;
  const requestJson = state.requestJson;

  const formData = {
    method: method,
    url: url,
    requestJson: requestJson,
  }; 

  // const [method, setMethod] = useState('GET');
  // const [url, setUrl] = useState('');
  // const [jsonObject, setJsonObject] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    // const formData = {
    //   method: method,
    //   url: url,
    //   requestJson: requestJson,
    // }; 
    handleApiCall(formData);
    console.log(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <span>URL: </span>
          <input
            name="url"
            type="text"
            value={url}
            // onChange={(e) => setUrl(e.target.value)}
            onChange={(e) => dispatch([UPDATE_URL, e.target.value])}

          />
          <button type="submit">GO!</button>
        </label>

        <label className="methods">
          <input
            type="radio"
            value="GET"
            name="method"
            // onChange={(e) => setMethod(e.target.value)}
            onChange={(e) => dispatch([UPDATE_METHOD, e.target.value])}
          />
          GET
        </label>

        <label className="methods">
          <input
            type="radio"
            value="POST"
            name="method"
            // onChange={(e) => setMethod(e.target.value)}
            onChange={(e) => dispatch([UPDATE_METHOD, e.target.value])}
          />
          POST
        </label>

        <label className="methods">
          <input
            type="radio"
            value="PUT"
            name="method"
            // onChange={(e) => setMethod(e.target.value)}
            onChange={(e) => dispatch([UPDATE_METHOD, e.target.value])}
          />{' '}
          PUT
        </label>

        <label className="methods">
          <input
            type="radio"
            value="DELETE"
            name="method"
            // onChange={(e) => setMethod(e.target.value)}
            onChange={(e) => dispatch([UPDATE_METHOD, e.target.value])}
          />{' '}
          DELETE
        </label>

        <label>
          <textarea
            // value={jsonObject}
            name="textValue"
            // onChange={(e) => setJsonObject(e.target.value)}
          />
        </label>
      </form>
    </>
  );
}

export default Form;
