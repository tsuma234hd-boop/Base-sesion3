# Reglas del arquitecto para este repositorio

Este archivo lo leen los agentes de programación (Claude Code, OpenCode, Codex y otros) antes de trabajar.
Lo escribe y lo mantiene la persona que hace de arquitecto: aquí se fija lo que el agente **puede** y **no puede** hacer.

## Qué es este proyecto
**SaludYa** (red de clínicas) como **monolito modular**: un solo programa con cuatro módulos (`citas`, `pacientes`, `copagos`, `notificaciones`) en `saludya/src/modulos/`. Es un ejemplo de clase: los sistemas externos
(pasarelas de pago, correo, facturación) están **simulados** y no hacen llamadas reales.
Lenguaje: TypeScript. Pruebas: Vitest.

## Comandos
- Instalar: `npm install`
- Arrancar SaludYa: `npm start` · Ver el mapa de módulos: `npm run mapa`
- Todas las pruebas: `npm test`
- Pruebas del laboratorio 1 (módulo Copagos): `npm run test:lab1`
- Pruebas de arquitectura (fronteras entre módulos): `npm run test:arquitectura`
- Revisar tipos: `npm run typecheck`

## Reglas que no se pueden romper
1. **Las pruebas existentes no se editan para que pasen.** Si una prueba falla, se corrige el código. Las pruebas nuevas van en archivos nuevos.
2. **Trabaja solo dentro de `saludya/src/modulos/copagos/`** (laboratorio 1). No toques otros módulos, las pruebas ni los archivos de la raíz.
3. **Un cambio, un propósito, un commit pequeño.** Mensaje con el formato `tipo(alcance): qué cambió`, por ejemplo `refactor(SRP): separa el cálculo del copago`.
4. **No agregues dependencias nuevas** sin pedirlo antes.
5. **Nunca escribas claves, contraseñas ni datos personales** en el código, ni los pidas.
6. **Sin sobrediseño:** no crees un patrón si no puedes nombrar el problema que resuelve en este código.

## Cómo trabajar
1. Antes de tocar código, **explica tu plan en pasos cortos y espera aprobación**.
2. Después de cada paso corre `npm test`. Si falla, arregla antes de seguir.
3. Al terminar, resume qué cambiaste, qué archivos tocaste y qué no pudiste verificar.

## Reglas de arquitectura (las completa el arquitecto)
- **Fronteras entre módulos de SaludYa:** un módulo solo importa a otro a través de su `index.ts` (nunca un archivo interno) y no puede haber dependencias circulares. Lo vigila `npm run test:arquitectura`; esa prueba no se edita.
- El negocio del copago no importa nada de `externos.ts`.
- `CopagoService` **no crea** sus colaboradores con `new`: los recibe por el constructor.
- _(Añade aquí tus propias reglas, en frases cortas y verificables.)_
