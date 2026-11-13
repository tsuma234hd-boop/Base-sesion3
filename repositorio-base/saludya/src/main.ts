import { crearSaludYa } from "./app";

// Un solo punto de arranque para todo el sistema: `npm start`.
const saludya = crearSaludYa();

saludya.pacientes.registrar({ id: "P-1", nombre: "Ana Pérez", correo: "ana@ejemplo.co", afiliacion: "contributivo" });
saludya.pacientes.registrar({ id: "P-2", nombre: "Luis Gómez", correo: "luis@ejemplo.co", afiliacion: "subsidiado" });

const c1 = saludya.citas.agendar({ pacienteId: "P-1", medicoId: "dra-martinez", inicio: "2026-11-16T09:00", valorConsulta: 100000, medioDePago: "tarjeta" });
const c2 = saludya.citas.agendar({ pacienteId: "P-2", medicoId: "dr-lopez", inicio: "2026-11-16T10:00", valorConsulta: 100000, medioDePago: "pse" });

console.log("Citas agendadas:");
console.table([c1, c2]);
console.log("Avisos enviados (simulados):");
console.table(saludya.notificaciones.enviados());
