import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import './app.css';

/* Task cards */
const itemsFromBackend = [
  { id: uuid(), content: 'First Task' },
  { id: uuid(), content: 'Second Task' },
  { id: uuid(), content: 'Third Task' },
  { id: uuid(), content: 'Fourth Task' }
];

/* Columns */
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

/* Drag and Drop handler */
const onDragEnd = (result, columns, setColumns) => {
  /* If Dropping outside of a column, return to the origin */
  if(!result.destination) return;
  const { source, destination } = result;
  /* Dragging over different columns: Copy current Dragging task card, remove from origin and paste on new position */
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    })
  } else {
    /* Dragging over the same column: Copy current Dragging task card position, remove from origin index and paste on new position index */
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
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
