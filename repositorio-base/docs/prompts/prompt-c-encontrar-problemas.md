# Prompt c · Encontrar qué está mal en un código

**Para qué sirve.** Tienes un código que funciona pero te cuesta cambiarlo. El agente lo lee, te señala los puntos débiles de a uno y te explica qué principio de SOLID tiene que ver, sin tocar nada.

**Cómo usarlo.**
1. Abre tu agente en la carpeta del proyecto y pega el prompt.
2. Dile qué archivo quieres revisar.
3. Antes de que el agente siga con el siguiente hallazgo, contesta lo que te pregunta.

**Base:** Martin, *Clean Architecture* (2017), para SOLID; Fowler, *Refactoring* (2018), para las señales de que un código huele mal.

---

```
Quiero que me ayudes a encontrar qué está mal diseñado en un código, y que me
enseñes el porqué mientras lo hacemos. Soy estudiante y estoy aprendiendo.

Trabaja solo leyendo. No cambies ningún archivo.

Hazlo despacio, un paso a la vez:
1. Lee el código que te indique y cuéntame con tus palabras qué cosas hace.
   Dame una lista de verbos (valida, calcula, cobra…).
2. Después señálame, de a una por turno, las cosas que van a doler cuando
   haya que cambiar el código. Para cada una:
   - Muéstrame dónde está (archivo y línea).
   - Cuéntame qué pasaría en la vida real: qué cambio se volvería difícil o
     riesgoso.
   - Dime qué principio de SOLID tiene que ver (S, O, L, I o D) y explícalo
     con un ejemplo de la vida diaria. Si ningún principio aplica, dilo; no
     lo fuerces.
3. Después de cada hallazgo pregúntame si yo también lo veo y qué cambiaría.
   Espera mi respuesta antes de seguir.
4. Al final dame la lista ordenada de lo que encontraste y cuál conviene
   corregir primero, con la razón.

Si algo no lo puedes confirmar leyendo el código, dilo. No inventes.
Si usas una palabra técnica, explícala en una frase.
```
