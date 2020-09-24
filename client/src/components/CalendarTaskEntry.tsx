import React from 'react';
import styled from 'styled-components';

const CalendarTaskWrapper = styled.div`
  font-size: 12px;
  color: white;
  background-color: #587169;
  padding: 1px;
  border-radius: 4px;
  border: solid 1px #282828;
  &:hover {
    cursor: pointer;
  }
`;

interface Props {
  taskName: string,
  taskId: number,
  onDragStart: Function,
}

function CalendarTaskEntry(props: Props) {
  const { onDragStart, taskName, taskId } = props;
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
