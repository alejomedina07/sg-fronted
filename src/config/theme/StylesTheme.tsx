import { createStyles, makeStyles } from '@mui/material';
import { Theme } from '@mui/material/styles';

export const sgUseStyles = makeStyles((theme: Theme) =>
  createStyles({
    bgSecondaryMain: {
      backgroundColor: theme.palette.secondary.main,
      // Otras propiedades de estilo que desees añadir
    },
  })
);
