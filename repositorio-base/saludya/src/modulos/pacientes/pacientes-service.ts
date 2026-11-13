export type Afiliacion = "contributivo" | "subsidiado" | "particular";

export interface Paciente {
  id: string;
  nombre: string;
  correo: string;
  afiliacion: Afiliacion;
}

export interface PacientesService {
  registrar(paciente: Paciente): void;
  obtener(id: string): Paciente;
}

/** El módulo Pacientes es el único dueño de los datos de los pacientes. */
export function crearPacientesService(): PacientesService {
  const pacientes = new Map<string, Paciente>();
  return {
    registrar(paciente) {
      pacientes.set(paciente.id, { ...paciente });
    },
    obtener(id) {
      const p = pacientes.get(id);
      if (!p) throw new Error("Paciente no encontrado: " + id);
      return { ...p };
    },
  };
}
