// Pruebas de caracterización: describen lo que el código hace HOY.
// Si estas pruebas pasan antes y después de refactorizar, el comportamiento no cambió.
// NO se editan para que pasen: si fallan, se corrige el código.
import { beforeEach, describe, expect, it } from "vitest";
import { crearCopagoService } from "../../src/modulos/copagos";
import type { Cita } from "../../src/modulos/copagos";
import { bitacoraExterna, reiniciarBitacora } from "../../src/modulos/copagos/externos";

const citaBase: Cita = {
  id: "C-1",
  pacienteCorreo: "ana@ejemplo.co",
  afiliacion: "contributivo",
  valorConsulta: 100000,
  medioDePago: "tarjeta",
};

describe("cobro de copago", () => {
  beforeEach(() => reiniciarBitacora());

  it("contributivo paga 20 % con tarjeta, avisa y factura en ese orden", () => {
    const r = crearCopagoService().cobrar(citaBase);
    expect(r).toEqual({ aprobado: true, copago: 20000, referencia: "TARJ-20000" });
    expect(bitacoraExterna).toEqual([
      "tarjeta:20000",
      "correo:ana@ejemplo.co:Copago recibido: 20000",
      "factura:C-1:20000",
    ]);
  });

  it("subsidiado paga 5 % con PSE", () => {
    const r = crearCopagoService().cobrar({ ...citaBase, afiliacion: "subsidiado", medioDePago: "pse" });
    expect(r).toEqual({ aprobado: true, copago: 5000, referencia: "PSE-5000" });
    expect(bitacoraExterna[0]).toBe("pse:5000");
  });

  it("particular paga el 100 %", () => {
    const r = crearCopagoService().cobrar({ ...citaBase, afiliacion: "particular" });
    expect(r.copago).toBe(100000);
  });

  it("rechaza una cita sin id y no toca ningún sistema externo", () => {
    expect(() => crearCopagoService().cobrar({ ...citaBase, id: "" })).toThrow("Cita sin id");
    expect(bitacoraExterna).toEqual([]);
  });

  it("rechaza un valor de consulta no positivo", () => {
    expect(() => crearCopagoService().cobrar({ ...citaBase, valorConsulta: 0 })).toThrow(
      "Valor de consulta inválido",
    );
  });

  it("rechaza una afiliación desconocida", () => {
    const cita = { ...citaBase, afiliacion: "otra" } as unknown as Cita;
    expect(() => crearCopagoService().cobrar(cita)).toThrow("Afiliación desconocida");
  });

  it("rechaza un medio de pago no soportado sin cobrar ni avisar", () => {
    expect(() => crearCopagoService().cobrar({ ...citaBase, medioDePago: "efectivo" })).toThrow(
      "Medio de pago no soportado: efectivo",
    );
    expect(bitacoraExterna).toEqual([]);
  });

  it("si la facturación rechaza, falla con su mensaje (el cobro y el aviso ya ocurrieron)", () => {
    expect(() => crearCopagoService().cobrar({ ...citaBase, id: "RECHAZA-1" })).toThrow(
      "Facturación falló: Rechazada",
    );
    expect(bitacoraExterna).toEqual([
      "tarjeta:20000",
      "correo:ana@ejemplo.co:Copago recibido: 20000",
      "factura:RECHAZA-1:20000",
    ]);
  });
});
