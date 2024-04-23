import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Avatar,
  IconButton,
  LinearProgress,
  linearProgressClasses,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SwipeRightIcon from '@mui/icons-material/SwipeRight';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Person } from '../../../pages/admin/turn/dto/Person';
import { ViewTurn } from '../../../pages/admin/turn/components/ViewTurn';
import { useTranslation } from 'react-i18next';
import DateFnsManager from '../../../services/utils/DateFnsManager';

const dateManage = new DateFnsManager();

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

const Demo = styled('div')(({ theme }: any) => ({
  backgroundColor: theme.palette.background.paper,
  margin: '8px',
}));

interface PersonListComponentProps {
  user: any;
  roomAppointMent?: string | undefined;
  take?: boolean;
  onTake?: () => void;
  deleteTurn?: (person: Person) => void;
  turn?: Person;
  config?: any;
}

export const PersonListComponent = (props: PersonListComponentProps) => {
  const { user, onTake, roomAppointMent, turn, deleteTurn, config } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { t } = useTranslation();

  const getClass = () => {
    return onTake && turn?.timeAppointment
      ? 'border-4 rounded border-blue-400 pr-3 p-2'
      : 'border-2 rounded ';
  };

  const getPercentage = (): number => {
    // console.log(turn?.typeTurns);
    let attendedCount = 0;

    // Iterar sobre el arreglo y contar los elementos atendidos
    for (const item of turn?.typeTurns) {
      if (item.attended) {
        attendedCount++;
      }
    }

    // Calcular el porcentaje de elementos atendidos
    const percentage = (attendedCount / turn?.typeTurns.length) * 100;

    // Redondear el porcentaje a dos decimales
    return parseFloat(percentage.toFixed(2));
    // return 50;
  };

  return (
    <Demo>
      <List dense>
        <ListItem
          className={getClass()}
          secondaryAction={
            !!onTake && (
              <div className="flex flex-row items-center ">
                <IconButton
                  edge="end"
                  className="!mx-4"
                  aria-label="delete"
                  onClick={() => setIsOpen(true)}
                >
                  <VisibilityIcon />
                </IconButton>
                {config && !config.reception && (
                  <IconButton edge="end" aria-label="delete" onClick={onTake}>
                    <SwipeRightIcon />
                  </IconButton>
                )}
              </div>
            )
          }
        >
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <>
                <Typography variant="h3" component="b">
                  {user}
                </Typography>
                <br />
                <Typography variant="h4" component="b">
                  {roomAppointMent}
                </Typography>
              </>
            }
            secondary={
              onTake && (
                <>
                  <span>
                    {turn?.timeAppointment && (
                      <span className=" bg-green-400 p-2 mr-2 rounded">
                        {t('time_appointment')}:{' '}
                        <b> {turn?.timeAppointment} </b>{' '}
                      </span>
                    )}{' '}
                    {t('document_number')}: <b> {turn?.document} </b> -{' '}
                    {t('ingreso')}:{' '}
                    <b>
                      {' '}
                      {turn?.createdAt
                        ? dateManage.getFormatStandard(
                            new Date(turn.createdAt),
                            true
                          )
                        : ''}{' '}
                    </b>{' '}
                  </span>
                  <BorderLinearProgress
                    className="mt-3"
                    variant="determinate"
                    value={getPercentage()}
                  />
                </>
              )
            }
          />
        </ListItem>
      </List>
      {isOpen && turn && (
        <ViewTurn
          isOpen={isOpen}
          deleteTurn={deleteTurn}
          setIsOpen={setIsOpen}
          turn={turn}
        />
      )}
    </Demo>
  );
};
