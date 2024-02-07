import { Usuario } from "../usuario/usuario";
import { Tema } from "../tema/tema";
import { Alerta } from "../alerta/alerta";
import { Itema } from "../tema/tema.schema";

export class SistemaNotificaciones {
  usuarios: Usuario[];
  temas: Tema[];
  alertas: Alerta[];

  constructor() {
    this.usuarios = [];
    this.temas = [];
    this.alertas = [];
  }

  //Metodo para registrar a un usuario en el sistema
  registrarUsuario(id: number, nombre: string) {
    // permite registrar a un usuario
    const usuario = new Usuario(id, nombre);
    this.usuarios.push(usuario);
    return usuario;
  }
  //Metodo para registrar un tema creado
  registrarTema(id: number, nombre: string) {
    const tema = new Tema(id, nombre);
    this.temas.push(tema);
    return tema;
  }
  //Cumple la funcion de enviar una alerta a los usuarios que se encuentran suscriptos a un tema en particular
  enviarAlerta(
    mensaje: string,
    tipo: string,
    expiracion: Date | null,
    destinatario: number | null,
    tema: Itema
  ) {
    const alerta = new Alerta(
      this.alertas.length + 1,
      mensaje,
      tipo,
      expiracion,
      destinatario,
      tema
    );
    this.alertas.push(alerta);

    if (destinatario === null) {
      //la alerta sera para todos los usuarios suscriptos al tema X
      this.usuarios.forEach((usuario) => {
        if (usuario.estoySuscripto(tema.nombreTema))
          usuario.recibirAlerta(alerta);
      });
    } else {
      //la alerta sera para un usuario especifico suscripto al tema X
      this.usuarios.forEach((usuario) => {
        if (usuario.estoySuscripto(tema.nombreTema)) {
          usuario.recibirAlerta(alerta);
        }
      });
    }
    return alerta;
  }

  //devuelve las alertas no expiradas ordenadas para un usuario especifico
  obtenerAlertasNoExpiradasNoLeidasUsuario(usuario: Usuario) {
    const alertas = usuario.obtenerAlertasNoLeidas();
    return this.ordenarAlertas(
      alertas.filter((alerta) => !this.alertaExpirada(alerta))
    );
  }

  //devuelve todas las alertas para un tema en especifico
  obtenerAlertasNoExpiradasTema(nombreTema: string) {
    const alertas = this.alertas.filter(
      (alerta) => alerta.tema.nombreTema === nombreTema
    );
    return this.ordenarAlertas(
      alertas.filter((alerta) => !this.alertaExpirada(alerta))
    );
  }

  //Devuelve true si la alerta expiro
  alertaExpirada(alerta: Alerta) {
    const ahora = new Date();
    return alerta.expiracion != null && ahora > alerta.expiracion;
  }

  // Ordena las alertas respetando el siguiente criterio: "Urgentes" LIFO e "Informativas" FIFO
  ordenarAlertas(alertas: Alerta[]) {
    const urgentes = alertas.filter(
      (alerta) => alerta.tipoAlerta === "Urgente"
    );
    const informativas = alertas.filter(
      (alerta) => alerta.tipoAlerta === "Informativa"
    );
    return [...urgentes.reverse(), ...informativas];
  }
}
