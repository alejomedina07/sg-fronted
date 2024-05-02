export interface Person {
  name: string;
  company?: string;
  note?: string;
  createdAt?: string;
  id?: number;
  idPre?: number;
  document: number;
  roomAppointMent?: string;
  timeAppointment?: string | null;
  takeBy?: { name: string; id: number };
  typeTurns?: any;
  entryTime?: string;
  inAttention?: boolean;
  isFinish?: boolean;
  doubleTurn?: boolean;
}
