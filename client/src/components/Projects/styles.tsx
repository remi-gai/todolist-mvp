import styled from 'styled-components';

const ProjectContainer = styled.div`
  border-bottom: solid 1px #DCDCDC;
  padding-bottom: 20px;
`;

ProjectContainer.displayName = 'ProjectContainer';

const TitleAndButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: solid 1px #DCDCDC;
  justify-content: space-between;
`;

TitleAndButtonWrapper.displayName = 'TitleAndButtonWrapper';

const ProjectsTitle = styled.div`
  font-weight: bold;
  font-size: 20px;
  padding: 24px;
`;

ProjectsTitle.displayName = 'ProjectsTitle';

const IconAndTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 15px;
  padding-top: 20px;
  padding-bottom: 10px;
`;

IconAndTitleWrapper.displayName = 'IconAndTitleWrapper';

const TriangleIcon = styled.div`
  padding-right: 5px;
  font-size: 18px;
  cursor: pointer;
`;

TriangleIcon.displayName = 'TriangleIcon';

const ProjectName = styled.input.attrs({
  type: 'text',
})`
  width: 150px;
  font-size: 18px;
  color: #585858;
  border: none;
  border-color: transparent;
  &:hover {
    cursor: pointer;
  }
  &:focus{
    outline: none;
  }
`;

ProjectName.displayName = 'ProjectName';

const AddProjectButton = styled.button`
  background:  transparent;
  border: white;
  color: #A9A9A9;
  padding-right: 30px;
  font-size: 16px;
  &:hover {
    color: #707070;
    cursor: pointer;
  }
  &:focus{
    outline: none;
  }
`;

AddProjectButton.displayName = 'AddProjectButton';

export {
  ProjectContainer, TitleAndButtonWrapper,
  ProjectsTitle, IconAndTitleWrapper, TriangleIcon,
  ProjectName, AddProjectButton,
};
