import { useState } from 'react';

import './Form.scss';

function Form({ handleApiCall }) {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [jsonObject, setJsonObject] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      method: method,
      url: url,
      jsonObject: jsonObject
    };
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
            onChange={(e) => setUrl(e.target.value)}
          />
          <button type="submit">GO!</button>
        </label>

        <label className="methods">
          <input type="radio" value="GET" name="method" onChange={(e)=> setMethod(e.target.value)} /> GET
        </label>

        <label className="methods">
          <input type="radio" value="POST" name="method" onChange={(e)=> setMethod(e.target.value)}/> POST
        </label>

        <label className="methods">
          <input type="radio" value="PUT" name="method" onChange={(e)=> setMethod(e.target.value)}/> PUT
        </label>

        <label className="methods">
          <input type="radio" value="DELETE" name="method" onChange={(e)=> setMethod(e.target.value)} /> DELETE
        </label>

        <label>
          <textarea value={jsonObject} name= 'textValue' onChange={(e) => setJsonObject(e.target.value) } />
        </label>
      </form>
    </>
  );
}

export default Form;
