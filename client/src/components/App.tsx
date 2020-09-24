import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import dummyData from '../dummyData';
import Calendar from './Calendar';
import Inbox from './Inbox';
import ProjectList from './ProjectList';

// styled-components styling
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Open-Sans, Helvetica, Sans-Serif;
    color: #585858;
  }
`;

const OuterContainerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 984px;
  height: 750px;
  border: solid 1px black;
  border-radius: 10px;
`;

OuterContainerWrapper.displayName = 'OuterContainerWrapper';

const MenuWrapper = styled.div`
  width: 50px;
`;

MenuWrapper.displayName = 'MenuWrapper';

const Menu = styled.img.attrs({
  src: './images/menu.png',
})`
  width: 50px;
  height: 750px;
`;

Menu.displayName = 'Menu';

const Schedule = styled.img.attrs({
  src: './images/calendar.png',
})`
  width: 290px;
`;

Schedule.displayName = 'Schedule';

const UpperBanner = styled.img.attrs({
  src: './images/top-banner.png',
})`
  height: 175px;
`;

UpperBanner.displayName = 'UpperBanner';

const ProjectIcon = styled.img.attrs({
  src: './images/projectLogo.png',
})`
  position: absolute;
  height: 18px;
  margin-top: 131px;
  margin-left: -33px;
  &:hover {
    cursor: pointer;
  }
`;

ProjectIcon.displayName = 'ProjectIcon';

const MainPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

MainPageWrapper.displayName = 'MainPageWrapper';

const UpperBannerWrapper = styled.div`
  height: 175px;
`;

UpperBannerWrapper.displayName = 'UpperBannerWrapper';

const LowerSectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 575px;
`;

LowerSectionWrapper.displayName = 'LowerSectionWrapper';

const TaskSectionWrapper = styled.div`
  width: 640px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

TaskSectionWrapper.displayName = 'TaskSectionWrapper';

const CalendarSectionWrapper = styled.div`
  width: 300px;
`;

CalendarSectionWrapper.displayName = 'CalendarSectionWrapper';

const TaskSectionPlaceholder = styled.img.attrs({
  src: './images/task-page.png',
})`
  width: 650px;
`;

TaskSectionPlaceholder.displayName = 'TaskSectionPlaceholder';

// interfaces
interface TaskFormat {
  taskId: number,
  taskName: string,
  category: string,
  projectId: number,
  sectionId: number,
  timeStamp: string
}

interface ProjectFormat {
  projectId: number,
  projectName: string,
  isExpanded: boolean
}

interface SectionFormat {
  sectionId: number,
  sectionName: string,
  projectId: number,
  isExpanded: boolean
}

function App() {
  // hooks
  const [tasks, setTasks] = useState([] as TaskFormat[]);
  const [projects, setProjects] = useState([] as ProjectFormat[]);
  const [sections, setSections] = useState([] as SectionFormat[]);
  const [taskId, setTaskId] = useState(0);
  const [sectionId, setSectionId] = useState(0);
  const [projectId, setProjectId] = useState(0);
  const [projectsView, setProjectsView] = useState(true);
  const [isInboxExpanded, setIsInboxExpanded] = useState(true);

  useEffect(() => {
    const dummyTasks = dummyData.tasks;
    const dummyProjects = dummyData.projects;
    const dummySections = dummyData.sections;
    // componentDidMount
    if (tasks.length === 0 && sections.length === 0 && projects.length === 0) {
      setTasks(dummyTasks);
      setProjects(dummyProjects);
      setSections(dummySections);
      setTaskId(dummyTasks.length);
      setProjectId(dummyProjects.length + 1);
      setSectionId(dummySections.length + 1);
    }
  });

  // methods
  const handleTasks = {
    handleAddTask: (projectId: number, sectionId: number) => {
      const currentTasks: TaskFormat[] = tasks.slice();
      const currentTaskId: number = taskId;
      const newTask: TaskFormat = {
        taskId: currentTaskId, taskName: 'New Task', category: 'main', projectId, sectionId, timeStamp: '',
      };

      currentTasks.push(newTask);
      setTasks(currentTasks);
      setTaskId(currentTaskId + 1);
    },
    handleTaskEdit: (event: any, taskId: number) => {
      const { value } = event.target;
      const currentTasks: TaskFormat[] = tasks.slice();
      for (let i = 0; i < currentTasks.length; i += 1) {
        const current: TaskFormat = currentTasks[i];
        if (current.taskId === taskId) {
          current.taskName = value;
        }
      }
      setTasks(currentTasks);
    }
  }

  const handleProjects = {
    handleAddProject() {
      const currentProjects: ProjectFormat[] = projects.slice();
      const currentProjectId: number = projectId;
      const newProject: ProjectFormat = { projectId: currentProjectId, projectName: 'New Project', isExpanded: false };
      currentProjects.push(newProject);
      setProjects(currentProjects);
      setProjectId(currentProjectId + 1);
    },
    handleProjectEdit(event: any) {
      const { value } = event.target;
      const currentProjects: ProjectFormat[] = projects.slice();
      for (let i = 0; i < currentProjects.length; i += 1) {
        const current: ProjectFormat = currentProjects[i];
        if (current.projectId === projectId) {
          current.projectName = value;
        }
      }
      setProjects(currentProjects);
    },
    handleProjectCollapsible(projectId: number) {
      if (projectId === 0) {
        const currentState = isInboxExpanded;
        setIsInboxExpanded(!currentState);
      } else {
        const currentProjects: ProjectFormat[] = projects.slice();
        for (let i = 0; i < currentProjects.length; i += 1) {
          const current = currentProjects[i];
          if (current.projectId === projectId) {
            current.isExpanded = !current.isExpanded;
          }
        }
        setProjects(currentProjects);
      }
    }
  };

  const handleSections = {
    handleAddSection(projectId: number) {
      const currentSections: SectionFormat[] = sections.slice();
      const currentSectionId: number = sectionId;
      const newSection: SectionFormat = { sectionId: currentSectionId, sectionName: 'New Section', projectId, isExpanded: true }
      currentSections.push(newSection);
      setSections(currentSections);
      setSectionId(currentSectionId + 1);
    },
    handleSectionEdit(event: any, sectionId: number) {
      const { value } = event.target;
      const currentSections = sections.slice();
      for (let i = 0; i < currentSections.length; i += 1) {
        const current = currentSections[i];
        if (current.sectionId === sectionId) {
          current.sectionName = value;
        }
      }
      setSections(currentSections);
    },
    handleSectionCollapsible(sectionId: number) {
      const currentSections = sections.slice();
      for (let i = 0; i < currentSections.length; i += 1) {
        const current = currentSections[i];
        if (current.sectionId === sectionId) {
          current.isExpanded = !current.isExpanded;
        }
        setSections(currentSections);
      }
    },
  };

  const handleDragAndDrop = {
    onDragOver: (event: any) => {
      event.preventDefault();
    },
    onDragStart: (event: any, taskName: string, taskId: number) => {
      event.dataTransfer.setData('taskName', taskName);
      event.dataTransfer.setData('taskId', taskId);
    },
    onDrop: (event: any, category: string, projectId: number = 0, sectionId: number = 0, timeStamp: string = '') => {
      const taskName = event.dataTransfer.getData('taskName');
      const taskId = event.dataTransfer.getData('taskId');
      const currentTasks = tasks.slice();

      // path for adding to calendar
      if (category === 'calendar') {
        // check that the task isn't already in calendar
        for (let i = 0; i < currentTasks.length; i += 1) {
          const current = currentTasks[i];
          if (current.taskId === Number(taskId) && current.category === 'calendar') {
            // if so, remove from the list of tasks
            currentTasks.splice(i, 1);
            break;
          }
        }
        const newTask: TaskFormat = {
          taskId: Number(taskId),
          taskName,
          category,
          projectId,
          sectionId,
          timeStamp,
        };
        currentTasks.push(newTask);
        setTasks(currentTasks);
      } else {
        // update the projectId and sectionId of the task
        for (let i = 0; i < currentTasks.length; i += 1) {
          const current = currentTasks[i];
          if (current.taskId === Number(taskId)) {
            current.projectId = projectId;
            current.sectionId = sectionId;
          }
        }
        setTasks(currentTasks);
      }
    },
  };

  const handleChangePage = () => {
    setProjectsView(!projectsView);
  };

  const handleFocus = (event: any) => {
    event.target.select();
  };

  return (
    <OuterContainerWrapper>
      <GlobalStyle />
      <MenuWrapper>
        <Menu />
        <ProjectIcon onClick={() => handleChangePage()} />
      </MenuWrapper>
      <MainPageWrapper>
        <UpperBannerWrapper>
          <UpperBanner />
        </UpperBannerWrapper>
        <LowerSectionWrapper>
          {projectsView
            ? (
              <TaskSectionWrapper onDragOver={handleDragAndDrop.onDragOver}>
                <Inbox
                  tasks={tasks}
                  handleAddTask={handleTasks.handleAddTask}
                  onDragStart={handleDragAndDrop.onDragStart}
                  onDrop={handleDragAndDrop.onDrop}
                  onDragOver={handleDragAndDrop.onDragOver}
                  handleTaskEdit={handleTasks.handleTaskEdit}
                  isInboxExpanded={isInboxExpanded}
                  handleProjectCollapsible={handleProjects.handleProjectCollapsible}
                />
                <ProjectList
                  projects={projects}
                  tasks={tasks}
                  sections={sections}
                  isInboxExpanded={isInboxExpanded}
                  handleAddTask={handleTasks.handleAddTask}
                  onDragStart={handleDragAndDrop.onDragStart}
                  onDrop={handleDragAndDrop.onDrop}
                  onDragOver={handleDragAndDrop.onDragOver}
                  handleTaskEdit={handleTasks.handleTaskEdit}
                  handleProjectCollapsible={handleProjects.handleProjectCollapsible}
                  handleProjectEdit={handleProjects.handleProjectEdit}
                  handleAddProject={handleProjects.handleAddProject}
                  handleSectionCollapsible={handleSections.handleSectionCollapsible}
                  handleSectionEdit={handleSections.handleSectionEdit}
                  handleAddSection={handleSections.handleAddSection}
                  handleFocus={handleFocus}
                />
              </TaskSectionWrapper>
            )
            : (<TaskSectionPlaceholder />)}
          <CalendarSectionWrapper>
            <Schedule />
            <Calendar
              tasks={tasks}
              onDrop={handleDragAndDrop.onDrop}
              onDragOver={handleDragAndDrop.onDragOver}
              onDragStart={handleDragAndDrop.onDragStart}
            />
          </CalendarSectionWrapper>
        </LowerSectionWrapper>
      </MainPageWrapper>
    </OuterContainerWrapper>
  );
}

export default App;
