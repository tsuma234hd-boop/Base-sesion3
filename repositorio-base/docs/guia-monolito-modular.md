# Guía: cómo saber que SaludYa es un monolito modular

En la sesión 1 viste los estilos. Aquí lo compruebas **en el código**. Todo se hace en el repositorio, sin escribir código nuevo.

## Qué es, en una frase
Un **monolito modular** es **un solo programa** (un solo despliegue) organizado en **módulos con fronteras claras**: cada módulo tiene una puerta pública y nadie entra por la ventana.

| | Monolito enredado («bola de barro») | **Monolito modular** | Microservicios |
| --- | --- | --- | --- |
| Despliegue | Uno | **Uno** | Uno por servicio |
| Código | Todo importa a todo | **Módulos con API pública** | Servicios que se hablan por red |
| Fronteras | No hay | **Las vigila el equipo (y las pruebas)** | Las impone la red |
| Costo de operar | Bajo | **Bajo** | Alto |

## Los cinco indicadores
1. **Es un solo programa.** Hay un único punto de arranque: `src/main.ts`.
2. **Hay módulos y cada uno tiene su puerta pública.** Carpetas en `src/modulos/` y un `index.ts` en cada una: lo único que otros pueden importar.
3. **Nadie importa lo interno de otro módulo.** Citas usa Pacientes a través de `../pacientes` (el `index.ts`), nunca de `../pacientes/pacientes-service`.
4. **No hay dependencias circulares.** Si A depende de B, B no depende de A.
5. **Cada módulo es dueño de sus datos.** Los pacientes viven dentro de Pacientes; Citas los pide por la API, no los toca.

## Compruébalo tú (paso a paso)

### 1. Mira la estructura
```
saludya/src/
├── main.ts              ← un solo punto de arranque
├── app.ts               ← arma los módulos (único que los conoce a todos)
└── modulos/
    ├── citas/           ← index.ts + citas-service.ts
    ├── pacientes/
    ├── copagos/
    └── notificaciones/
```
¿Cuántos módulos hay? ¿Cada uno tiene su `index.ts`?

### 2. Arráncalo: es un solo programa
```bash
npm start
```
Se agendan dos citas, se cobra el copago y se avisa al paciente. Cuatro módulos trabajando en **un solo proceso**.

### 3. Dibuja el mapa de módulos
```bash
npm run mapa
```
Lee los `import` y dibuja quién depende de quién. Pega el diagrama (Mermaid) en un `.md` de GitHub y se ve dibujado. Respóndete: ¿qué módulo depende de todos los demás? ¿cuáles no dependen de nadie?

### 4. Mira los indicadores convertidos en pruebas
```bash
npm run test:arquitectura
```
Cada prueba es uno de los indicadores. Ábrela (`saludya/test/arquitectura-modular.test.ts`) y lee cómo se comprueba.

### 5. Rompe una frontera a propósito
En `saludya/src/modulos/citas/citas-service.ts` agrega esta línea al inicio:
```ts
import { crearPacientesService } from "../pacientes/pacientes-service";
```
Corre `npm run test:arquitectura`: **la prueba del indicador 3 falla** y dice qué archivo rompió la regla. Deshaz el cambio (`git restore`).

Prueba también un ciclo: en Pacientes, importa `../citas`. Falla el indicador 5.

### 6. Lo que huele raro (déjalo anotado)
En `npm run mapa`, **Copagos no depende de Notificaciones**, y sin embargo avisa al paciente. ¿Cómo lo hace? Lo averiguarás cuando leas el código en el laboratorio: es un buen primer olor.

## Qué se lleva el estudiante
- Un monolito modular **se reconoce** porque es un programa con módulos, puertas públicas, sin entrar por la ventana y sin ciclos.
- Esas reglas **se pueden vigilar con pruebas**; es lo que hará un arquitecto con un agente.
- Si esas fronteras se rompen, el monolito modular se degrada en una bola de barro. No lo dice el diagrama: lo dice el código.

Fuentes: Fowler, «MonolithFirst» (martinfowler.com/bliki/MonolithFirst.html) y la sesión 1 del módulo.
