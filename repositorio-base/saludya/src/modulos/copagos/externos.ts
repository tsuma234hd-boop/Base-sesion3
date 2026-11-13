// Sistemas externos SIMULADOS para la clase. No hacen llamadas reales:
// solo anotan en `bitacoraExterna` qué les pidieron, para poder comprobarlo en las pruebas.

export const bitacoraExterna: string[] = [];

export function reiniciarBitacora(): void {
  bitacoraExterna.length = 0;
}

/** Pasarela de pago con tarjeta (simulada). */
export class PasarelaTarjeta {
  constructor(private readonly clave: string) {}

  cobrar(monto: number): string {
    bitacoraExterna.push(`tarjeta:${monto}`);
    return `TARJ-${monto}`;
  }
}

/** Pagos PSE (simulados). */
export class PasarelaPse {
  redirigir(monto: number): string {
    bitacoraExterna.push(`pse:${monto}`);
    return `PSE-${monto}`;
  }
}

/** Envío de correo (simulado). */
export class CorreoSmtp {
  enviar(para: string, mensaje: string): void {
    bitacoraExterna.push(`correo:${para}:${mensaje}`);
  }
}

/** Sistema de facturación SOAP de la clínica (simulado). Responde con códigos, no con objetos del negocio. */
export class FacturacionSoap {
  generarCargo(citaId: string, valor: number): { cod: string; msg: string } {
    bitacoraExterna.push(`factura:${citaId}:${valor}`);
    if (citaId.startsWith("RECHAZA")) return { cod: "99", msg: "Rechazada" };
    return { cod: "00", msg: "OK" };
  }
}
