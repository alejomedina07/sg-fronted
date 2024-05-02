import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { AddTurnForm } from '../components/reception/AddTurnForm';
import { Person } from '../dto/Person';
import useAuth from '../../../public/auth/redux/hooks/useAuth';
import { ConfigTurnForm } from '../components/config/ConfigTurnForm';
import { MyTurn } from '../components/config/MyTurn';
import { ListTurns } from '../components/list/ListTurns';
import { Environment } from '../../../../utils/env/Environment';
import { ListPreTurns } from '../components/list/ListPreTurns';
import useSnackbar from '../../../../store/hooks/notifications/snackbar/useSnackbar';
import { useTranslation } from 'react-i18next';
import { TurnsTaken } from '../../../public/turn/dto/turn.dto';
import { ListTakenTurns } from '../components/list/ListTakenTurns';
import {
  useAddAttentionMutation,
  useGetTurnTypesListQuery,
} from '../redux/api/turnApi';
import useTurn from '../redux/hooks/useTurn';
import { deleteConfig } from '../redux/slices/turnSlice';
import { ConfigInfo } from '../components/config/ConfigInfo';
import { LoadingTurn } from '../components/shared/LoadingTurn';
import DateFnsManager from '../../../../services/utils/DateFnsManager';

const env = new Environment();

const socket = io(env.socket.io);
const room = env.socket.room;
const dateManage = new DateFnsManager();

interface AdminTurnViewContextProps {
  config: any;
  userConnected: any;
  rooms: any;
  handleReassign: (person: Person) => void;
  handleUnlock: (person: Person) => void;
  setTurnSelected: (person: Person | undefined) => void;
  turnsTaken: Person[];
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
  const { data: rooms, isLoading: isLoadingRooms } =
    useGetTurnTypesListQuery(true);
  const { userConnected } = useAuth();

  const {
    configuration,
    takenTurnAction,
    turnInAttention,
    finishTurnAction,
    setConfigAction,
  } = useTurn();

  useEffect(() => {
    if (configuration) {
      setConfig(configuration);
    }
    if (turnInAttention) {
      setTurnSelected(turnInAttention);
    }
  }, []);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Conectado al servidor WebSocket');
    });

    // Manejar eventos cuando se actualiza la lista de turnos
    socket.on('turnList', (allTurns: Person[]) => {
      console.log('turnList::', allTurns);
      setTurns([...allTurns]);
    });
    // Manejar eventos cuando se actualiza la lista de turnos
    socket.on('preTurnList', (args: any) => {
      // console.log('preTurnList::::', args);
      setPreTurns([...args]);
    });

    socket.emit('eventJoin', room);

    socket.on('turnTakenList', (args: TurnsTaken) => {
      const { turnsTaken } = args;
      setTurnsTaken(turnsTaken);
    });

    const connectSocket = () => {
      // Manejar eventos cuando la conexión con el servidor WebSocket se establece
      console.log(1234);
      socket.on('connect', () => {
        console.log('Conectado al servidor WebSocket');
      });

      // Manejar eventos cuando se actualiza la lista de turnos
      socket.on('turnList', (allTurns: Person[]) => {
        console.log('turnList::', allTurns);
        setTurns([...allTurns]);
      });
      // Manejar eventos cuando se actualiza la lista de turnos
      socket.on('preTurnList', (args: any) => {
        // console.log('preTurnList::::', args);
        setPreTurns([...args]);
      });

      socket.emit('eventJoin', room);

      socket.on('turnTakenList', (args: TurnsTaken) => {
        const { turnsTaken } = args;
        setTurnsTaken(turnsTaken);
      });
    };

    const reconnectSocket = () => {
      if (socket && !socket.connected) {
        console.log('Intentando reconectar...');
        socket.connect();
        connectSocket();
      }
    };

    // connectSocket();

    const reconnectInterval = setInterval(reconnectSocket, 3000);

    return () => {
      if (socket) {
        socket.close();
      }
      clearInterval(reconnectInterval);
      socket.off('turnList');
      socket.off('turnTakenList');
      socket.off('preTurnList');
      socket.off('connect');
    };
  }, []);

  const handleUnlock = (person: Person) => {
    console.log(789, person);
    socket.emit('unlock', person);
  };

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
      entryTime: data.entryTime || dateManage.getHour(new Date()),
      idPre: data.idPre,
      note: data.note,
      doubleTurn: data.doubleTurn,
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
      // console.log('takenTurn', newTurn);
      setTurnSelected(newTurn);
      takenTurnAction({ turnInAttention: newTurn });
      socket.emit('takenTurn', newTurn);
    } catch (e) {
      console.log(666, e);
    }
  };

  const handleSaveConfig = (data: any) => {
    setConfig(data);
    setConfigAction(data);
  };

  // console.log('turnSelected:::', turnSelected);

  const handleFinishTurn = (person: Person) => {
    if (turnsTaken.some((turn: any) => turn.id === person.id))
      socket.emit('finishTurn', person);
    setTurnSelected(undefined);
    finishTurnAction();
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
    console.log(person);
    setPreTurnSelected(person);
  };

  const handleReassign = (person: Person) => {
    console.log('handleReassign:::', person);
    socket.emit('changeRoom', person);
    // setTurnSelected(undefined);
  };

  const handleDeleteConfig = () => {
    setConfig(null);
    deleteConfig();
  };

  return (
    <AdminTurnViewContext.Provider
      value={{
        userConnected,
        handleReassign,
        config,
        rooms,
        handleUnlock,
        turnsTaken,
        setTurnSelected,
      }}
    >
      {!!config && (
        <ConfigInfo
          handleDeleteConfig={handleDeleteConfig}
          config={config}
          turnSelected={turnSelected}
        />
      )}

      {!!isLoading && <LoadingTurn />}

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
              loadingRooms={isLoadingRooms}
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
