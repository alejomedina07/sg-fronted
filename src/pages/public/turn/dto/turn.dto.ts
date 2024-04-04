import { Person } from '../../../admin/turn/dto/Person';

// export interface PersonTurn {
//   name: string;
//   id: number;
//   roomAppointMent?: string;
//   takeBy?: string;
// }

export interface TurnsTaken {
  turnsTaken: Person[];
  turnTaken?: Person;
}
