import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import dummyData from '../dummyData';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Open-Sans, Helvetica, Sans-Serif;
    color: #585858;
  }
`;

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

  //hooks
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
        taskId: currentTaskId, taskName: 'New Task', category: 'main', projectId: projectId, sectionId: sectionId, timeStamp: ''
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
  }

  const handleSections = {
    handleAddSection(projectId: number) {
      const currentSections: SectionFormat[] = sections.slice();
      const currentSectionId: number = sectionId;
      const newSection: SectionFormat = { sectionId: currentSectionId, sectionName: 'New Section', projectId: projectId, isExpanded: true }
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
    }
  }

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
        const newTask: TaskFormat = { taskId: Number(taskId), taskName: taskName, category: category, projectId: projectId, sectionId: sectionId, timeStamp: timeStamp };
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
    }
  }

  const handleChangePage = () => {
    setProjectsView(!projectsView);
  }

  const handleFocus = (event: any) => {
    event.target.select();
  }

  return (
    <div>
      <button onClick={() => handleProjects.handleAddProject()}>Add</button>
    </div>
  )
}

export default App;