export interface PersonTurn {
  name: string;
  id: number;
  roomAppointMent?: string;
  takeBy?: string;
}

export interface TurnsTaken {
  turnsTaken: PersonTurn[];
  turnTaken?: PersonTurn;
}
