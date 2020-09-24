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

interface Props {
  taskName: string,
  taskId: number,
  onDragStart: Function,
  handleTaskEdit: Function,
  handleFocus: Function
}

function TaskEntry(props: Props) {
  const {
    onDragStart, handleTaskEdit, taskName, taskId, handleFocus,
  } = props;
  return (
    <TaskWrapper
      draggable
      onDragStart={(event) => onDragStart(event, taskName, taskId)}
    >
      <TaskName
        defaultValue={taskName}
        onChange={(event) => handleTaskEdit(event, taskId)}
        onFocus={handleFocus}
      />
    </TaskWrapper>
  );
}

export default TaskEntry;
