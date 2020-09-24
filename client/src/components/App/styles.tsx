import styled, { createGlobalStyle } from 'styled-components';

// styled-components styling
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Open-Sans, Helvetica, Sans-Serif;
    color: #585858;
  }
`;

const OuterContainerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  /* pixels hard coded for demom */
  width: 984px;
  height: 750px;
  border: solid 1px black;
  border-radius: 10px;
`;

OuterContainerWrapper.displayName = 'OuterContainerWrapper';

const MenuWrapper = styled.div`
  width: 50px;
`;

MenuWrapper.displayName = 'MenuWrapper';

const Menu = styled.img.attrs({
  src: './images/menu.png',
})`
  width: 50px;
  height: 750px;
`;

Menu.displayName = 'Menu';

const Schedule = styled.img.attrs({
  src: './images/calendar.png',
})`
  width: 290px;
`;

Schedule.displayName = 'Schedule';

const UpperBanner = styled.img.attrs({
  src: './images/top-banner.png',
})`
  height: 175px;
`;

UpperBanner.displayName = 'UpperBanner';

const ProjectIcon = styled.img.attrs({
  src: './images/projectLogo.png',
})`
  position: absolute;
  height: 18px;
  margin-top: 131px;
  margin-left: -33px;
  &:hover {
    cursor: pointer;
  }
`;

ProjectIcon.displayName = 'ProjectIcon';

const MainPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

MainPageWrapper.displayName = 'MainPageWrapper';

const UpperBannerWrapper = styled.div`
  height: 175px;
`;

UpperBannerWrapper.displayName = 'UpperBannerWrapper';

const LowerSectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 575px;
`;

LowerSectionWrapper.displayName = 'LowerSectionWrapper';

const TaskSectionWrapper = styled.div`
  width: 640px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

TaskSectionWrapper.displayName = 'TaskSectionWrapper';

const CalendarSectionWrapper = styled.div`
  width: 300px;
`;

CalendarSectionWrapper.displayName = 'CalendarSectionWrapper';

const TaskSectionPlaceholder = styled.img.attrs({
  src: './images/task-page.png',
})`
  width: 650px;
`;

TaskSectionPlaceholder.displayName = 'TaskSectionPlaceholder';

export {
  GlobalStyle, OuterContainerWrapper, MenuWrapper, Menu, Schedule, UpperBanner, ProjectIcon,
  MainPageWrapper, UpperBannerWrapper, LowerSectionWrapper, TaskSectionWrapper,
  CalendarSectionWrapper, TaskSectionPlaceholder,
};
