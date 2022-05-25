import { LoadableStateElement, LoadableStateActions } from './state-helpers';
import { useState } from 'react';

type LocalActions = {
  setCurrent: (project: Project) => void;
};

export type ProjectsState = LoadableStateElement<Project[], 'projects'> &
  LoadableStateElement<Project, `currentProject`>;
export type ProjectsOperations = LoadableStateActions<Project[], 'projects'> &
  LoadableStateActions<Project, `currentProject`>;

export type Project = {
  id: number;
  title: string;
};

export const initialProjects: Project[] = [
  {
    id: 1,
    title: 'Project 1',
  },
  {
    id: 2,
    title: 'Project 2',
  },
];

export function getInitiaProjectsState(): ProjectsState {
  return {
    projects: initialProjects,
    projectsLoading: false,
    currentProjectLoading: false,
    currentProject: initialProjects[0],
  };
}

export function getInitialProjectsOperations(): ProjectsOperations {
  return {
    setCurrentProject: () => {},
    setCurrentProjectLoading: () => {},
    setCurrentProjectError: () => {},
    setProjectsError: () => {},
    setProjectsLoading: () => {},
    setProjects: () => {},
  };
}

export function useProjects(): {
  state: ProjectsState;
  operations: ProjectsOperations;
} {
  const initial = getInitiaProjectsState();
  const [projectsLoading, setProjectsLoading] = useState<boolean>(
    initial.projectsLoading,
  );
  const [currentProjectLoading, setCurrentProjectLoading] = useState<boolean>(
    initial.currentProjectLoading,
  );
  const [projects, setProjects] = useState<Project[] | undefined>(
    initial.projects,
  );
  const [currentProject, setCurrentProject] = useState<Project | undefined>(
    initial.currentProject,
  );
  const [projectsError, setProjectsError] = useState<Error | undefined>(
    initial.projectsError,
  );
  const [currentProjectError, setCurrentProjectError] = useState<
    Error | undefined
  >(initial.currentProjectError);

  return {
    state: {
      projectsLoading,
      projects,
      projectsError,
      currentProjectLoading,
      currentProjectError,
      currentProject,
    },
    operations: {
      setProjectsLoading,
      setProjects,
      setProjectsError,
      setCurrentProjectLoading,
      setCurrentProject,
      setCurrentProjectError,
    },
  };
}
