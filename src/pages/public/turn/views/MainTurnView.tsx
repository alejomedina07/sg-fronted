import React, { useEffect, useState } from 'react';

import io from 'socket.io-client';
import { Grid, Typography } from '@mui/material';
import { PersonListComponent } from '../../../../components/shared/turn/PersonListComponent';
import { PersonTurn, TurnsTaken } from '../dto/turn.dto';
import { CallTurnComponent } from '../components/CallTurnComponent';

const socket = io('http://localhost:81'); // Reemplaza 'http://localhost:81' con la dirección de tu servidor NestJS

const room = '2023-10-10';

export const MainTurnView = () => {
  const [turnos, setTurnos] = useState<PersonTurn[]>([]);
  const [callTurn, setCallTurn] = useState<boolean>(false);
  const [text, setText] = useState<string>('');

  useEffect(() => {
    // Manejar eventos cuando la conexión con el servidor WebSocket se establece
    socket.on('connect', () => {
      console.log('Conectado al servidor WebSocket');
    });

    // Manejar eventos cuando se actualiza la lista de turnos
    socket.on('turnTakenList', (args: TurnsTaken) => {
      const { turnTaken, turnsTaken } = args;
      // console.log(123456, turnsTaken);
      setTurnos(turnsTaken);
      if (turnTaken) {
        setText(`${turnTaken.name}, dirigirse a ${turnTaken.roomAppointMent}`);
        setCallTurn(true);
        const timeout = setTimeout(() => {
          setCallTurn(false);
          setText('');
        }, 8000);
      }
    });

    socket.emit('eventJoin', room);

    return () => {
      socket.off('turnTakenList');
      socket.off('connect');
    };
  }, []);
  return (
    <div className="p-8">
      <Grid item xs={12} md={8}>
        <Typography sx={{ mb: 2 }} variant="h4" component="div">
          Turnos {callTurn}
        </Typography>
        {turnos
          .slice()
          .reverse()
          .map((turno, index) => (
            <PersonListComponent key={turno.id} user={turno.name} />
          ))}
      </Grid>

      {!!callTurn && <CallTurnComponent isOpen={callTurn} text={text} />}
    </div>
  );
};
