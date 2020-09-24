import React from 'react';
import styled from 'styled-components';
import TaskList from './TasksList';

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

const Inbox = (props) => {
  const tasks = (
    <TaskList
      tasks={props.tasks}
      projectId={0}
      sectionId={0}
      onDragStart={props.onDragStart}
      onDragOver={props.onDragOver}
      handleTaskEdit={props.handleTaskEdit}
      handleAddTask={props.handleAddTask}
    />
  );
  const triangle = props.isInboxExpanded ? '▾' : '▸';

  return (
    <InboxWrapper onDrop={(event) => props.onDrop(event, null, 0)}>
      <IconAndTitleWrapper>
        <TriangleIcon onClick={() => props.handleProjectCollapsible(0)}>{triangle}</TriangleIcon>
        <InboxTitle>Inbox:</InboxTitle>
      </IconAndTitleWrapper>
      {
        props.isInboxExpanded ? tasks : null
      }
    </InboxWrapper>
  );
};

export default Inbox;
