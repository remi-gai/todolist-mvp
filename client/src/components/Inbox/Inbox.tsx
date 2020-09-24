import React, { useState } from 'react';

import TaskList from '../Tasks/TasksList';
import TaskFormat from '../taskInterface';

import {
  InboxTitle, InboxWrapper, IconAndTitleWrapper, TriangleIcon,
} from './styles';

interface Props {
  tasks: TaskFormat[];
  onDrop: Function,
  onDragStart: Function,
  handleTaskEdit: Function,
  handleAddTask: Function,
  handleFocus: Function
}

const Inbox = (props: Props) => {
  const
    {
      tasks, onDrop, onDragStart, handleTaskEdit, handleAddTask, handleFocus,
    } = props;
  const [isInboxExpanded, setIsInboxExpanded] = useState(true);

  const tasksList = (
    <TaskList
      tasks={tasks}
      projectId={0}
      sectionId={0}
      onDragStart={onDragStart}
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
