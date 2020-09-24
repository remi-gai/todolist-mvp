import React from 'react';
import styled from 'styled-components';

const TaskName = styled.input.attrs({
  type: 'text',
})`
  width: 600px;
  height: 35px;
  border: none;
  border-color: transparent;
  padding-left: 50px;
  font-size: 13px;
  &:hover {
    background-color: #F5F5F5;
    cursor: pointer;
  }
  &:focus{
    outline: none;
  }
`;

TaskName.displayName = 'TaskName';

const TaskWrapper = styled.div`
  &:hover {
    background-color: #F5F5F5;
  }
`;

const handleFocus = (event) => event.target.select();

const TaskEntry = (props) => (
  <TaskWrapper
    draggable
    onDragStart={(event) => props.onDragStart(event, props.taskName, props.taskId)}
  >
    <TaskName
      defaultValue={props.taskName}
      onChange={(event) => props.handleTaskEdit(event, props.taskId)}
      onFocus={handleFocus}
    />
  </TaskWrapper>
);

export default TaskEntry;
