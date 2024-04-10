export class Environment {
  baseUrlApi: string;
  basePatch: string;
  baseUrlFront: string;
  socket: { io: string; room: string };

  constructor() {
    this.baseUrlApi = import.meta.env.VITE_API_URL;
    this.basePatch = import.meta.env.VITE_STATIC_PATCH;
    this.baseUrlFront = import.meta.env.VITE_FRONT_URL;
    this.socket = {
      // io: 'http://localhost:3001',
      io: import.meta.env.VITE_API_WEBSOCKET_URL,
      // room: 'turns-2024-04-10',
      room: import.meta.env.VITE_WEBSOCKET_ROOM,
    };
  }
}
