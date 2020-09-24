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

function TasksList(props) {
  const { tasks, onDragStart, handleTaskEdit, handleAddTask, handleFocus, projectId, sectionId } = props;
  return (
    <div>
      {
        tasks.map((task, index) => {
          if (task.category === 'main' && task.projectId === projectId && task.sectionId === sectionId) {
            return (
              <TaskEntry
                taskName={task.taskName}
                key={index}
                taskId={task.taskId}
                onDragStart={onDragStart}
                handleTaskEdit={handleTaskEdit}
                handleFocus={handleFocus}
              />
            );
          }
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
