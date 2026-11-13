# SaludYa · monolito modular (repositorio base de la sesión 2)

Repositorio de práctica del Módulo 1 del Diplomado en Desarrollo de Software Avanzado y Arquitectura de Aplicaciones.
Los sistemas externos (pasarelas, correo, facturación) están **simulados**; no hay llamadas reales ni datos reales.

## Para empezar
Requisitos: Node.js 20 o superior, Git y un agente de programación (Claude Code, OpenCode o Codex).

```bash
npm install
npm test
npm start        # arranca SaludYa: un solo programa
npm run mapa     # dibuja los módulos y de quién dependen
```

Las pruebas deben pasar antes de empezar.

## Qué hay aquí
| Carpeta o archivo | Para qué |
| --- | --- |
| `AGENTS.md` | Reglas del arquitecto para el agente. Claude Code lo lee desde `CLAUDE.md`; OpenCode y Codex lo leen directamente |
| `saludya/` | **La aplicación: un monolito modular.** Cuatro módulos en `src/modulos/` y un solo punto de arranque. Pruebas de arquitectura en `test/arquitectura-modular.test.ts` |
| `saludya/src/modulos/copagos/` | **Laboratorio 1.** El módulo de copagos funciona pero hace de todo. Hay que diagnosticarlo y refactorizarlo sin romper sus pruebas |
| `docs/prompts/` | **Cuatro prompts listos para pegar en tu agente:** elegir estilo, identificar la arquitectura de un sistema, encontrar problemas en un código y corregirlos sin romper nada |
| `docs/guia-monolito-modular.md` | **Empieza aquí.** Cómo comprobar, con el código, que SaludYa es un monolito modular |
| `docs/guia-solid-paso-a-paso.md` | Cómo abordar un código sucio, paso a paso, con un agente |
| `docs/adr/` | Plantilla para registrar decisiones (ADR) |

## Cómo se trabaja
1. La persona que hace de **arquitecto** lee el código y escribe su diagnóstico.
2. Decide qué cambiar y por qué (anota la decisión en un ADR).
3. Ajusta las reglas en `AGENTS.md`.
4. Abre una **issue** en GitHub con lo que se quiere y cómo se sabrá que está bien.
5. El agente propone un plan; el arquitecto lo aprueba o lo corrige.
6. El agente trabaja en una rama y abre un **pull request**.
7. El arquitecto **revisa** el pull request contra las reglas y las pruebas antes de aceptarlo.

> Nunca compartas claves ni datos personales con un agente. Este repositorio solo contiene datos inventados.

Material de clase. Nada de lo que hay aquí acredita que la sesión se haya impartido.
