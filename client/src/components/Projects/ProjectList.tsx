import React, { useState, useEffect } from 'react';

import SectionList from '../Sections/SectionList';
import dummyData from '../../dummyData';
import TaskFormat from '../Tasks/taskInterface';

import {
  ProjectContainer, TitleAndButtonWrapper,
  ProjectsTitle, IconAndTitleWrapper, TriangleIcon,
  ProjectName, AddProjectButton,
} from './styles';

interface ProjectFormat {
  projectId: number,
  projectName: string,
  isExpanded: boolean
}

interface Props {
  tasks: TaskFormat[];
  onDrop: Function,
  onDragStart: Function,
  onDragOver: Function,
  handleTaskEdit: Function,
  handleAddTask: Function,
  handleFocus: Function
}

function ProjectList({
  tasks, onDragStart, onDragOver, onDrop, handleTaskEdit, handleAddTask, handleFocus,
}: Props) {
  const [projects, setProjects] = useState([] as ProjectFormat[]);
  const [projectId, setProjectId] = useState<number>(0);

  useEffect(() => {
    const dummyProjects = dummyData.projects;
    // componentDidMount
    if (projects.length === 0) {
      setProjects(dummyProjects);
      setProjectId(dummyProjects.length + 1);
    }
  });

  const handleProjects = {
    handleAddProject() {
      const currentProjects: ProjectFormat[] = projects.slice();
      const currentProjectId: number = projectId;
      const newProject: ProjectFormat = { projectId: currentProjectId, projectName: 'New Project', isExpanded: false };
      currentProjects.push(newProject);
      setProjects(currentProjects);
      setProjectId(currentProjectId + 1);
    },
    handleProjectEdit(event: any, projectid: number) {
      const { value } = event.target;
      const currentProjects: ProjectFormat[] = projects.slice();
      const targetProject = currentProjects.find((project) => project.projectId === projectid);
      if (targetProject) targetProject.projectName = value;
      setProjects(currentProjects);
    },
    handleProjectCollapsible(projectid: number) {
      const currentProjects: ProjectFormat[] = projects.slice();
      const targetProject = currentProjects.find((project) => project.projectId === projectid);
      if (targetProject) targetProject.isExpanded = !targetProject.isExpanded;
      setProjects(currentProjects);
    },
  };

  const { handleAddProject, handleProjectEdit, handleProjectCollapsible } = handleProjects;

  return (
    <div>
      <TitleAndButtonWrapper>
        <ProjectsTitle>Projects:</ProjectsTitle>
        <AddProjectButton onClick={handleAddProject}>
          + Add new Project
        </AddProjectButton>
      </TitleAndButtonWrapper>
      {
        projects.map((project) => {
          const sections = (
            <SectionList
              tasks={tasks}
              projectId={project.projectId}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              handleTaskEdit={handleTaskEdit}
              handleAddTask={handleAddTask}
              onDrop={onDrop}
              handleFocus={handleFocus}
            />
          );

          const triangle = project.isExpanded ? '▾' : '▸';

          return (
            <ProjectContainer key={project.projectId}>
              <IconAndTitleWrapper>
                <TriangleIcon
                  onClick={() => handleProjectCollapsible(project.projectId)}
                >
                  {triangle}
                </TriangleIcon>
                <ProjectName
                  style={{ fontWeight: 'bold' }}
                  defaultValue={project.projectName}
                  onChange={(event) => handleProjectEdit(event, project.projectId)}
                  onDragOver={(event) => onDragOver(event)}
                  onDrop={(event) => onDrop(event, null, project.projectId)}
                  onFocus={handleFocus}
                />
              </IconAndTitleWrapper>
              {project.isExpanded ? sections : null}
            </ProjectContainer>
          );
        })
      }
    </div>
  );
}

export default ProjectList;
