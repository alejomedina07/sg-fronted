export interface Person {
  name: string;
  company?: string;
  id?: number;
  idPre?: number;
  document: number;
  roomAppointMent?: string;
  timeAppointment?: string | null;
  takeBy?: { name: string; id: number };
  typeTurns?: any;
  inAttention?: boolean;
  isFinish?: boolean;
}
