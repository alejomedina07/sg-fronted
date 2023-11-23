import {
  Accordion,
  Typography,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { PersonListComponent } from '../../../../components/shared/turn/PersonListComponent';
import { AdminTurnFormComponent } from '../components/AdminTurnFormComponent';
import { Person } from '../dto/Person';

const socket = io('http://localhost:81'); // Reemplaza 'http://localhost:81' con la dirección de tu servidor NestJS

const room = '2023-10-10';

export const AdminTurnView = () => {
  const [turns, setTurns] = useState<Person[]>([]);
  const [turnsTaken, setTurnsTaken] = useState<Person[]>([]);

  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    // Manejar eventos cuando la conexión con el servidor WebSocket se establece
    socket.on('connect', () => {
      console.log('Conectado al servidor WebSocket');
    });

    // Manejar eventos cuando se actualiza la lista de turnos
    socket.on('turnList', (turns: Person[]) => {
      setTurns(turns);
    });
    // Manejar eventos cuando se actualiza la lista de turnos
    socket.on('turnTakenList', (args: any) => {
      console.log(123123, args);
      setTurns(args.turnsTaken);
    });

    socket.emit('eventJoin', room);

    return () => {
      socket.off('turnList');
      socket.off('connect');
    };
  }, []);

  const handleNewTurn = (data: Person) => {
    // Enviar un nuevo turno al servidor
    console.log(data);
    socket.emit('newTurn', {
      room,
      name: data.name,
      document: data.document,
      id: new Date().getTime(),
    });
    setMessage('');
  };

  const handleOnTake = (turn: Person) => {
    console.log('takenTurn:::::');
    // Enviar un nuevo turno al servidor
    socket.emit('takenTurn', {
      room,
      takeBy: 'Doctor uno',
      roomAppointMent: 'Consultorio dos',
      ...turn,
    });
    setMessage('');
  };

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Turnos Disponibles</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AdminTurnFormComponent onSave={handleNewTurn} />

          {/* <TextField */}
          {/*   id="outlined-basicsss" */}
          {/*   label="Outlined" */}
          {/*   variant="outlined" */}
          {/*   type="text" */}
          {/*   placeholder="Nuevo turno" */}
          {/*   value={message} */}
          {/*   onChange={(e: any) => setMessage(e.target.value)} */}
          {/* /> */}

          {/* <button onClick={handleNewTurn}>Agregar Turno</button> */}

          <div className="flex flex-row items-center">
            <Grid item xs={12} md={8} className="flex-1">
              <Typography sx={{ mb: 2 }} variant="h4" component="div">
                Turnos.
              </Typography>
              {turns
                .slice()
                .reverse()
                .map((turno, index) => (
                  <PersonListComponent
                    key={turno.id}
                    user={turno.name}
                    onTake={() => handleOnTake(turno)}
                  />
                ))}
            </Grid>
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
