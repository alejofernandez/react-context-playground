import * as React from 'react';
import { useContext } from 'react';
import {
  Todo,
  TodosState,
  TodosOperations,
  getInitiaTodosState,
  getInitialTodosOperations,
  useTodos,
  initialTodos,
} from './TodosProvider';

import {
  Project,
  ProjectsState,
  ProjectsOperations,
  getInitiaProjectsState,
  getInitialProjectsOperations,
  useProjects,
} from './ProjectsProvider';

const LocalContext = React.createContext<{
  state: TodosState & ProjectsState;
  operations: TodosOperations & ProjectsOperations;
}>({
  state: { ...getInitiaTodosState(), ...getInitiaProjectsState() },
  operations: {
    ...getInitialTodosOperations(),
    ...getInitialProjectsOperations(),
  },
});

export const LocalProvider: React.FC<any> = ({ children, ...props }) => {
  const { state: todosState, operations: todosOperations } = useTodos();
  const { state: projectsState, operations: projectsOperations } =
    useProjects();

  const value = {
    state: { ...todosState, ...projectsState },
    operations: { ...todosOperations, ...projectsOperations },
  };

  return (
    <LocalContext.Provider value={value} {...props}>
      {children}
    </LocalContext.Provider>
  );
};

const initialState = {
  projects: [
    {
      id: 1,
      title: 'project 1',
      todos: initialTodos,
    },
  ],
  otherStuff: {},
};

const CoreContext = React.createContext<any[] | undefined>(undefined);

export const CoreProvider: React.FC<any> = ({ children, ...props }) => {
  const [appState, setAppState] = React.useState(initialState);
  const [results, setResults] = React.useState({});

  const reducedProjects = appState.map((p) => ({
    ...p,
    todos: p.todos.length,
  }));

  const useQuery = (query) => {
    if (results[query]) {
      return results[query];
    }
    const result = // does work
      setResults({
        ...results,
        [query]: result,
      });
    return result;
  };

  const projects = React.useMemo(() => {
    return reducedProjects;
  }, [reducedProjects]);

  return (
    <>
      <QueryContext.Provider value={{ useQuery }}>
        <MutationContext.Provider value={{ useMutation }}> </MutationContext>
          {children}
        </MutationContext.Provider>
      </CoreContext.Provider>
    </>
  );
};

export const useCore = (query) => {
  const context = React.useContext(ProjectContext);
  // throw if null
  return context;
};

export function Todos() {
  const {
    state: { todos, currentProject },
    operations,
  } = useContext(LocalContext);
  const { useQuery } = useCore();
  const { projects } = useQuery(`
    projects: {
      id,
      title
    }
  `);

  const handleComplete = (todo: Todo) => {
    operations.setComplete(todo);
  };

  const handleOnProjectChange = (projectId: number) => {
    if (!projects) {
      return;
    }

    const newCurrent = projects.filter(({ id }) => id === projectId)[0];
    if (!newCurrent) {
      return;
    }

    operations.setCurrentProject(newCurrent);
  };

  return (
    <>
      <h1>Todos</h1>
      <label>Project:</label>
      <select>
        {(projects || []).map(({ id, title }) => (
          <option
            key={id}
            value={id}
            selected={currentProject && currentProject.id === id}>
            {title}
          </option>
        ))}
      </select>
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
