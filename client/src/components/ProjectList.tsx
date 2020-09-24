import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SectionList from './SectionList';
import dummyData from '../dummyData';
import TaskFormat from './taskInterface';

const ProjectContainer = styled.div`
  border-bottom: solid 1px #DCDCDC;
  padding-bottom: 20px;
`;

ProjectContainer.displayName = 'ProjectContainer';

const TitleAndButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: solid 1px #DCDCDC;
  justify-content: space-between;
`;

TitleAndButtonWrapper.displayName = 'TitleAndButtonWrapper';

const ProjectsTitle = styled.div`
  font-weight: bold;
  font-size: 20px;
  padding: 24px;
`;

ProjectsTitle.displayName = 'ProjectsTitle';

const IconAndTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 15px;
  padding-top: 20px;
  padding-bottom: 10px;
`;

IconAndTitleWrapper.displayName = 'IconAndTitleWrapper';

const TriangleIcon = styled.div`
  padding-right: 5px;
  font-size: 18px;
  cursor: pointer;
`;

TriangleIcon.displayName = 'TriangleIcon';

const ProjectName = styled.input.attrs({
  type: 'text',
})`
  width: 150px;
  font-size: 18px;
  color: #585858;
  border: none;
  border-color: transparent;
  &:hover {
    cursor: pointer;
  }
  &:focus{
    outline: none;
  }
`;

ProjectName.displayName = 'ProjectName';

const AddProjectButton = styled.button`
  background:  transparent;
  border: white;
  color: #A9A9A9;
  padding-right: 30px;
  font-size: 16px;
  &:hover {
    color: #707070;
    cursor: pointer;
  }
  &:focus{
    outline: none;
  }
`;

AddProjectButton.displayName = 'AddProjectButton';

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

function ProjectList(props: Props) {
  const {
    tasks, onDragStart, onDragOver, onDrop, handleTaskEdit, handleAddTask, handleFocus,
  } = props;

  const [projects, setProjects] = useState([] as ProjectFormat[]);
  const [projectId, setProjectId] = useState(0);

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
      for (let i = 0; i < currentProjects.length; i += 1) {
        const current: ProjectFormat = currentProjects[i];
        if (current.projectId === projectid) {
          current.projectName = value;
        }
      }
      setProjects(currentProjects);
    },
    handleProjectCollapsible(projectid: number) {
      const currentProjects: ProjectFormat[] = projects.slice();
      for (let i = 0; i < currentProjects.length; i += 1) {
        const current = currentProjects[i];
        if (current.projectId === projectid) {
          current.isExpanded = !current.isExpanded;
        }
      }
      setProjects(currentProjects);
    },
  };

  return (
    <div>
      <TitleAndButtonWrapper>
        <ProjectsTitle>Projects:</ProjectsTitle>
        <AddProjectButton onClick={() => handleProjects.handleAddProject()}>
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
                  onClick={() => handleProjects.handleProjectCollapsible(project.projectId)}
                >
                  {triangle}
                </TriangleIcon>
                <ProjectName
                  style={{ fontWeight: 'bold' }}
                  defaultValue={project.projectName}
                  onChange={(event) => handleProjects.handleProjectEdit(event, project.projectId)}
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
