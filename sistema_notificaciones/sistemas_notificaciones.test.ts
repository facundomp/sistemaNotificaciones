import { SistemaNotificaciones } from "./sistema_notificaciones";

test("Devuelve alertas ordenadas, no leídas y no expiradas para un usuario específico", () => {
  // Arrange
  const sistema = new SistemaNotificaciones();
  const usuario1 = sistema.registrarUsuario(1, "Pedro");
  const tema1 = sistema.registrarTema(1, "Cumpleaños");
  const tema2 = sistema.registrarTema(2, "Deporte");
  const tema3 = sistema.registrarTema(3, "Clima");
  const tema4 = sistema.registrarTema(4, "Automovil");
  sistema.registrarTema(5, "Moda");

  usuario1.suscribirseTema(tema1);
  usuario1.suscribirseTema(tema2);
  usuario1.suscribirseTema(tema3);
  usuario1.suscribirseTema(tema4);

  const alerta1 = sistema.enviarAlerta(
    "Hoy es el cumpleaños de Mario",
    "Urgente",
    null,
    1,
    tema1
  );

  const alerta2 = sistema.enviarAlerta(
    "Hoy Partido Argentina vs Brasil",
    "Urgente",
    null,
    1,
    tema2
  );

  const alerta3 = sistema.enviarAlerta(
    "Pronostico para el dia de hoy en La Plata",
    "Informativo",
    null,
    1,
    tema3
  );

  const alerta4 = sistema.enviarAlerta(
    "El nuevo lanzamiento de Toyota",
    "Informativo",
    null,
    1,
    tema4
  );

  const alertasNoLeidasNoExpiradas =
    sistema.obtenerAlertasNoExpiradasNoLeidasUsuario(usuario1);
  const ordenado = [alerta2, alerta1, alerta3, alerta4]; //Representa el orden de como deberia de tener las alertas a las cuales se suscribio
  let bol = false;
  alertasNoLeidasNoExpiradas.forEach((elemento, index) => {
    if (elemento.id_alerta === ordenado[index].id_alerta) bol = true;
  });
  expect(bol).toEqual(true);
});

test("Usuarios no reciben alertas no expiradas de temas a los que no están suscritos", () => {
  const sistema = new SistemaNotificaciones();
  const usuario1 = sistema.registrarUsuario(1, "Pedro");
  sistema.registrarUsuario(2, "Mario");
  const tema = sistema.registrarTema(1, "Deportes");

  const alerta = sistema.enviarAlerta(
    "Nuevo partido de fútbol",
    "Urgente",
    null,
    null,
    tema
  );

  expect(usuario1.obtenerAlertasNoLeidas()).not.toContain(alerta);
});

test("Usuario puede marcar como leida una alerta", () => {
  const sistema = new SistemaNotificaciones();
  const usuario1 = sistema.registrarUsuario(1, "Pedro");
  const tema = sistema.registrarTema(1, "Deportes");
  usuario1.suscribirseTema(tema);
  const alerta = sistema.enviarAlerta(
    "Nuevo partido de fútbol",
    "Urgente",
    null,
    1,
    tema
  );

  expect(usuario1.marcarAlertaLeida(alerta.id_alerta)).toEqual(true);
});

test("Verifica si una alerta no expiro", () => {
  const sistema = new SistemaNotificaciones();
  const usuario1 = sistema.registrarUsuario(1, "Pedro");
  const tema = sistema.registrarTema(1, "Deportes");
  usuario1.suscribirseTema(tema);
  const hoy = new Date(); // Obtiene la fecha y hora actual
  const ayer = new Date(hoy); // Crea una nueva fecha a partir de hoy
  ayer.setDate(hoy.getDate() - 1); // Resta un día a la fecha de ayer
  const alerta = sistema.enviarAlerta(
    "Nuevo partido de fútbol",
    "Urgente",
    ayer,
    1,
    tema
  );
  expect(sistema.alertaExpirada(alerta)).toEqual(true);
});

test("Se obtienen todas las alertas no expiradas y ordenadas para un tema, tanto para un usuario como para todos", () => {
  const sistema = new SistemaNotificaciones();
  const tema1 = sistema.registrarTema(1, "Deportes");
  const tema2 = sistema.registrarTema(2, "Teconologia");
  //
  sistema.enviarAlerta(
    "Nuevo partido de fútbol",
    "Informativo",
    null,
    1,
    tema1
  );
  sistema.enviarAlerta(
    "Comienzo Juegos Olimpicos",
    "Informativo",
    null,
    null,
    tema1
  );
  sistema.enviarAlerta(
    "Mañana comienza la nueva competcion de F1",
    "Urgente",
    null,
    3,
    tema1
  );
  sistema.enviarAlerta(
    "Nueva actualizacion de windows 11",
    "Urgente",
    null,
    null,
    tema2
  );

  const alertasPorTema = sistema.obtenerAlertasNoExpiradasTema(
    tema1.nombreTema
  );
  const destinatarios = [3, 1, null]; //Alerta3.destinatario, Alerta1.destinatario, alerta2.destinatario
  let validacion = false;
  alertasPorTema.forEach((elemento, index) => {
    if (elemento.destinatario === destinatarios[index]) {
      validacion = true;
    } //valida que esten odenados por tipoAlerta y que coindian que las alertas pueden ser para un usuario o para todos
  });
  expect(validacion).toEqual(true);
});
