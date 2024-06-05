import React, { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import { SgButton } from '../../../../../components/form/button/SgButton';
import { Environment } from '../../../../../utils/env/Environment';
import io from 'socket.io-client';

const env = new Environment();

const socket = io(env.socket.io);
const room = env.socket.room;

interface ReCreateTurnProps {
  setReCreateTurn: (reCreateTurn: boolean) => void;
  turn: any;
  attentions: any;
}

export const ReCreateTurn = (props: ReCreateTurnProps) => {
  const { setReCreateTurn, turn, attentions } = props;
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Conectado al servidor WebSocket');
    });

    socket.emit('eventJoin', room);
    const connectSocket = () => {
      // Manejar eventos cuando la conexión con el servidor WebSocket se establece
      socket.on('connect', () => {
        console.log('Conectado al servidor WebSocket');
        setConnected(true);
      });
      socket.on('disconnect', () => {
        console.log('Desconectado del servidor WebSocket');
        setConnected(false);
      });
      socket.emit('eventJoin', room);
    };

    const reconnectSocket = () => {
      if (socket && !socket.connected) {
        console.log('Intentando re-conectar...');
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
      socket.off('connect');
    };
  }, []);

  console.log('connected:::', connected);

  const reCreate = async () => {
    console.log(456789, turn);
    try {
      const transformedTypeTurns = attentions
        .filter((attention: any) => !attention.finishAt)
        .map((attention: any) => {
          return {
            id: attention.typeTurn.id,
            name: attention.typeTurn.name,
            description: attention.typeTurn.description,
            typeTurnId: attention.typeTurn.typeTurnId,
            typeTurn: {
              id: attention.typeTurn.typeTurnId,
              name: attention.typeTurn.name,
              key: 'typeTurn',
              description: attention.typeTurn.name,
              createdAt: attention.typeTurn.createdAt,
              updatedAt: null,
              status: attention.typeTurn.status,
              default: null,
            },
            typeName: attention.typeTurn.name,
          };
        });

      const data = {
        room,
        name: turn.fullName,
        roomAppointMent: 'Recepción',
        document: turn.document,
        company: turn.company,
        typeTurns: transformedTypeTurns,
        id: turn.id,
        createdAt: turn.createdAt,
        timeAppointment: turn.timeAppointment,
        entryTime: turn.entryTime,
        note: turn.note,
        doubleTurn: turn.doubleTurn,
      };

      console.log(999, data);

      // const res = await socket.emit('reCreateTurn', data);
      // console.log(res);
    } catch (e) {
      console.log(666, e);
    }
  };
  return (
    <Paper className="flex flex-row items-center p-6 mb-4" elevation={3}>
      <b> Estas seguro que quieres re generar el turno ? </b>
      <span className="flex-1"></span>

      <SgButton
        variant="outlined"
        onClickAction={() => setReCreateTurn(false)}
        label="Cancelar"
        sending={false}
      />
      <SgButton
        classes="!mx-4"
        variant="contained"
        color="primary"
        onClickAction={reCreate}
        label="Crear"
        sending={false}
        disabled={!connected}
      />
      <span
        className={`h-4 w-4 rounded-full ${
          connected ? 'bg-green-500' : 'bg-gray-500'
        }`}
      ></span>
    </Paper>
  );
};
