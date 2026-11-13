// Los indicadores de un monolito modular, convertidos en pruebas.
// Si alguien rompe una frontera entre módulos, estas pruebas lo dicen.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const SRC = resolve(dirname(fileURLToPath(import.meta.url)), "..", "src");
const MODULOS = join(SRC, "modulos");

function archivos(dir: string): string[] {
  return readdirSync(dir).flatMap((n) => {
    const ruta = join(dir, n);
    return statSync(ruta).isDirectory() ? archivos(ruta) : ruta.endsWith(".ts") ? [ruta] : [];
  });
}
const nombres = readdirSync(MODULOS).filter((n) => statSync(join(MODULOS, n)).isDirectory());

function importaciones(archivo: string): string[] {
  const texto = readFileSync(archivo, "utf-8");
  return [...texto.matchAll(/(?:import|export)[^;]*?from\s+["'](\.[^"']*)["']/g)].map((m) => m[1]);
}
/** A qué módulo apunta un import y si entra por la puerta pública (index). */
function apunta(archivo: string, imp: string): { modulo?: string; publico: boolean } {
  const destino = relative(SRC, resolve(dirname(archivo), imp)).split(/[\\/]/).join("/");
  const m = /^modulos\/([^/]+)(?:\/(.*))?$/.exec(destino);
  if (!m) return { publico: false };
  return { modulo: m[1], publico: m[2] === undefined || m[2] === "index" };
}
function duenoDe(archivo: string): string | undefined {
  const m = /^modulos\/([^/]+)\//.exec(relative(SRC, archivo).split(/[\\/]/).join("/"));
  return m?.[1];
}

describe("Indicadores de monolito modular", () => {
  it("1. Es un solo programa: hay un único punto de arranque", () => {
    expect(existsSync(join(SRC, "main.ts"))).toBe(true);
  });

  it("2. Hay varios módulos y cada uno tiene su API pública (index.ts)", () => {
    expect(nombres.length).toBeGreaterThanOrEqual(3);
    const sinApi = nombres.filter((n) => !existsSync(join(MODULOS, n, "index.ts")));
    expect(sinApi).toEqual([]);
  });

  it("3. Nadie importa lo interno de otro módulo: solo entra por su index.ts", () => {
    const malos: string[] = [];
    for (const a of archivos(SRC)) {
      for (const imp of importaciones(a)) {
        const d = apunta(a, imp);
        if (d.modulo && d.modulo !== duenoDe(a) && !d.publico) malos.push(`${relative(SRC, a)} importa «${imp}»`);
      }
    }
    expect(malos).toEqual([]);
  });

  it("4. Los módulos no dependen del arranque ni de la composición (app.ts, main.ts)", () => {
    const malos: string[] = [];
    for (const a of archivos(MODULOS)) {
      for (const imp of importaciones(a)) {
        const destino = relative(SRC, resolve(dirname(a), imp)).split(/[\\/]/).join("/");
        if (!destino.startsWith("modulos/")) malos.push(`${relative(SRC, a)} importa «${imp}»`);
      }
    }
    expect(malos).toEqual([]);
  });

  it("5. No hay dependencias circulares entre módulos", () => {
    const grafo = new Map<string, Set<string>>(nombres.map((n) => [n, new Set<string>()]));
    for (const a of archivos(MODULOS)) {
      for (const imp of importaciones(a)) {
        const d = apunta(a, imp);
        const yo = duenoDe(a);
        if (yo && d.modulo && d.modulo !== yo) grafo.get(yo)!.add(d.modulo);
      }
    }
    const visitando = new Set<string>();
    const hecho = new Set<string>();
    let ciclo: string | undefined;
    const visitar = (n: string, camino: string[]) => {
      if (ciclo || hecho.has(n)) return;
      if (visitando.has(n)) { ciclo = [...camino, n].join(" → "); return; }
      visitando.add(n);
      grafo.get(n)!.forEach((v) => visitar(v, [...camino, n]));
      visitando.delete(n);
      hecho.add(n);
    };
    nombres.forEach((n) => visitar(n, []));
    expect(ciclo).toBeUndefined();
  });
});
