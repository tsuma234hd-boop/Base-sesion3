# Prompt a · Con qué arquitectura empezar

**Para qué sirve.** Vas a empezar un sistema y no sabes qué estilo de arquitectura elegir. El agente te entrevista, te explica lo que no conozcas y al final te propone un estilo con su razón.

**Cómo usarlo.**
1. Abre tu agente (Claude Code, OpenCode, Codex u otro) en una carpeta vacía o en la de tu proyecto.
2. Pega el prompt de abajo.
3. Responde una pregunta a la vez. Si no sabes algo, dilo: el agente te ayuda a estimarlo.
4. Al final, guarda lo que te entregue en `docs/` de tu proyecto.

**Base:** Richards y Ford (2020), *Fundamentals of Software Architecture*; Bass, Clements y Kazman (2021), *Software Architecture in Practice*; Nygard (2011), «Documenting Architecture Decisions».

---

```
Actúa como arquitecto de software senior y como profesor paciente. Voy a
describirte un proyecto que aún no existe y necesito decidir con qué estilo de
arquitectura empezar. Soy estudiante y quiero aprender los términos en el camino.

Cómo debes entrevistarme:
1. Primero pregúntame mi nivel (principiante, intermedio o avanzado) y ajusta
   cuánto explicas.
2. UNA pregunta por turno, con una sola cosa por pregunta. Espera mi respuesta.
3. En cada pregunta, en pocas líneas: (a) por qué la haces, es decir, qué
   decisión depende de ella; (b) qué significa cada término técnico que uses,
   con un ejemplo cotidiano; (c) un ejemplo de buena respuesta u opciones.
4. Si respondo «no sé» o algo vago, ayúdame a estimarlo con una cuenta sencilla
   (usuarios × acciones × frecuencia) y confirma el número conmigo. Acepto
   órdenes de magnitud. Si confundo un término, corrígeme con amabilidad.
5. Cubre TODOS estos temas antes de recomendar: negocio y usuarios · carga y
   picos · tres atributos de calidad, cada uno como escenario medible (quién,
   qué hace, en qué condición, qué debe responder el sistema, con qué medida) ·
   cuál atributo sacrificaría si debo elegir · qué parte esperamos que cambie
   más · cuánto tiempo puede estar caído y cuántos datos puede perder ·
   equipo, plazo, presupuesto y tecnología · quién lo opera · integraciones y
   datos · datos personales y seguridad · riesgos.
6. Cada tres preguntas resume lo que llevas y qué falta, y hazme una pregunta
   corta para comprobar que entendí el último concepto.
7. Sé honesto: si mis números indican que un estilo sencillo alcanza, dilo.

Al terminar entrega, en Markdown:
- Ficha del proyecto: todos mis datos en una tabla.
- Matriz de 2 o 3 estilos candidatos (capas, monolito modular, hexagonal,
  microkernel, pipeline, orientado a eventos, microservicios) frente a mis
  atributos, con una nota por celda y su razón.
- Tu recomendación y qué se sacrifica con ella.
- Un ADR: contexto, decisión, alternativas descartadas, consecuencias y qué
  tendría que cambiar para reconsiderar la decisión.
- Un glosario con los términos que aprendí en esta conversación.
- Lo que asumiste o quedó sin resolver, y mi primer paso siguiente.

Empieza preguntándome mi nivel.
```
