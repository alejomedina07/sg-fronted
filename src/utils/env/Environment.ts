export class Environment {

  baseUrl: string;
  basePatch: string;

  constructor() {
    // @ts-ignore
    this.baseUrl = import.meta.env.VITE_API_URL
    // @ts-ignore
    this.basePatch = import.meta.env.VITE_STATIC_PATCH
  }

}