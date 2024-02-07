import { Alerta } from "../alerta/alerta";
import { Tema } from "../tema/tema";
import { Iusuario } from "./usuario.schema";

export class Usuario implements Iusuario {
  id: number;
  nombre: string;
  alertas: Alerta[];
  temasSubscritos: Tema[];

  constructor(id: number, nombre: string) {
    this.id = id;
    this.nombre = nombre;
    this.alertas = [];
    this.temasSubscritos = [];
  }
  //se suscribe a un tema
  suscribirseTema(tema: Tema) {
    this.temasSubscritos.push(tema);
  }
  //verifica si se encuentra suscripto a un tema en particular
  estoySuscripto(nombre: string) {
    const aux = this.temasSubscritos.find((val) => val.nombreTema === nombre);
    let valido = false;
    if (aux) {
      valido = true;
    }
    return valido;
  }
  //almacena la alerta
  recibirAlerta(alerta: Alerta) {
    this.alertas.push(alerta);
  }
  //devuelve true si la alerta fue marcada, falso si no existe dicha alerta
  marcarAlertaLeida(id: number) {
    const alertaEncontrada = this.alertas.find((val) => val.id_alerta === id);
    if (alertaEncontrada) {
      alertaEncontrada.leida = true;
      return true;
    } else return false;
  }
  // devuelve todas las alertas no leidas por el usuario
  obtenerAlertasNoLeidas() {
    return this.alertas.filter((alerta) => !alerta.leida);
  }
}
