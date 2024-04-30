import { Person } from '../../dto/Person';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';

interface ListTurnsProps {
  preTurns: Person[];
  handleOnTake: (turn: Person) => void;
}

export const ListPreTurns = (props: ListTurnsProps) => {
  const { preTurns, handleOnTake } = props;
  const { t } = useTranslation();

  return (
    <>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="available-content"
          id="available-header"
        >
          <Typography>{t('available_pre_turns')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-row items-center">
            <Grid item xs={12} md={8} className="flex-1">
              {/* <Typography sx={{ mb: 2 }} variant="h4" component="div"> */}
              {/*   {t('pre_turns')} */}
              {/* </Typography> */}

              <TableContainer component={Paper}>
                <Table aria-label="simple table" size="small">
                  <TableHead className="bg-blue-200">
                    <TableRow>
                      <TableCell> {t('name')} </TableCell>
                      <TableCell align="right">{t('company')}</TableCell>
                      <TableCell align="right">{t('document')}</TableCell>
                      <TableCell align="right">{t('actions')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {preTurns.map((row: Person) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.company}</TableCell>
                        <TableCell align="right">{row.document}</TableCell>
                        <TableCell align="right">
                          <IconButton
                            edge="end"
                            aria-label="Edit"
                            onClick={() => handleOnTake(row)}
                          >
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* {preTurns */}
              {/*   .slice() */}
              {/*   .reverse() */}
              {/*   .map((turn, index) => ( */}
              {/*     <PersonListComponent */}
              {/*       key={`turn-${turn.id}`} */}
              {/*       user={turn.name} */}
              {/*       onTake={() => handleOnTake(turn)} */}
              {/*       turn={turn} */}
              {/*     /> */}
              {/*   ))} */}
            </Grid>
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
