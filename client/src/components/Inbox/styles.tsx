import styled from 'styled-components';

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

export
{
  InboxTitle,
  InboxWrapper,
  IconAndTitleWrapper,
  TriangleIcon,
};
