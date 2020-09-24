import React from 'react';
import styled from 'styled-components';
import TaskEntry from './TaskEntry';

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

const TasksList = (props) => (
  <div>
    {
      props.tasks.map((task, index) => {
        if (task.category === 'main' && task.projectId === props.projectId && task.sectionId === props.sectionId) {
          return (
            <TaskEntry
              taskName={task.taskName}
              key={index}
              taskId={task.taskId}
              onDragStart={props.onDragStart}
              onDragOver={props.onDragOver}
              handleTaskEdit={props.handleTaskEdit} />
          );
        }
      })
    }
    <AddTaskButton
      onClick={() => props.handleAddTask(props.projectId, props.sectionId)}
    >
      + Add new Task
    </AddTaskButton>
  </div>
);

export default TasksList;
