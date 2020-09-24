import React from 'react';
import styled from 'styled-components';
import CalendarTaskEntry from './CalendarTaskEntry';
import TaskFormat from './taskInterface';

const CalendarWrapper = styled.div`
  border-top: solid 0.5px #DCDCDC;
  height: 360px;
  width: 290px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

CalendarWrapper.displayName = 'CalendarWrapper';

const TimeslotWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

TimeslotWrapper.displayName = 'TimeslotWrapper';

const TimeStamp = styled.div`
    display: flex;
    justify-content: center;
    height: 60px;
    width: 34px;
    font-size: 10px;
    font-weight: lighter;
`;

TimeStamp.displayName = 'TimeStamp';

const TimeBox = styled.div`
    border-top: solid 0.5px #DCDCDC;
    border-bottom: solid 0.5px #DCDCDC;
    height: 60px;
    width: 230px;
    background-color: #EBEBEB;
`;

TimeBox.displayName = 'TimeBox';

const timeSlots = ['8 AM', '9 AM', '10 AM', '11 AM', '12 AM', '1 PM', '2 PM'];

interface Props {
  tasks: TaskFormat[];
  onDrop: Function,
  onDragStart: Function,
  onDragOver: Function,
}

function Calendar(props: Props) {
  const {
    tasks, onDrop, onDragOver, onDragStart,
  } = props;

  return (
    <CalendarWrapper>
      {
        timeSlots.map((time, index) => (
          <TimeslotWrapper key={time} onDragOver={(event) => onDragOver(event)} onDrop={(event) => onDrop(event, 'calendar', null, null, timeSlots[index])}>
            <TimeStamp>{time}</TimeStamp>
            <TimeBox>
              {
                tasks.map((task) => {
                  if (task.category === 'calendar' && task.timeStamp === time) {
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
