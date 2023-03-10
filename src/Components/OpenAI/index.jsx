import { useCallback, useState } from "react";
import './OpenAI.scss'


const makeOpenAiRequest = async (content) => {
  
    const org = process.env.REACT_APP_OPENAI_ORG;
    const key = process.env.REACT_APP_OPENAI_KEY;
    const url = "https://api.openai.com/v1/chat/completions";
  
    const message = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content }],
    };
  
    const body = JSON.stringify(message);
  
    // make fetch happen
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "OpenAI-Organization": `${org}`,
        "Content-Type": "application/json",
      },
      body: body,
    });
  
    if (response.ok) {
      const responseJson = await response.json();
      return responseJson.choices[0].message.content;
    } else {
      const error = await response.text();
      return `${response.status} ${response.statusText} ${error}`;
    }
  };

  const OpenAI = () => {
    const [prompt, setPrompt] = useState('Ask Chat');
    const [chat, setChat] = useState('');
    const [loading, setLoading] = useState(false);

    const makeFetchHappen = useCallback(async () => {
      setLoading(true);
        const response = await makeOpenAiRequest(prompt);
        setChat(response);
        setLoading(false);
    }, [prompt]);

    return (
        <section className="openAi">
            <h3>OpenAI</h3>
            <label>
                <input value={prompt} onChange={(e) => setPrompt(e.target.value)} />
            </label>
            <button onClick={makeFetchHappen}>Chat!</button>
            {loading && <div>Loading...</div>}
            <div>{chat}</div>
        </section>
    )
    }

    export default OpenAI;