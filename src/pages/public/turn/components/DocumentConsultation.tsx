import { IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { SgButton } from '../../../../components/form/button/SgButton';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Environment } from '../../../../utils/env/Environment';
import io from 'socket.io-client';
import { Person } from '../../../admin/turn/dto/Person';
import { TurnsTaken } from '../dto/turn.dto';
import useSnackbar from '../../../../store/hooks/notifications/snackbar/useSnackbar';
import { Link } from 'react-router-dom';

interface DocumentConsultationProps {
  setConsultation: (consultation: boolean) => void;
}

const env = new Environment();

const socket = io(env.socket.io);
const room = env.socket.room;

export const DocumentConsultation = (props: DocumentConsultationProps) => {
  const { setConsultation } = props;
  const { t } = useTranslation();
  const [filterValue, setFilterValue] = useState('');
  const [message, setMessage] = useState<any>();
  const [turnsTaken, setTurnsTaken] = useState<Person[]>([]);
  const [turns, setTurns] = useState<Person[]>([]);
  const { openSnackbarAction } = useSnackbar();
  useEffect(() => {
    // Manejar eventos cuando la conexión con el servidor WebSocket se establece
    socket.on('connect', () => {
      console.log('Conectado al servidor WebSocket');
    });

    // Manejar eventos cuando se actualiza la lista de turnos
    socket.on('turnList', (allTurns: Person[]) => {
      // console.log('turnList::', allTurns);
      setTurns([...allTurns]);
    });

    socket.emit('eventJoin', room);

    socket.on('turnTakenList', (args: TurnsTaken) => {
      const { turnsTaken } = args;
      setTurnsTaken(turnsTaken);
    });

    return () => {
      socket.off('turnList');
      socket.off('connect');
    };
  }, []);

  const handleSearch = () => {
    console.log(21, turns);
    const turn = turns.filter((item) => `${item.document}` === filterValue);

    console.log(111, turn);
    const turnTake = turnsTaken.filter(
      (item) => `${item.document}` === filterValue
    );
    if (turn?.length || turnTake?.length) {
      setMessage({ class: 'text-red-600', name: 'Tiene procesos pendientes' });
      openSnackbarAction({
        message: 'Tiene procesos pendientes',
        type: 'error',
      });
    } else {
      setMessage({
        class: 'text-green-700',
        name: 'No tiene procesos pendientes',
      });
      openSnackbarAction({
        message: 'No tiene procesos pendientes',
        type: 'success',
      });
    }
    setTimeout(() => {
      setConsultation(false);
    }, 3000);
  };

  return (
    <>
      {!!message?.name && (
        <b className={`text-3xl ${message.class}`}>{message.name}</b>
      )}
      <div className="flex flex-row items-center my-4 w-full">
        <TextField
          label={t('document_number')}
          variant="outlined"
          type="number"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          fullWidth
          size="small"
        />
        <IconButton type="button" aria-label="search">
          <SearchIcon />
        </IconButton>
      </div>
      <SgButton
        variant="contained"
        color="primary"
        label={t('search')}
        onClickAction={handleSearch}
        classes="w-full"
      />
      <SgButton
        classes="!px-8 !ml-4 hover:underline"
        variant="outlined"
        color="primary"
        label={t('back')}
        onClickAction={() => setConsultation(false)}
        // sending={isLoading}
      />
    </>
  );
};
