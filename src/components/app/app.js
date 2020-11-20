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
  const [columns, setColumns] = useState(columnsFromBackend);
  return (
    <div className="column-bg">
      {/* DragDropContext from react-beautiful-dnd */}
      <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
        {/* Create columns */}
        {Object.entries(columns).map(([id, column]) => {
          return (
            <div className="set-column-direction">
              <h2 className="white-font-color">{column.name}</h2>
              <div className="margin-8px">
                {/* Droppable column */}
                <Droppable droppableId={id} key={id}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}                        
                        style = {{
                          transition: 'all .5s',
                          /* Change column color if a card isDraggingOver */
                          background: snapshot.isDraggingOver ? 'lightsteelblue' : 'lightgrey'
                        }}
                        className="kanban-column"                        
                      >
                        {/* Create task cards */}
                        {column.items.map((item, index) => {
                          return (
                            /* Draggable task card */
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      transition: 'all .5s',
                                      /* Change task card color if isDragging */
                                      backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
                                      ...provided.draggableProps.style
                                    }}
                                    className="task-card"
                                  >
                                    {/* Task card const content */}
                                    {item.content}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}                      
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default App;
