import styled from 'styled-components';

// styled-components styling
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

CalendarTaskWrapper.displayName = 'CalendarTaskWrapper';

export {
  CalendarWrapper,
  TimeslotWrapper,
  TimeStamp,
  TimeBox,
  CalendarTaskWrapper,
};
