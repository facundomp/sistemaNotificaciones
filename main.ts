import { SistemaNotificaciones } from "./sistema_notificaciones/sistema_notificaciones";

const sistema = new SistemaNotificaciones();

const usuario1 = sistema.registrarUsuario(1, "Usuario1");
const usuario2 = sistema.registrarUsuario(2, "Usuario2");

const tema1 = sistema.registrarTema(1, "Cumpleaños");
const tema2 = sistema.registrarTema(2, "Posteo en grupo X");

usuario1.suscribirseTema(tema1);
usuario1.suscribirseTema(tema2);
usuario2.suscribirseTema(tema2);

const alerta1 = sistema.enviarAlerta(
  "Partido de fútbol hoy a las 8 pm",
  "Urgente",
  new Date("2024-02-05T20:00:00"),
  null
);
const alerta2 = sistema.enviarAlerta(
  "Nuevo smartphone lanzado",
  "Informativa",
  null,
  usuario1.id
);
const alerta3 = sistema.enviarAlerta(
  "Actualización de software disponible",
  "Informativa",
  null,
  usuario2.id
);

/*
const alertasNoLeidasUsuario1 =
  sistema.obtenerAlertasNoExpiradasNoLeidasUsuario(usuario1);
const alertasNoLeidasTema2 = sistema.obtenerAlertasNoExpiradasTema(
  tema2.nombreTema);*/
