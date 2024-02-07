import { Itema } from "./tema.schema";

export class Tema implements Itema {
  id_tema: number;
  nombreTema: string;
  constructor(id: number, nombre: string) {
    this.id_tema = id;
    this.nombreTema = nombre;
  }
}
