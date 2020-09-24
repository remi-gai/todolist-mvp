import React, { useState, useEffect, memo } from 'react';

import dummyData from '../../dummyData';
import Calendar from '../Calendar/Calendar';
import Inbox from '../Inbox/Inbox';
import ProjectList from '../Projects/ProjectList';

import {
  GlobalStyle, OuterContainerWrapper, MenuWrapper, Menu, Schedule, UpperBanner, ProjectIcon,
  MainPageWrapper, UpperBannerWrapper, LowerSectionWrapper, TaskSectionWrapper,
  CalendarSectionWrapper, TaskSectionPlaceholder,
} from './styles';

// interfaces
interface TaskFormat {
  taskId: number,
  // ids should be guuid
  taskName: string,
  category: string,
  // category should be an enum
  projectId: number,
  sectionId: number,
  timeStamp: string
  // timeStamp: Date
}

function App() {
  // hooks
  const [tasks, setTasks] = useState([] as TaskFormat[]);
  const [taskId, setTaskId] = useState(0);
  const [projectsView, setProjectsView] = useState(true);

  // componentDidMount for tasks
  useEffect(() => {
    const dummyTasks = dummyData.tasks;

    if (tasks.length !== 0) {
      return;
    }

    setTasks(dummyTasks);
    setTaskId(dummyTasks.length);
    // return () => {}
  }, []);

  // methods
  const handleChangePage = () => {
    setProjectsView(!projectsView);
  };

  const handleFocus = (event: any) => {
    event.target.select();
  };

  // split out into interationUtils.ts
  const handleDragAndDrop = {
    onDragOver: (event: any) => {
      event.preventDefault();
    },
    // pass an object
    // onDragStart: ({ event: any, taskName: string, taskid: number}) => {
    onDragStart: (event: any, taskName: string, taskid: number) => {
      event.dataTransfer.setData('taskName', taskName);
      event.dataTransfer.setData('taskId', taskid);
    },
    // consider using cb
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
        // db(currentTasks)
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

  const { onDragOver, onDragStart } = handleDragAndDrop;

  return (
    <OuterContainerWrapper>
      <GlobalStyle />

      <MenuWrapper>
        <Menu />
        <ProjectIcon onClick={handleChangePage} />
      </MenuWrapper>

      <MainPageWrapper>
        <UpperBannerWrapper>
          <UpperBanner />
        </UpperBannerWrapper>

        <LowerSectionWrapper>
          {projectsView
            ? (
              <TaskSectionWrapper onDragOver={onDragOver}>
                <Inbox
                  tasks={tasks}
                  handleAddTask={handleTasks.handleAddTask}
                  handleTaskEdit={handleTasks.handleTaskEdit}
                  handleFocus={handleFocus}
                  onDragStart={onDragStart}
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

// memo: performance boost by memoizing
export default memo(App);
