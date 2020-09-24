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
      taskId: 7, taskName: 'Start Draft: How to setup Electron in 3 easy steps', category: 'main', projectId: 2, sectionId: 0, timeStamp: '',
    },
  ],
  projects: [
    { projectId: 1, projectName: 'Centered-MVP', isExpanded: true },
    { projectId: 2, projectName: 'Blog', isExpanded: true },
  ],
  sections: [
    {
      sectionId: 1, sectionName: 'Engineering', projectId: 1, isExpanded: true,
    },
    {
      sectionId: 2, sectionName: 'Design', projectId: 1, isExpanded: true,
    },
  ],
};

export default dummyData;
