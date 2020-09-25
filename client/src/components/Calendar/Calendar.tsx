import React from 'react';

import CalendarTaskEntry from './CalendarTaskEntry';
import TaskFormat from '../Tasks/taskInterface';

import {
  CalendarWrapper, TimeslotWrapper, TimeStamp, TimeBox,
} from './styles';

const timeSlots = ['8 AM', '9 AM', '10 AM', '11 AM', '12 AM', '1 PM', '2 PM'];

interface Props {
  tasks: TaskFormat[];
  onDrop: Function,
  onDragStart: Function,
  onDragOver: Function,
}

function Calendar({
  tasks, onDrop, onDragOver, onDragStart,
}: Props) {
  return (
    <CalendarWrapper>
      {
        timeSlots.map((time, index) => (
          <TimeslotWrapper
            key={time}
            onDragOver={(event) => onDragOver(event)}
            onDrop={(event) => onDrop(event, 'CALENDAR', null, null, time)}
          >
            <TimeStamp>{time}</TimeStamp>
            <TimeBox>
              {
                tasks.map((task) => {
                  if (task.category === 'CALENDAR' && task.hourName === time) {
                    return (
                      <CalendarTaskEntry
                        taskName={task.taskName}
                        taskId={task.taskId}
                        key={task.taskId}
                        onDragStart={onDragStart}
                      />
                    );
                  }
                  return null;
                })
              }
            </TimeBox>
          </TimeslotWrapper>
        ))
      }
    </CalendarWrapper>
  );
}

export default Calendar;
