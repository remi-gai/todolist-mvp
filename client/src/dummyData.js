const dummyData = {
  tasks: [
    {
      taskId: 0, taskName: 'Read book', category: 'MAIN', projectId: 0, sectionId: 0, hourName: '',
    },
    {
      taskId: 1, taskName: 'Pay bills', category: 'MAIN', projectId: 0, sectionId: 0, hourName: '',
    },
    {
      taskId: 2, taskName: 'Go to the gym', category: 'MAIN', projectId: 0, sectionId: 0, hourName: '',
    },
    {
      taskId: 3, taskName: 'Play baseball', category: 'MAIN', projectId: 0, sectionId: 0, hourName: '',
    },
    {
      taskId: 4, taskName: 'Design Mockup', category: 'MAIN', projectId: 1, sectionId: 0, hourName: '',
    },
    {
      taskId: 5, taskName: 'Build drag and drop feature', category: 'MAIN', projectId: 1, sectionId: 1, hourName: '',
    },
    {
      taskId: 6, taskName: 'Brainstorm new ideas', category: 'MAIN', projectId: 2, sectionId: 2, hourName: '',
    },
    {
      taskId: 7, taskName: 'Start Draft: How to setup Electron in 3 easy steps', category: 'MAIN', projectId: 2, sectionId: 1, hourName: '',
    },
    {
      taskId: 8, taskName: 'Finalize Wireframes', category: 'MAIN', projectId: 1, sectionId: 2, hourName: '',
    },
    {
      taskId: 9, taskName: 'Finalize Pitch Deck', category: 'MAIN', projectId: 1, sectionId: 0, hourName: '',
    },
    {
      taskId: 10, taskName: 'Hire a designer to create company logo', category: 'MAIN', projectId: 1, sectionId: 0, hourName: '',
    },
    {
      taskId: 11, taskName: 'Refactor App.js file', category: 'MAIN', projectId: 1, sectionId: 1, hourName: '',
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
