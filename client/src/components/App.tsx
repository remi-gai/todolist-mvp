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

function App() {
  // hooks
  const [tasks, setTasks] = useState([] as TaskFormat[]);
  const [taskId, setTaskId] = useState(0);
  const [projectsView, setProjectsView] = useState(true);

  // componentDidMount for tasks
  useEffect(() => {
    const dummyTasks = dummyData.tasks;
    if (tasks.length === 0) {
      setTasks(dummyTasks);
      setTaskId(dummyTasks.length);
    }
  });

  // methods
  const handleChangePage = () => {
    setProjectsView(!projectsView);
  };

  const handleFocus = (event: any) => {
    event.target.select();
  };

  const handleDragAndDrop = {
    onDragOver: (event: any) => {
      event.preventDefault();
    },
    onDragStart: (event: any, taskName: string, taskid: number) => {
      event.dataTransfer.setData('taskName', taskName);
      event.dataTransfer.setData('taskId', taskid);
    },
    onDrop: (event: any, category: string, projectId: number = 0, sectionId: number = 0, timeStamp: string = '') => {
      const taskName = event.dataTransfer.getData('taskName');
      const taskid = event.dataTransfer.getData('taskId');
      const currentTasks = tasks.slice();

      // path for adding to calendar
      if (category === 'calendar') {
        // check that the task isn't already in calendar
        for (let i = 0; i < currentTasks.length; i += 1) {
          const current = currentTasks[i];
          if (current.taskId === Number(taskid) && current.category === 'calendar') {
            // if so, remove from the list of tasks
            currentTasks.splice(i, 1);
            break;
          }
        }
        const newTask: TaskFormat = {
          taskId: Number(taskid),
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
          if (current.taskId === Number(taskid)) {
            current.projectId = projectId;
            current.sectionId = sectionId;
          }
        }
        setTasks(currentTasks);
      }
    },
  };

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
    handleTaskEdit: (event: any, taskid: number) => {
      const { value } = event.target;
      const currentTasks: TaskFormat[] = tasks.slice();
      for (let i = 0; i < currentTasks.length; i += 1) {
        const current: TaskFormat = currentTasks[i];
        if (current.taskId === taskid) {
          current.taskName = value;
        }
      }
      setTasks(currentTasks);
    },
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
                  handleTaskEdit={handleTasks.handleTaskEdit}
                  handleFocus={handleFocus}
                  onDragStart={handleDragAndDrop.onDragStart}
                  onDrop={handleDragAndDrop.onDrop}
                />
                <ProjectList
                  tasks={tasks}
                  handleAddTask={handleTasks.handleAddTask}
                  handleTaskEdit={handleTasks.handleTaskEdit}
                  handleFocus={handleFocus}
                  onDragStart={handleDragAndDrop.onDragStart}
                  onDrop={handleDragAndDrop.onDrop}
                  onDragOver={handleDragAndDrop.onDragOver}
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
