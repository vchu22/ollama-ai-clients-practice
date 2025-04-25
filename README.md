# Ollama clients practice
Practice creating clients for [Ollama](https://ollama.com/) server using various front-end technologies.

# What is Ollama
[Ollama](https://ollama.com/) is an open-source tool that lets you easily run LLM models on your local machines or your own server. Think of it as a ChatGPT but with more freedom on where to run the server and which large language models to use. It also gives users access to generative AIs without having to connect to the internet.

# Setup
## 1. Run Ollama server
First, go to [Ollama's official website](https://ollama.com/), click on the "Download" button, and follow the installation instructions for your operating system.

After successfully installing and launching the Ollama program, you need to download an AI model for it to be useful. For the first time, you can enter `ollama run llama3.2` and it will first download the `llama3.2` model if it is not on your machine yet and then immediately run the chat interface on the terminal. After it finishes downloading, your terminal will automatically. 

For a list of models you can use in Ollama, check on the official website's "Models" page https://ollama.com/search to see what models are available to download.

## 2. Run one of the front-end clients
The runnable code are separated into folders by tech stack. Below are the commands to execute the code for each tech stack:
- React Typescript Client: 
    + Navigate to folder: `cd react-ts-client`
    + Install dependecies: `yarn install` or `npm install`
    + Run the code: `yarn start` or `npm start`
