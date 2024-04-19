import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { AddTurnForm } from '../components/AddTurnForm';
import { Person } from '../dto/Person';
import useAuth from '../../../public/auth/redux/hooks/useAuth';
import { ConfigTurnForm } from '../components/ConfigTurnForm';
import { MyTurn } from '../components/MyTurn';
import { ListTurns } from '../components/ListTurns';
import { Environment } from '../../../../utils/env/Environment';
import { ListPreTurns } from '../components/ListPreTurns';
import useSnackbar from '../../../../store/hooks/notifications/snackbar/useSnackbar';
import { useTranslation } from 'react-i18next';
import { TurnsTaken } from '../../../public/turn/dto/turn.dto';
import { ListTakenTurns } from '../components/ListTakenTurns';
import {
  useAddAttentionMutation,
  useGetTurnTypesListQuery,
} from '../redux/api/turnApi';
import { LinearProgress, Skeleton } from '@mui/material';

const env = new Environment();

const socket = io(env.socket.io);
const room = env.socket.room;

interface AdminTurnViewContextProps {
  config: any;
  userConnected: any;
  rooms: any;
  handleReassign: (person: Person) => void;
}

const AdminTurnViewContext = createContext<
  AdminTurnViewContextProps | undefined
>(undefined);

export const AdminTurnView = () => {
  const [turns, setTurns] = useState<Person[]>([]);
  const [preTurns, setPreTurns] = useState<Person[]>([]);
  const [turnSelected, setTurnSelected] = useState<Person | undefined>();
  const [preTurnSelected, setPreTurnSelected] = useState<Person | undefined>();
  const [turnsTaken, setTurnsTaken] = useState<Person[]>([]);
  const [config, setConfig] = useState<any>(null);
  const { openSnackbarAction } = useSnackbar();
  const { t } = useTranslation();
  const [addAttention, { isLoading }] = useAddAttentionMutation();

  const { data: rooms } = useGetTurnTypesListQuery(true);

  console.log(7897, rooms);

  const { userConnected } = useAuth();

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
    // Manejar eventos cuando se actualiza la lista de turnos
    socket.on('preTurnList', (args: any) => {
      // console.log('preTurnList::::', args);
      setPreTurns([...args]);
    });

    socket.emit('eventJoin', room);

    socket.on('turnTakenList', (args: TurnsTaken) => {
      const { turnTaken, turnsTaken } = args;
      setTurnsTaken(turnsTaken);
    });

    return () => {
      socket.off('turnList');
      socket.off('connect');
    };
  }, []);

  console.log('turnsTaken::::', turnsTaken);

  const handleNewTurn = (data: Person) => {
    // Enviar un nuevo turno al servidor
    console.log('handleNewTurn:::', data);
    socket.emit('newTurn', {
      room,
      name: data.name,
      roomAppointMent: config?.roomAppointMent || 'Recepción',
      document: data.document,
      company: data.company,
      typeTurns: data.typeTurns,
      id: data.id,
      createdAt: data.createdAt,
      timeAppointment: data.timeAppointment,
      idPre: data.idPre,
      note: data.note,
    });
  };

  const handleOnTake = async (turn: Person) => {
    // console.log(777, turn);

    try {
      const takeBy = {
        id: userConnected.id,
        name: `${userConnected.firstName} ${userConnected.lastName}`,
      };
      // console.log(9999, formattedDate);
      const attention = await addAttention({
        turnId: turn.id,
        typeTurnId: config.typeTurnId,
        attentById: userConnected.id,
      }).unwrap();
      const updatedTypeTurns = turn.typeTurns?.map((item: any) => {
        if (config.typeTurnId === item.id && !item.attended) {
          item = {
            ...item,
            inAttention: true,
            takeBy,
            startedAt: new Date(),
            attentionId: attention.data,
          };
        }
        return item;
      });
      const newTurn = {
        ...turn,
        room,
        takeBy,
        roomAppointMent: config.roomAppointMent,
        inAttention: true,
        typeTurns: updatedTypeTurns,
      };
      console.log('takenTurn', newTurn);
      setTurnSelected(newTurn);
      socket.emit('takenTurn', newTurn);
    } catch (e) {
      console.log(666, e);
    }
  };

  const handleSaveConfig = (data: any) => {
    setConfig(data);
  };

  const handleFinishTurn = (person: Person) => {
    socket.emit('finishTurn', person);
    setTurnSelected(undefined);
  };

  const handleDeleteTurn = (person: Person) => {
    socket.emit('deleteTurn', person);
    openSnackbarAction({ message: `${t('turn_deleted')}`, type: 'error' });
  };

  const handleCallAgain = (person: Person) => {
    socket.emit('callAgain', person);
    openSnackbarAction({ message: `${t('turn_called')}`, type: 'success' });
  };

  const handleOnTakePreTurn = (person: Person) => {
    setPreTurnSelected(person);
  };

  const handleReassign = (person: Person) => {
    console.log('handleReassign:::', person);
    socket.emit('changeRoom', person);
    // setTurnSelected(undefined);
  };

  return (
    <AdminTurnViewContext.Provider
      value={{ userConnected, handleReassign, config, rooms }}
    >
      {!!isLoading && (
        <>
          <LinearProgress />
          <Skeleton className="my-4" variant="rounded" height={100} />
          <Skeleton variant="rounded" height={100} />
        </>
      )}

      {!config && <ConfigTurnForm onSave={handleSaveConfig} />}
      {turnSelected?.id && (
        <MyTurn
          turnSelected={turnSelected}
          onFinishTurn={handleFinishTurn}
          config={config}
          callAgain={handleCallAgain}
        />
      )}
      {!!config && !isLoading && (
        <>
          {config.reception && (
            <AddTurnForm
              onSave={handleNewTurn}
              person={preTurnSelected}
              setPerson={setPreTurnSelected}
            />
          )}
          {!turnSelected && (
            <>
              {config.reception && (
                <ListPreTurns
                  preTurns={preTurns}
                  handleOnTake={handleOnTakePreTurn}
                />
              )}

              <ListTurns
                turns={turns}
                handleOnTake={handleOnTake}
                config={config}
                deleteTurn={handleDeleteTurn}
              />
            </>
          )}
        </>
      )}

      {config?.reception && <ListTakenTurns turns={turnsTaken} />}
    </AdminTurnViewContext.Provider>
  );
};

export const useAdminTurnViewContext = () => {
  const context = useContext(AdminTurnViewContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
