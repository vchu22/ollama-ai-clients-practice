import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const portocol = "http", host = "localhost", port = 10000;
const rootURL = `${portocol}://${host}:${port}`;

const parseJSONLines = (str: string): ResponseObject[] => {
  let arr: Array<any> = [];
  str.split(/\r?\n/).forEach((l: string, i: number) => {
    if (l.length > 0)
      arr.push(JSON.parse(l));
  });
  return arr;
}

interface ResponseObject {
  created_at: string,
  done: boolean,
  model: string,
  response: string
}

function App() {
  const [models, setModels] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState("llama3.2:latest");
  useEffect(() => {
    axios.get(`${rootURL}/api/tags`)
      .then(res => {
        let models = res.data.models.map((model: {
          modified_at: string,
          name: string
        }) => model.name);
        setModels(models);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);
  const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(event.target.value);
  };

  const [helloResponse, setHelloResponse] = useState<ResponseObject[]>([]);
  useEffect(() => {
    axios({
      method: 'post',
      url: `${rootURL}/api/generate`,
      responseType: 'stream',
      data: {
        model: selectedModel,
        prompt: "Hello"
      }
    })
      .then(res => {
        setHelloResponse(parseJSONLines(res.data));
        console.log(parseJSONLines(res.data));
        // res.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      {models.length == 0 ? "" : (
        <>
          <h3>Available Models:</h3>
          <select
            defaultValue={selectedModel}
            onChange={handleModelChange}
          >
            {models.map((option: string) => (
              <option value={option}>{option}</option>
            ))}
          </select>
          <p> <b>Selected Model:</b> {selectedModel}</p>

          <ul>
            {helloResponse.map((data: {
              created_at: string,
              done: boolean,
              model: string,
              response: string
            }, i: number) => <li key={i}>{data.response}</li>)}
          </ul>
        </>)}
    </div>

  );
}

export default App;
