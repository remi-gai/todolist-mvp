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
  taskName: string,
  category: Category,
  projectId: number,
  sectionId: number,
  hourName: string
}

enum Category {
  MAIN = 'MAIN',
  CALENDAR = 'CALENDAR',
}

function App() {
  // hooks
  const [tasks, setTasks] = useState([] as TaskFormat[]);
  const [taskId, setTaskId] = useState<number>(0);
  const [projectsView, setProjectsView] = useState<Boolean>(true);

  // componentDidMount for tasks
  useEffect(() => {
    const dummyTasks = dummyData.tasks;

    if (tasks.length !== 0) {
      return;
    }

    setTasks(dummyTasks);
    setTaskId(dummyTasks.length);
  }, []);

  // methods
  const handleChangePage = () => {
    setProjectsView(!projectsView);
  };

  const handleFocus = (event: React.FocusEvent<any>) => {
    event.target.select();
  };

  const handleDragAndDrop = {
    onDragOver: (event: React.DragEvent<any>) => {
      event.preventDefault();
    },
    onDragStart: (event: React.DragEvent<any>, taskName: string, taskid: string) => {
      event.dataTransfer.setData('taskName', taskName);
      event.dataTransfer.setData('taskId', taskid);
    },
    onDrop: (event: React.DragEvent<any>, category: Category, projectId: number = 0, sectionId: number = 0, hourName: string = '') => {
      const taskName = event.dataTransfer.getData('taskName');
      const taskid = event.dataTransfer.getData('taskId');
      const currentTasks = tasks.slice();

      // path for adding to calendar
      if (category === Category.CALENDAR) {
        // check that the task isn't already in calendar
        for (let i = 0; i < currentTasks.length; i += 1) {
          const current = currentTasks[i];
          if (current.taskId === Number(taskid) && current.category === Category.CALENDAR) {
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
          hourName,
        };

        currentTasks.push(newTask);
        setTasks(currentTasks);
      } else {
        // update the projectId and sectionId of the task
        const targetTask = currentTasks.find((task) => task.taskId === Number(taskid));
        if (targetTask) {
          targetTask.projectId = projectId;
          targetTask.sectionId = sectionId;
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
        taskId: currentTaskId, taskName: 'New Task', category: Category.MAIN, projectId, sectionId, hourName: '',
      };

      currentTasks.push(newTask);
      setTasks(currentTasks);
      setTaskId(currentTaskId + 1);
    },
    handleTaskEdit: (event: any, taskid: number) => {
      const { value } = event.target;
      const currentTasks: TaskFormat[] = tasks.slice();
      const targetTask = currentTasks.find((task) => task.taskId === taskid);
      if (targetTask) targetTask.taskName = value;
      setTasks(currentTasks);
    },
  };

  const { onDragOver, onDragStart, onDrop } = handleDragAndDrop;
  const { handleAddTask, handleTaskEdit } = handleTasks;

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
                  handleAddTask={handleAddTask}
                  handleTaskEdit={handleTaskEdit}
                  handleFocus={handleFocus}
                  onDragStart={onDragStart}
                  onDrop={onDrop}
                />

                <ProjectList
                  tasks={tasks}
                  handleAddTask={handleAddTask}
                  handleTaskEdit={handleTaskEdit}
                  handleFocus={handleFocus}
                  onDragStart={onDragStart}
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                />
              </TaskSectionWrapper>
            )
            : (<TaskSectionPlaceholder />)}

          <CalendarSectionWrapper>
            <Schedule />
            <Calendar
              tasks={tasks}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onDragStart={onDragStart}
            />
          </CalendarSectionWrapper>

        </LowerSectionWrapper>
      </MainPageWrapper>
    </OuterContainerWrapper>
  );
}

// memo: performance boost by memoizing
export default memo(App);
