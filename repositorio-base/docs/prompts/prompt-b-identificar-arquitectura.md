# Prompt b · Qué arquitectura tiene un sistema que ya existe

**Para qué sirve.** Te dan un repositorio que no conoces y necesitas saber cómo está organizado. El agente lo lee (sin cambiar nada) y te dice qué estilo tiene, con evidencia que tú puedes comprobar.

**Cómo usarlo.**
1. Abre tu agente dentro de la carpeta del repositorio.
2. Pega el prompt de abajo.
3. Cuando el agente termine, **comprueba tú** las dos afirmaciones que te propone. El agente propone; tú verificas.

**Base:** los indicadores de cada estilo vienen de la sesión 1 y de Richards y Ford (2020); los diagramas siguen el modelo C4 de Simon Brown (c4model.com).

---

```
Actúa como arquitecto de software que revisa un sistema que no conoce, y como
profesor paciente. Tu tarea es identificar su arquitectura a partir del código
y la documentación. Trabaja SOLO LEYENDO: no modifiques ni crees archivos del
proyecto. Si te falta información, pregúntame en vez de adivinar.

Pasos, en este orden:
1. Contexto: lee el README y la documentación. ¿Qué hace el sistema, quién lo
   usa, con qué otros sistemas habla?
2. Despliegue: revisa dependencias, Docker, CI y scripts de arranque. ¿Cuántos
   programas o servicios se despliegan por separado?
3. Estructura: recorre las carpetas y los import entre módulos. ¿Quién depende
   de quién? Las carpetas no bastan: la evidencia son los import.
4. Compara lo que encuentres con estas huellas:
   - Capas: dependencias que bajan en un solo sentido (presentación → negocio → datos).
   - Monolito modular: un solo despliegue, módulos con puerta pública, sin
     importar archivos internos de otros, sin ciclos.
   - Hexagonal: el dominio no importa infraestructura; hay puertos y adaptadores.
   - Microkernel: un núcleo pequeño y plugins que se registran.
   - Pipeline: etapas encadenadas que transforman datos.
   - Orientado a eventos: publicar y suscribirse; las partes no se llaman directo.
   - Microservicios: varios despliegues, cada uno con sus datos, hablándose por red.
5. Busca señales de desorden: ciclos, imports a archivos internos, un módulo
   del que todos dependen, base de datos compartida sin dueño.

Entrega:
- Una tabla: huella → evidencia (archivo) → qué sugiere.
- El estilo o estilos probables, con confianza (alta, media o baja) y por qué.
- Un diagrama Mermaid de los módulos y sus dependencias.
- Dónde la documentación y el código no coinciden.
- Lo que no pudiste verificar, marcado como «desconocido». No inventes.
- Los términos técnicos que usaste, explicados con un ejemplo cotidiano.
- Dos afirmaciones tuyas que yo pueda comprobar con un comando, y cuál comando.
```
