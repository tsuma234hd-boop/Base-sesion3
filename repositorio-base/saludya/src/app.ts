import { crearCitasService } from "./modulos/citas";
import { crearCopagoService } from "./modulos/copagos";
import { crearNotificacionesService } from "./modulos/notificaciones";
import { crearPacientesService } from "./modulos/pacientes";

/**
 * Aquí se arma SaludYa: un solo programa que junta los cuatro módulos.
 * Es la única parte que conoce a todos; cada módulo solo conoce lo que necesita.
 */
export function crearSaludYa() {
  const pacientes = crearPacientesService();
  const notificaciones = crearNotificacionesService();
  const copagos = crearCopagoService();
  const citas = crearCitasService({ pacientes, copagos, notificaciones });
  return { pacientes, notificaciones, citas };
}
