import { describe, expect, it } from "vitest";
import { crearSaludYa } from "../src/app";

describe("SaludYa funciona de punta a punta (un solo programa)", () => {
  it("agenda una cita, cobra el copago y avisa al paciente", () => {
    const app = crearSaludYa();
    app.pacientes.registrar({ id: "P-1", nombre: "Ana Pérez", correo: "ana@ejemplo.co", afiliacion: "contributivo" });
    const cita = app.citas.agendar({ pacienteId: "P-1", medicoId: "dra-martinez", inicio: "2026-11-16T09:00", valorConsulta: 100000, medioDePago: "tarjeta" });
    expect(cita.copago).toBe(20000);
    expect(app.citas.listar()).toHaveLength(1);
    expect(app.notificaciones.enviados().map((a) => a.mensaje)).toContain("Cita C-1 confirmada con dra-martinez");
  });

  it("no agenda si el paciente no existe", () => {
    const app = crearSaludYa();
    expect(() => app.citas.agendar({ pacienteId: "X", medicoId: "m", inicio: "x", valorConsulta: 1000, medioDePago: "pse" })).toThrow("Paciente no encontrado");
    expect(app.citas.listar()).toHaveLength(0);
  });
});
