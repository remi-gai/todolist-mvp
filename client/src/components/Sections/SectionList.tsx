import React, { useState, useEffect } from 'react';

import TasksList from '../Tasks/TasksList';
import dummyData from '../../dummyData';
import TaskFormat from '../taskInterface';

import {
  AddSectionButton, SectionWrapper, IconAndTitleWrapper,
  TriangleIcon, SectionName, DefaultSectionWrapper,
} from './styles';

interface SectionFormat {
  sectionId: number,
  sectionName: string,
  projectId: number,
  isExpanded: boolean
}

interface Props {
  tasks: TaskFormat[];
  onDrop: Function,
  onDragStart: Function,
  onDragOver: Function,
  handleTaskEdit: Function,
  handleAddTask: Function,
  handleFocus: Function,
  projectId: number,
}

function SectionList(props: Props) {
  const {
    tasks, onDragStart, onDragOver, onDrop, handleTaskEdit, handleAddTask, handleFocus, projectId,
  } = props;

  const [sections, setSections] = useState([] as SectionFormat[]);
  const [sectionId, setSectionId] = useState(0);

  useEffect(() => {
    const dummySections = dummyData.sections;
    // componentDidMount
    if (sections.length === 0) {
      setSections(dummySections);
      setSectionId(dummySections.length + 1);
    }
  });

  const handleSections = {
    handleAddSection(projectid: number) {
      const currentSections: SectionFormat[] = sections.slice();
      const currentSectionId: number = sectionId;
      const newSection: SectionFormat = {
        sectionId: currentSectionId, sectionName: 'New Section', projectId: projectid, isExpanded: true,
      };
      currentSections.push(newSection);
      setSections(currentSections);
      setSectionId(currentSectionId + 1);
    },
    handleSectionEdit(event: any, sectionid: number) {
      const { value } = event.target;
      const currentSections = sections.slice();
      for (let i = 0; i < currentSections.length; i += 1) {
        const current = currentSections[i];
        if (current.sectionId === sectionid) {
          current.sectionName = value;
        }
      }
      setSections(currentSections);
    },
    handleSectionCollapsible(sectionid: number) {
      const currentSections = sections.slice();
      for (let i = 0; i < currentSections.length; i += 1) {
        const current = currentSections[i];
        if (current.sectionId === sectionid) {
          current.isExpanded = !current.isExpanded;
        }
        setSections(currentSections);
      }
    },
  };

  return (
    <SectionWrapper>
      <DefaultSectionWrapper
        onDragOver={(event) => onDragOver(event)}
        onDrop={(event) => onDrop(event, null, projectId, 0)}
      >
        <TasksList
          tasks={tasks}
          projectId={projectId}
          sectionId={0}
          onDragStart={onDragStart}
          handleTaskEdit={handleTaskEdit}
          handleAddTask={handleAddTask}
          handleFocus={handleFocus}
        />
      </DefaultSectionWrapper>
      {
        sections.map((section) => {
          let tasksList;
          // if the current section is part of the project
          if (section.projectId === projectId) {
            tasksList = (
              <TasksList
                tasks={tasks}
                projectId={projectId}
                sectionId={section.sectionId}
                onDragStart={onDragStart}
                handleTaskEdit={handleTaskEdit}
                handleAddTask={handleAddTask}
                handleFocus={handleFocus}
              />
            );
          } else {
            return null;
          }

          const triangle = section.isExpanded ? '▾' : '▸';

          return (
            <SectionWrapper
              key={section.sectionId}
              onDragOver={(event) => onDragOver(event)}
              onDrop={(event) => onDrop(event, null, projectId, section.sectionId)}
            >
              <IconAndTitleWrapper>
                <TriangleIcon
                  onClick={() => handleSections.handleSectionCollapsible(section.sectionId)}
                >
                  {triangle}
                </TriangleIcon>
                <SectionName style={{ fontWeight: 'bold' }} defaultValue={section.sectionName} onChange={(event) => handleSections.handleSectionEdit(event, section.sectionId)} onFocus={handleFocus} />
              </IconAndTitleWrapper>
              {section.isExpanded ? tasksList : null}
            </SectionWrapper>
          );
        })
      }
      <AddSectionButton
        onClick={() => handleSections.handleAddSection(projectId)}
      >
        + Add new Section
      </AddSectionButton>
    </SectionWrapper>
  );
}
export default SectionList;
