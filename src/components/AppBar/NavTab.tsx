import { cloneElement, ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Icon,
  Tab,
} from '@material-ui/core';
import { 
  makeStyles, 
  Theme, 
  createStyles 
} from '@material-ui/core/styles';

type NavTabProps = {
  svgIcon: ReactElement,
  selected?: boolean,
  label: string,
  url: string,
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tabIcon: {
      fill: 'white'
    },
  }),
);

const NavTab: React.FC<NavTabProps> = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => history.push(props.url);

  const TabIcon: ReactElement = (
    <Icon>
      {cloneElement(props.svgIcon, {className: classes.tabIcon})}
    </Icon>
  )

  return (
    <Tab 
      selected={props.selected}
      label={props.label} 
      icon={TabIcon}
      onClick={handleClick}
      tabIndex={0}
    />
  );
}

export default NavTab;