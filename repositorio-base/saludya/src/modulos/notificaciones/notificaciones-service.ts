export interface Aviso {
  para: string;
  mensaje: string;
}

export interface NotificacionesService {
  enviar(para: string, mensaje: string): void;
  enviados(): readonly Aviso[];
}

/** Envío simulado: no sale ningún correo real, solo queda anotado. */
export function crearNotificacionesService(): NotificacionesService {
  const bandeja: Aviso[] = [];
  return {
    enviar(para, mensaje) {
      bandeja.push({ para, mensaje });
    },
    enviados() {
      return [...bandeja];
    },
  };
}
