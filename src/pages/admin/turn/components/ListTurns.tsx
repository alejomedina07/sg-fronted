import { Person } from '../dto/Person';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PersonListComponent } from '../../../../components/shared/turn/PersonListComponent';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SearchIcon from '@mui/icons-material/Search';

interface ListTurnsProps {
  turns: Person[];
  handleOnTake: (turn: Person) => void;
  deleteTurn?: (turn: Person) => void;
  config: any;
}
export const ListTurns = (props: ListTurnsProps) => {
  const { turns, handleOnTake, config, deleteTurn } = props;
  const [filterValue, setFilterValue] = useState('');
  const { t } = useTranslation();
  const validateTakeAttention = (data: any) => {
    if (data.inAttention) return false;
    if (config.reception) return true;
    let valid = false;
    data.typeTurns.forEach((item: any) => {
      if (config.typeTurnId == item.id && !item.attended) valid = true;
    });
    return valid;
  };

  return (
    <>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="available-content"
          id="available-header"
        >
          <Typography>{t('available_turns')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-row items-center">
            <Grid item xs={12} md={8} className="flex-1">
              <div className="flex flex-row items-center mb-2">
                <Typography variant="h4" component="div">
                  {t('turns')}
                </Typography>
                <IconButton type="button" aria-label="search">
                  <SearchIcon />
                </IconButton>
                <TextField
                  label={t('filter')}
                  variant="outlined"
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                  fullWidth
                  size="small"
                />
              </div>
              {turns
                .slice()
                .reverse()
                .filter(
                  (turn) =>
                    validateTakeAttention(turn) &&
                    turn.name.toLowerCase().includes(filterValue.toLowerCase())
                )
                .map((turn, index) =>
                  validateTakeAttention(turn) ? (
                    <PersonListComponent
                      key={`turn-${turn.id}`}
                      user={turn.name}
                      onTake={() => handleOnTake(turn)}
                      turn={turn}
                      deleteTurn={deleteTurn}
                      config={config}
                    />
                  ) : null
                )}
            </Grid>
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
