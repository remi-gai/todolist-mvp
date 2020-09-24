import React from 'react';
import styled from 'styled-components';
import SectionList from './SectionList';


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

const ProjectList = (props) => (
  <div>
    <TitleAndButtonWrapper>
      <ProjectsTitle>Projects:</ProjectsTitle>
      <AddProjectButton onClick={() => props.handleAddProject()}>
        + Add new Project
      </AddProjectButton>
    </TitleAndButtonWrapper>
    {
      props.projects.map((project, index) => {
        const sections = (
          <SectionList
            tasks={props.tasks}
            sections={props.sections}
            projectId={project.projectId}
            onDragStart={props.onDragStart}
            onDragOver={props.onDragOver}
            handleTaskEdit={props.handleTaskEdit}
            handleAddTask={props.handleAddTask}
            handleSectionCollapsible={props.handleSectionCollapsible}
            handleSectionEdit={props.handleSectionEdit}
            handleAddSection={props.handleAddSection}
            onDrop={props.onDrop}
            handleFocus={props.handleFocus}
          />
        );

        const triangle = project.isExpanded ? '▾' : '▸';

        return (
          <ProjectContainer key={index}>
            <IconAndTitleWrapper>
              <TriangleIcon
                onClick={() => props.handleProjectCollapsible(project.projectId)}
              >
                {triangle}
              </TriangleIcon>
              <ProjectName
                style={{ fontWeight: 'bold' }} defaultValue={project.projectName}
                onChange={(event) => props.handleProjectEdit(event, project.projectId)}
                onDragOver={(event) => props.onDragOver(event)}
                onDrop={(event) => props.onDrop(event, null, project.projectId, project.sectionId)}
                onFocus={props.handleFocus}
              />
            </IconAndTitleWrapper>
            {project.isExpanded ? sections : null}
          </ProjectContainer>
        );
      })
    }
  </div>
);

export default ProjectList;
