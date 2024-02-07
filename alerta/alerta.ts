import { Itema } from "../tema/tema.schema";
import { Ialerta } from "./alertas.schema";

export class Alerta implements Ialerta {
  id_alerta: number;
  mensaje: string;
  tipoAlerta: string;
  expiracion: Date | null;
  destinatario: number | null;
  tema: Itema;
  leida: boolean;

  constructor(
    id: number,
    mensaje: string,
    tipo: string,
    expiracion: Date | null,
    destinatario: number | null,
    tema: Itema
  ) {
    this.id_alerta = id;
    this.mensaje = mensaje;
    this.tipoAlerta = tipo;
    this.expiracion = expiracion;
    this.destinatario = destinatario;
    this.tema = tema;
    this.leida = false;
  }
}
