import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  List,
  Typography,
  ListItemText,
  IconButton,
  ListItem,
} from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { PersonListComponent } from '../../../../components/shared/turn/PersonListComponent';

interface ListTakenTurnsProps {
  turns: any;
}

export const ListTakenTurns = (props: ListTakenTurnsProps) => {
  const { turns } = props;
  const { t } = useTranslation();

  // console.log(7777, turns);

  const handleOnTake = (turn: any) => {
    console.log(78974, turn);
  };

  return (
    <>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="available-content"
          id="available-header"
        >
          <Typography>{t('turns_taken')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-row items-center">
            <Grid item xs={12} md={8} className="flex-1">
              <Typography sx={{ mb: 2 }} variant="h4" component="div">
                {t('turns')}
              </Typography>

              {/* {turns */}
              {/*   .slice() */}
              {/*   .reverse() */}
              {/*   .map((turn: any, index: number) => ( */}
              {/*     <PersonListComponent */}
              {/*       key={`turn-${turn.id}`} */}
              {/*       user={turn.name} */}
              {/*       onTake={() => handleOnTake(turn)} */}
              {/*       turn={turn} */}
              {/*     /> */}
              {/*   ))} */}

              {/* <List dense> */}
              {/*   {turns */}
              {/*     .slice() */}
              {/*     .reverse() */}
              {/*     .map((turn: any, index: number) => ( */}
              {/*       <ListItem */}
              {/*         key={`list-turn-taken-${turn.id}-${index}`} */}
              {/*         secondaryAction={ */}
              {/*           <IconButton edge="end" aria-label="delete"> */}
              {/*             <CachedIcon /> */}
              {/*           </IconButton> */}
              {/*         } */}
              {/*       > */}
              {/*         <ListItemText */}
              {/*           primary="Single-line item" */}
              {/*           secondary={'Secondary text'} */}
              {/*         /> */}
              {/*       </ListItem> */}
              {/*     ))} */}
              {/* </List> */}
            </Grid>
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
