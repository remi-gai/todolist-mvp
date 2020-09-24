const dummyData = {
  tasks: [
    {
      taskId: 0, taskName: 'Read book', category: 'main', projectId: 0, sectionId: 0, timeStamp: '',
    },
    {
      taskId: 1, taskName: 'Pay bills', category: 'main', projectId: 0, sectionId: 0, timeStamp: '',
    },
    {
      taskId: 2, taskName: 'Go to the gym', category: 'main', projectId: 0, sectionId: 0, timeStamp: '',
    },
    {
      taskId: 3, taskName: 'Play baseball', category: 'main', projectId: 0, sectionId: 0, timeStamp: '',
    },
    {
      taskId: 4, taskName: 'Design Mockup', category: 'main', projectId: 1, sectionId: 0, timeStamp: '',
    },
    {
      taskId: 5, taskName: 'Build drag and drop feature', category: 'main', projectId: 1, sectionId: 1, timeStamp: '',
    },
    {
      taskId: 6, taskName: 'Brainstorm new ideas', category: 'main', projectId: 2, sectionId: 2, timeStamp: '',
    },
    {
      taskId: 7, taskName: 'Start Draft: How to setup Electron in 3 easy steps', category: 'main', projectId: 2, sectionId: 1, timeStamp: '',
    },
    {
      taskId: 8, taskName: 'Finalize Wireframes', category: 'main', projectId: 1, sectionId: 2, timeStamp: '',
    },
    {
      taskId: 9, taskName: 'Finalize Pitch Deck', category: 'main', projectId: 1, sectionId: 0, timeStamp: '',
    },
    {
      taskId: 10, taskName: 'Hire a designer to create company logo', category: 'main', projectId: 1, sectionId: 0, timeStamp: '',
    },
    {
      taskId: 11, taskName: 'Refactor App.js file', category: 'main', projectId: 1, sectionId: 1, timeStamp: '',
    },
  ],
  projects: [
    { projectId: 1, projectName: 'Side Project', isExpanded: false },
    { projectId: 2, projectName: 'Blog', isExpanded: false },
    { projectId: 3, projectName: 'Work', isExpanded: false },
  ],
  sections: [
    {
      sectionId: 1, sectionName: 'Engineering', projectId: 1, isExpanded: false,
    },
    {
      sectionId: 2, sectionName: 'Design', projectId: 1, isExpanded: false,
    },
    {
      sectionId: 3, sectionName: 'Tech', projectId: 2, isExpanded: false,
    },
    {
      sectionId: 4, sectionName: 'Life Style', projectId: 2, isExpanded: false,
    },
    {
      sectionId: 5, sectionName: 'Art', projectId: 2, isExpanded: false,
    },
  ],
};

export default dummyData;
