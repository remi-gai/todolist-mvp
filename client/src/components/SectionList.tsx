import React from 'react';
import styled from 'styled-components';
import TasksList from './TasksList';

const AddSectionButton = styled.button`
background:  transparent;
border: white;
color: #909090;
font-size: 16px;
padding-left: 40px;
height: 35px;
&:hover {
  color: #181818;
  cursor: pointer;
}
&:focus{
    outline: none;
}
`;

AddSectionButton.displayName = 'AddSectionButton';

const SectionWrapper = styled.div`
`;

SectionWrapper.displayName = 'SectionWrapper';

const IconAndTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 30px;
  padding-bottom: 10px;
  padding-top: 4px;
`;

IconAndTitleWrapper.displayName = 'IconAndTitleWrapper';

const TriangleIcon = styled.div`
  padding-right: 5px;
  font-size: 16px;
  cursor: pointer;
`;

TriangleIcon.displayName = 'TriangleIcon';

const SectionName = styled.input.attrs({
  type: 'text',
})`
  width: 150px;
  border: none;
  color: #585858;
  border-color: transparent;
  &:hover {
    cursor: pointer;
  }
  &:focus{
    outline: none;
  }
`;

SectionName.displayName = 'SectionName';

const DefaultSectionWrapper = styled.div`
  /* padding-left: -40px; */
`;

DefaultSectionWrapper.displayName = 'DefaultSectionWrapper';

const SectionList = (props) => (
  <SectionWrapper>
    <DefaultSectionWrapper
      onDragOver={(event) => props.onDragOver(event)}
      onDrop={(event) => props.onDrop(event, null, props.projectId, 0)}
    >
      <TasksList
        tasks={props.tasks}
        projectId={props.projectId}
        sectionId={0}
        onDragStart={props.onDragStart}
        onDragOver={props.onDragOver}
        handleTaskEdit={props.handleTaskEdit}
        handleAddTask={props.handleAddTask}
      />
    </DefaultSectionWrapper>
    {
      props.sections.map((section, index) => {
        let tasks;
        // if the current section is part of the project
        if (section.projectId === props.projectId) {
          tasks = (
            <TasksList
              tasks={props.tasks}
              projectId={props.projectId}
              sectionId={section.sectionId}
              onDragStart={props.onDragStart}
              onDragOver={props.onDragOver}
              handleTaskEdit={props.handleTaskEdit}
              handleAddTask={props.handleAddTask}
            />
          );
        } else {
          return null;
        }

        const triangle = section.isExpanded ? '▾' : '▸';

        return (
          <SectionWrapper
            key={index}
            onDragOver={(event) => props.onDragOver(event)}
            onDrop={(event) => props.onDrop(event, null, props.projectId, section.sectionId)}
          >
            <IconAndTitleWrapper>
              <TriangleIcon
                onClick={() => props.handleSectionCollapsible(section.sectionId)}
              >
                {triangle}
              </TriangleIcon>
              <SectionName style={{ fontWeight: 'bold' }} defaultValue={section.sectionName} onChange={(event) => props.handleSectionEdit(event, section.sectionId)} onFocus={props.handleFocus} />
            </IconAndTitleWrapper>
            {section.isExpanded ? tasks : null}
          </SectionWrapper>
        );
      })
    }
    <AddSectionButton
      onClick={() => props.handleAddSection(props.projectId)}
    >
      + Add new Section
    </AddSectionButton>
  </SectionWrapper>
);

export default SectionList;
