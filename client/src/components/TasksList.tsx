import React from 'react';
import styled from 'styled-components';
import TaskEntry from './TaskEntry';
import TaskFormat from './taskInterface';

const AddTaskButton = styled.button`
  background:  transparent;
  border: white;
  color: #A9A9A9;
  height: 35px;
  padding-left: 50px;
  font-size: 13px;
  &:hover {
    color: #181818;
    cursor: pointer;
  }
  &:focus{
    outline: none;
  }
`;

AddTaskButton.displayName = 'AddTaskButton';

interface Props {
  tasks: TaskFormat[];
  projectId: number,
  sectionId: number,
  onDragStart: Function,
  handleTaskEdit: Function,
  handleAddTask: Function,
  handleFocus: Function
}

function TasksList(props: Props) {
  const {
    tasks, onDragStart, handleTaskEdit, handleAddTask, handleFocus, projectId, sectionId,
  } = props;
  return (
    <div>
      {
        tasks.map((task) => {
          if (task.category === 'main' && task.projectId === projectId && task.sectionId === sectionId) {
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
