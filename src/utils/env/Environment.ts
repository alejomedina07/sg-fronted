export class Environment {
  baseUrlApi: string;
  basePatch: string;
  baseUrlFront: string;

  constructor() {
    this.baseUrlApi = import.meta.env.VITE_API_URL;
    this.basePatch = import.meta.env.VITE_STATIC_PATCH;
    this.baseUrlFront = import.meta.env.VITE_FRONT_URL;
  }
}
