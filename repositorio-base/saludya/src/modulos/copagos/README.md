# Laboratorio 1 · El servicio que hace de todo

`src/copago-service.ts` cobra el copago de una cita. **Funciona**, pero hace cinco cosas a la vez y es difícil de cambiar.

Las pruebas de `test/caracterizacion.test.ts` describen lo que hace hoy. Deben pasar **antes y después** de cada cambio.

1. `npm run test:lab1`: todas en verde antes de empezar.
2. Lee el código y escribe tu diagnóstico: ¿qué hace de más? ¿qué se rompe si llega un medio de pago nuevo? (anótalo en el cuaderno del grupo).
3. Pide al agente su plan, aprúebalo y avanza **un paso a la vez**, con las pruebas en verde después de cada paso.
4. Un commit por principio corregido.

La función `crearCopagoService()` es el punto de entrada que usan las pruebas: no cambies su nombre ni lo que devuelve.
