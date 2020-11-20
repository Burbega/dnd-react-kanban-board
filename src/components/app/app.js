import { v4 as uuid } from 'uuid';
import './app.css';

const itemsFromBackend = [
  { id: uuid(), content: 'First Task' },
  { id: uuid(), content: 'Second Task' },
  { id: uuid(), content: 'Third Task' },
  { id: uuid(), content: 'Fourth Task' }
];

const columnsFromBackend = {
  [uuid()]: {
    name: 'Requested',
    items: itemsFromBackend
  },
  [uuid()]: {
    name: 'To Do',
    items: []
  },
  [uuid()]: {
    name: 'In Progress',
    items: []
  },
  [uuid()]: {
    name: 'Done',
    items: []
  }
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
