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

const CalendarTaskEntry = (props) => (
  <CalendarTaskWrapper
    draggable
    onDragStart={(event) => props.onDragStart(event, props.taskName, props.taskId)}
  >
    {props.taskName}
  </CalendarTaskWrapper>
);

export default CalendarTaskEntry;
