import type { Afiliacion, ResultadoCopago } from "../copagos";
import type { NotificacionesService } from "../notificaciones";
import type { PacientesService } from "../pacientes";

// Citas usa a los otros módulos SOLO a través de su API pública (index.ts).
export interface CopagosService {
  cobrar(cita: {
    id: string;
    pacienteCorreo: string;
    afiliacion: Afiliacion;
    valorConsulta: number;
    medioDePago: string;
  }): ResultadoCopago;
}

export interface SolicitudCita {
  pacienteId: string;
  medicoId: string;
  inicio: string;
  valorConsulta: number;
  medioDePago: string;
}

export interface Cita extends SolicitudCita {
  id: string;
  copago: number;
}

export interface CitasService {
  agendar(solicitud: SolicitudCita): Cita;
  listar(): readonly Cita[];
}

export function crearCitasService(deps: {
  pacientes: PacientesService;
  copagos: CopagosService;
  notificaciones: NotificacionesService;
}): CitasService {
  const citas: Cita[] = [];
  return {
    agendar(s) {
      const paciente = deps.pacientes.obtener(s.pacienteId);
      const id = "C-" + (citas.length + 1);
      const resultado = deps.copagos.cobrar({
        id,
        pacienteCorreo: paciente.correo,
        afiliacion: paciente.afiliacion,
        valorConsulta: s.valorConsulta,
        medioDePago: s.medioDePago,
      });
      const cita: Cita = { ...s, id, copago: resultado.copago };
      citas.push(cita);
      deps.notificaciones.enviar(paciente.correo, `Cita ${id} confirmada con ${s.medicoId}`);
      return cita;
    },
    listar() {
      return [...citas];
    },
  };
}
