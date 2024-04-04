import React, { useEffect, useRef, useState } from 'react';

import io from 'socket.io-client';
import { Grid, Typography } from '@mui/material';
import { PersonListComponent } from '../../../../components/shared/turn/PersonListComponent';
import { TurnsTaken } from '../dto/turn.dto';
import { CallTurnComponent } from '../components/CallTurnComponent';
import { Environment } from '../../../../utils/env/Environment';
import { Person } from '../../../admin/turn/dto/Person';

const env = new Environment();

const socket = io(env.socket.io);
const room = env.socket.room;

export const MainTurnView = () => {
  const [turnos, setTurnos] = useState<Person[]>([]);
  const [callTurn, setCallTurn] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  // const audioRef = useRef<HTMLAudioElement | null>(null);

  const isCallingTurnRef = useRef<boolean>(false);

  const callTurnAction = (text: string) => {
    if (!isCallingTurnRef.current) {
      console.log(333);
      setText(text);
      setCallTurn(true);
      isCallingTurnRef.current = true;

      const timeout = setTimeout(() => {
        setCallTurn(false);
        setText('');
        isCallingTurnRef.current = false;
      }, 5000);
    }
  };

  const handleCallTurn = (text: string) => {
    if (!isCallingTurnRef.current) {
      callTurnAction(text);
    } else {
      console.log('callTurnAction is already in progress');
      console.log(2);
      setTimeout(() => {
        console.log(3);
        callTurnAction(text);
      }, 4500);
    }

    // if (!isCallingTurn) {
    //   console.log(4);
    //   callTurnAction(text);
    // } else {
    //   console.log(2);
    //   setTimeout(() => {
    //     console.log(3);
    //     callTurnAction(text);
    //   }, 4500);
    // }
  };

  // const callTurnAction = (text: string) => {
  //   console.log(333);
  //
  //   setText(text);
  //   // if (audioRef.current) {
  //   //   console.log('audioRef.current');
  //   //   audioRef.current.play(); // Reproducir el sonido
  //   // }
  //   setCallTurn(true);
  //   const timeout = setTimeout(() => {
  //     setCallTurn(false);
  //     setText('');
  //   }, 5000);
  // };
  //
  // const handleCallTurn = (text: string) => {
  //   console.log(1, callTurn);
  //   if (callTurn) {
  //     setTimeout(() => {
  //       console.log(2);
  //       callTurnAction(text);
  //     }, 4500);
  //     console.log(3);
  //   } else {
  //     console.log(4);
  //     callTurnAction(text);
  //   }
  // };

  useEffect(() => {
    // Manejar eventos cuando la conexión con el servidor WebSocket se establece
    socket.on('connect', () => {
      console.log('Conectado al servidor WebSocket');
    });

    // Manejar eventos cuando se actualiza la lista de turnos
    socket.on('callAgain', (person: Person) => {
      handleCallTurn(`${person.name}, dirigirse a ${person.roomAppointMent}`);
    });

    // Manejar eventos cuando se actualiza la lista de turnos
    socket.on('turnTakenList', (args: TurnsTaken) => {
      const { turnTaken, turnsTaken } = args;
      setTurnos(turnsTaken);
      if (turnTaken) {
        handleCallTurn(
          `${turnTaken.name}, dirigirse a ${turnTaken.roomAppointMent}`
        );
        // setText(`${turnTaken.name}, dirigirse a ${turnTaken.roomAppointMent}`);
        // // if (audioRef.current) {
        // //   console.log('audioRef.current');
        // //   audioRef.current.play(); // Reproducir el sonido
        // // }
        // setCallTurn(true);
        // const timeout = setTimeout(() => {
        //   setCallTurn(false);
        //   setText('');
        // }, 8000);
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
          Turnos
        </Typography>
        {turnos?.length &&
          turnos
            .slice()
            .reverse()
            .map((turno, index) => (
              <PersonListComponent
                key={turno.id}
                user={turno.name}
                roomAppointMent={turno.roomAppointMent}
              />
            ))}
      </Grid>
      {/* <audio */}
      {/*   ref={audioRef} */}
      {/*   src={`${env.basePatch}/sounds/initTurner.mp3`} */}
      {/* ></audio> */}
      {callTurn && text && <CallTurnComponent isOpen={callTurn} text={text} />}
    </div>
  );
};
