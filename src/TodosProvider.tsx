import { LoadableStateElement, LoadableStateActions } from './state-helpers';
import { useState } from 'react';

type LocalActions = {
  setComplete: (todo: Todo) => void;
};

export type TodosState = LoadableStateElement<Todo[], 'todos'>;
export type TodosOperations = LoadableStateActions<Todo[], 'todos'> &
  LocalActions;

export type Todo = {
  id: number;
  title: string;
  complete: boolean;
};

export const initialTodos: Todo[] = [
  {
    id: 1,
    title: 'Todo 1',
    complete: false,
  },
  {
    id: 2,
    title: 'Todo 2',
    complete: false,
  },
];

export function getInitiaTodosState(): TodosState {
  return {
    todos: initialTodos,
    todosLoading: false,
  };
}

export function getInitialTodosOperations(): TodosOperations {
  return {
    setComplete: () => {},
    setTodosError: () => {},
    setTodosLoading: () => {},
    setTodos: () => {},
  };
}

export function useTodos(): {
  state: TodosState;
  operations: TodosOperations;
} {
  const initial = getInitiaTodosState();
  const [todosLoading, setTodosLoading] = useState<boolean>(
    initial.todosLoading,
  );
  const [todos, setTodos] = useState<Todo[] | undefined>(initial.todos);
  const [todosError, setTodosError] = useState<Error | undefined>(
    initial.todosError,
  );

  const setComplete = (todo: Todo) => {
    setTodos(
      todos?.map((t) => {
        if (t.id === todo.id) {
          return {
            ...t,
            complete: !t.complete,
          };
        }

        return t;
      }),
    );
  };

  return {
    state: {
      todosLoading,
      todos,
      todosError,
    },
    operations: {
      setComplete,
      setTodosLoading,
      setTodos,
      setTodosError,
    },
  };
}
