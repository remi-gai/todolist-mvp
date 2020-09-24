import React from 'react';

import { TaskName, TaskWrapper } from './styles';

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
