interface TaskFormat {
  taskId: number,
  taskName: string,
  category: Category,
  projectId: number,
  sectionId: number,
  hourName: string
}

enum Category {
  MAIN= 'MAIN',
  CALENDAR= 'CALENDAR',
}

export default TaskFormat;
