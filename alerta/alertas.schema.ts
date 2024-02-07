import { Itema } from "../tema/tema.schema";

export interface Ialerta {
  id_alerta: number;
  mensaje: string;
  tipoAlerta: string; // Los tipos de alertas pueden ser Informativa o Urgente
  expiracion: Date | null; // Puede ser una alerta no expirable
  destinatario: number | null; //  null representa todos los usuarios, caso contrario el id de un usuario en especifico
  tema: Itema;
  leida: boolean;
}
