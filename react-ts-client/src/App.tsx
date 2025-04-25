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
  const [modelsResponse, setModelsResponse] = useState([]);
  useEffect(() => {
    axios.get(`${rootURL}/api/tags`)
      .then(res => {
        setModelsResponse(res.data.models);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const [helloResponse, setHelloResponse] = useState<ResponseObject[]>([]);
  useEffect(() => {
    axios({
      method: 'post',
      url: `${rootURL}/api/generate`,
      responseType: 'stream',
      data: {
        model: "llama3.2",
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
      <h3>Available Models:</h3>
      <ul>
        {modelsResponse.map((data: {
          modified_at: string,
          name: string
        }) => (
          <li key={data.modified_at}>{data.name}</li>
        ))}
      </ul>
      <ul>
        {/* {helloResponse} */}
        {helloResponse.map((data: {
          created_at: string,
          done: boolean,
          model: string,
          response: string
        }, i: number) => <li key={i}>{data.response}</li>)}
      </ul>
    </div>

  );
}

export default App;
