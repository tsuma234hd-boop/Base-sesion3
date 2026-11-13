import { CorreoSmtp, FacturacionSoap, PasarelaPse, PasarelaTarjeta } from "./externos";

export type Afiliacion = "contributivo" | "subsidiado" | "particular";

export interface Cita {
  id: string;
  pacienteCorreo: string;
  afiliacion: Afiliacion;
  valorConsulta: number;
  medioDePago: string;
}

export interface ResultadoCopago {
  aprobado: boolean;
  copago: number;
  referencia: string;
}

// Servicio que cobra el copago de una cita. Funciona, pero hace de todo.
export class CopagoService {
  cobrar(cita: Cita): ResultadoCopago {
    // 1. valida
    if (!cita.id) throw new Error("Cita sin id");
    if (cita.valorConsulta <= 0) throw new Error("Valor de consulta inválido");

    // 2. calcula el copago según la afiliación
    let copago: number;
    if (cita.afiliacion === "contributivo") {
      copago = Math.round(cita.valorConsulta * 0.2);
    } else if (cita.afiliacion === "subsidiado") {
      copago = Math.round(cita.valorConsulta * 0.05);
    } else if (cita.afiliacion === "particular") {
      copago = cita.valorConsulta;
    } else {
      throw new Error("Afiliación desconocida");
    }

    // 3. cobra según el medio de pago
    let referencia: string;
    if (cita.medioDePago === "tarjeta") {
      referencia = new PasarelaTarjeta("sk_live_CLAVE_FALSA_DE_EJEMPLO").cobrar(copago);
    } else if (cita.medioDePago === "pse") {
      referencia = new PasarelaPse().redirigir(copago);
    } else {
      throw new Error("Medio de pago no soportado: " + cita.medioDePago);
    }

    // 4. avisa al paciente
    new CorreoSmtp().enviar(cita.pacienteCorreo, "Copago recibido: " + copago);

    // 5. genera el cargo en el sistema de facturación
    const respuesta = new FacturacionSoap().generarCargo(cita.id, copago);
    if (respuesta.cod !== "00") {
      throw new Error("Facturación falló: " + respuesta.msg);
    }

    return { aprobado: true, copago, referencia };
  }
}

export function crearCopagoService(): CopagoService {
  return new CopagoService();
}
