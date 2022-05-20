import * as React from 'react';
import { useContext, useState } from 'react';
import {
  Todo,
  TodosState,
  TodosOperations,
  getInitiaTodosState,
  getInitialTodosOperations,
  useTodos,
} from './TodosProvider';

const LocalContext = React.createContext<{
  state: TodosState;
  operations: TodosOperations;
}>({
  state: getInitiaTodosState(),
  operations: getInitialTodosOperations(),
});

export const LocalProvider: React.FC<any> = ({ children, ...props }) => {
  const value = useTodos();

  return (
    <LocalContext.Provider value={value} {...props}>
      {children}
    </LocalContext.Provider>
  );
};

export function Todos() {
  const {
    state: { todos },
    operations,
  } = useContext(LocalContext);

  const handleComplete = (todo: Todo) => {
    operations.setComplete(todo);
  };

  return (
    <>
      {todos?.map((todo) => (
        <div key={todo.id}>
          <label>
            <input
              type="checkbox"
              checked={todo.complete}
              onChange={() => handleComplete(todo)}
            />
            {todo.title}
          </label>
        </div>
      ))}
    </>
  );
}
