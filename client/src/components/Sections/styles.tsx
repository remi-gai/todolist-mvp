import styled from 'styled-components';

const AddSectionButton = styled.button`
background:  transparent;
border: white;
color: #909090;
font-size: 16px;
padding-left: 30px;
height: 35px;
&:hover {
  color: #181818;
  cursor: pointer;
}
&:focus{
    outline: none;
}
`;

AddSectionButton.displayName = 'AddSectionButton';

const SectionWrapper = styled.div`
`;

SectionWrapper.displayName = 'SectionWrapper';

const IconAndTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 30px;
  padding-bottom: 10px;
  padding-top: 4px;
`;

IconAndTitleWrapper.displayName = 'IconAndTitleWrapper';

const TriangleIcon = styled.div`
  padding-right: 5px;
  font-size: 16px;
  cursor: pointer;
`;

TriangleIcon.displayName = 'TriangleIcon';

const SectionName = styled.input.attrs({
  type: 'text',
})`
  width: 150px;
  border: none;
  color: #585858;
  border-color: transparent;
  &:hover {
    cursor: pointer;
  }
  &:focus{
    outline: none;
  }
`;

SectionName.displayName = 'SectionName';

const DefaultSectionWrapper = styled.div`
`;

DefaultSectionWrapper.displayName = 'DefaultSectionWrapper';

export {
  AddSectionButton, SectionWrapper, IconAndTitleWrapper,
  TriangleIcon, SectionName, DefaultSectionWrapper,
};
