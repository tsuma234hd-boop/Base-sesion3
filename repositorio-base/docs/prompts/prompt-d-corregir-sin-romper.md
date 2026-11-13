# Prompt d · Corregir un problema sin romper nada

**Para qué sirve.** Ya sabes qué quieres corregir. El agente lo hace en pasos pequeños, con las pruebas en verde, y te explica cada cambio.

**Cómo usarlo.**
1. Antes de empezar, asegúrate de que el proyecto tiene pruebas y que pasan.
2. Pega el prompt y escribe el problema al final.
3. Aprueba el plan, revisa cada paso y guarda un commit por paso.

**Base:** Fowler, *Refactoring* (2018): pruebas primero, pasos pequeños, un cambio a la vez.

---

```
Quiero corregir un problema de mi código sin romper nada, y que me enseñes
cómo se hace con cuidado. Soy estudiante.

Reglas:
1. Antes de tocar nada, corre las pruebas y dime si pasan. Si no pasan,
   paramos ahí.
2. Nunca cambies las pruebas para que pasen. Si una prueba falla, el error
   está en el código.
3. Cuéntame tu plan en pasos pequeños, de modo que cada uno se pueda
   comprobar. Espera a que yo diga que sí.
4. Haz un solo paso. Corre las pruebas. Muéstrame qué cambió y explícame por
   qué ese cambio ayuda.
5. Si las pruebas pasan, propón un mensaje corto para guardar el cambio
   (commit) y espera mi visto bueno. Si fallan, deshaz el paso y cuéntame
   qué pasó.
6. No agregues nada que no te haya pedido: ni capas, ni clases, ni patrones
   «por si acaso». Si crees que un patrón de diseño ayudaría, dime qué problema
   resolvería y pregúntame antes.
7. Si usas una palabra técnica, explícala en una frase.

Al terminar dime qué cambió, qué quedó pendiente y qué no pudiste comprobar.

El problema que quiero corregir es: [escribe aquí el problema]
```
