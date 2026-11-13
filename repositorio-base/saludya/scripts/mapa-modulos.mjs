// Dibuja el mapa de módulos leyendo los imports del código. Uso: npm run mapa
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SRC = resolve(dirname(fileURLToPath(import.meta.url)), "..", "src");
const MODULOS = join(SRC, "modulos");
const archivos = (dir) => readdirSync(dir).flatMap((n) => {
  const r = join(dir, n);
  return statSync(r).isDirectory() ? archivos(r) : r.endsWith(".ts") ? [r] : [];
});
const nombres = readdirSync(MODULOS).filter((n) => statSync(join(MODULOS, n)).isDirectory());
const deps = new Map(nombres.map((n) => [n, new Set()]));

for (const n of nombres) {
  const lista = archivos(join(MODULOS, n));
  for (const a of lista) {
    for (const m of readFileSync(a, "utf-8").matchAll(/(?:import|export)[^;]*?from\s+["'](\.[^"']*)["']/g)) {
      const d = relative(SRC, resolve(dirname(a), m[1])).split(/[\\/]/);
      if (d[0] === "modulos" && d[1] !== n) deps.get(n).add(d[1]);
    }
  }
}

console.log("Módulos de SaludYa y de quién dependen:\n");
for (const n of nombres) {
  const cuantos = archivos(join(MODULOS, n)).length;
  const d = [...deps.get(n)];
  console.log(`  ${n.padEnd(15)} ${String(cuantos).padStart(2)} archivos   depende de: ${d.length ? d.join(", ") : "(nadie)"}`);
}
console.log("\nDiagrama (pégalo en un .md de GitHub y se dibuja):\n");
console.log("```mermaid\nflowchart LR");
for (const n of nombres) {
  if (deps.get(n).size === 0) console.log(`  ${n}`);
  for (const d of deps.get(n)) console.log(`  ${n} --> ${d}`);
}
console.log("```");
