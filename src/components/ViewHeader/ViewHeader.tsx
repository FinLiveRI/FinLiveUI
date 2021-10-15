import { FC, SVGProps } from 'react';
import { Grid, Typography } from '@material-ui/core';
import theme from '../../theme';

type ViewHeaderProps = {
  title: string,
  TitleIcon: FC<SVGProps<SVGSVGElement>>
}

const ViewHeader: FC<ViewHeaderProps> = (props: ViewHeaderProps) => {
  const TitleIcon: FC<SVGProps<SVGSVGElement>> = props.TitleIcon;

  return (
    <Grid container direction="row" justifyContent="center">
      <TitleIcon fill={theme.palette.secondary.main} width="3.5em" height="3.5em" />
      <Typography variant="h3" style={{textTransform: "uppercase"}}>
        {props.title}
      </Typography>
    </Grid>
  );
}

export default ViewHeader;