import React, { useState } from 'react';
import styled from 'styled-components';
import TaskList from './TasksList';
import TaskFormat from './taskInterface';

const InboxTitle = styled.div`
  font-weight: bold;
  font-size: 20px;
`;

InboxTitle.displayName = 'InboxTitle';

const InboxWrapper = styled.div`
`;

InboxWrapper.displayName = 'InboxWrapper';

const IconAndTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  border-bottom: solid 1px #DCDCDC;
`;

IconAndTitleWrapper.displayName = 'IconAndTitleWrapper';

const TriangleIcon = styled.div`
  padding-right: 8px;
  cursor: pointer;
`;

TriangleIcon.displayName = 'TriangleIcon';

interface Props {
  tasks: TaskFormat[];
  onDrop: Function,
  onDragStart: Function,
  onDragOver: Function,
  handleTaskEdit: Function,
  handleAddTask: Function,
  handleFocus: Function
}

const Inbox = (props: Props) => {
  const
    {
      tasks, onDrop, onDragStart, onDragOver, handleTaskEdit, handleAddTask, handleFocus,
    } = props;
  const [isInboxExpanded, setIsInboxExpanded] = useState(true);

  const tasksList = (
    <TaskList
      tasks={tasks}
      projectId={0}
      sectionId={0}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      handleTaskEdit={handleTaskEdit}
      handleAddTask={handleAddTask}
      handleFocus={handleFocus}
    />
  );

  const triangle = isInboxExpanded ? '▾' : '▸';

  const handleInboxCollapsible = () => {
    setIsInboxExpanded(!isInboxExpanded);
  };

  return (
    <InboxWrapper onDrop={(event) => onDrop(event, null, 0)}>
      <IconAndTitleWrapper>
        <TriangleIcon onClick={() => handleInboxCollapsible()}>{triangle}</TriangleIcon>
        <InboxTitle>Inbox:</InboxTitle>
      </IconAndTitleWrapper>
      {
        isInboxExpanded ? tasksList : null
      }
    </InboxWrapper>
  );
};

export default Inbox;
