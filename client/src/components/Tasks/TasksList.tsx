import React from 'react';
import TaskEntry from './TaskEntry';
import TaskFormat from './taskInterface';

import { AddTaskButton } from './styles';

interface Props {
  tasks: TaskFormat[];
  projectId: number,
  sectionId: number,
  onDragStart: Function,
  handleTaskEdit: Function,
  handleAddTask: Function,
  handleFocus: Function
}

function TasksList({
  tasks, onDragStart, handleTaskEdit, handleAddTask, handleFocus, projectId, sectionId,
}: Props) {
  return (
    <div>
      {
        tasks.map((task) => {
          if (task.category === 'MAIN' && task.projectId === projectId && task.sectionId === sectionId) {
            return (
              <TaskEntry
                taskName={task.taskName}
                key={task.taskId}
                taskId={task.taskId}
                onDragStart={onDragStart}
                handleTaskEdit={handleTaskEdit}
                handleFocus={handleFocus}
              />
            );
          }
          return null;
        })
      }

      <AddTaskButton
        onClick={() => handleAddTask(projectId, sectionId)}
      >
        + Add new Task
      </AddTaskButton>
    </div>
  );
}
export default TasksList;
