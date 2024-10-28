import React from 'react';
import StaticForm from './components/StaticForm';
import { getData } from './utils';
import configurationJson from './configurationToImplement.json';
import { FormConfiguration } from './types';
import './App.css';

const configuration = configurationJson as FormConfiguration;

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Dynamic Form Renderer</h1>
      </header>
      <main className="App-main">
        <StaticForm object={getData()} configuration={configuration} />
      </main>
    </div>
  );
}
