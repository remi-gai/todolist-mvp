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

export { TaskName, TaskWrapper, AddTaskButton };
