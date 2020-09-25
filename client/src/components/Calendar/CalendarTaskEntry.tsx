import React from 'react';

import { CalendarTaskWrapper } from './styles';

interface Props {
  taskName: string,
  taskId: number,
  onDragStart: Function,
}

function CalendarTaskEntry({ onDragStart, taskName, taskId }: Props) {
  return (
    <CalendarTaskWrapper
      draggable
      onDragStart={(event) => onDragStart(event, taskName, taskId)}
    >
      {taskName}
    </CalendarTaskWrapper>
  );
}

export default CalendarTaskEntry;
