import { FC, ReactChild} from 'react';
import { Grid, GridSpacing } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: "100%"
    },
    container: {
      marginTop: "1em", 
      marginBottom: "1em", 
      width:"100%", 
      marginLeft: "0", 
      marginRight: "0"
    }
  }),
);

type ContentContainerProps = {
  children: ReactChild | Array<ReactChild>;
  spacing?: GridSpacing
};


const ContentContainer: FC<ContentContainerProps> = (props: ContentContainerProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container direction="column" alignItems="center" spacing={props.spacing || 2} className={classes.container}>
        {props.children}
      </Grid>
    </div>
    );
}

export default ContentContainer;