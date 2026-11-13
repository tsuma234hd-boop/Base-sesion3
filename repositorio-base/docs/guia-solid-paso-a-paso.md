# Guía para empezar con SOLID (paso a paso)

Para cuando tienes un código que funciona pero no sabes por dónde empezar. Antes, mira [cómo es la arquitectura de SaludYa](guia-monolito-modular.md): vas a ordenar **un módulo** dentro de ese monolito. Ejemplo: `saludya/src/modulos/copagos/copago-service.ts`.

> Regla de oro: **un olor, un paso, un commit**. No intentes arreglar todo a la vez.

## Paso 0 · Antes de tocar nada
```bash
npm install
npm run test:lab1
```
Todo debe estar en verde. Esas pruebas describen lo que el código hace hoy; son tu red de seguridad.

## Paso 1 · Leer y contar qué hace
Escribe una lista de verbos. Para el servicio de copago:

| Verbo | Dónde está |
| --- | --- |
| valida | primeras líneas de `cobrar` |
| calcula el copago | `if/else` por afiliación |
| cobra | `if/else` por medio de pago |
| avisa | `new CorreoSmtp()` |
| factura | `new FacturacionSoap()` |

Cinco verbos en un solo método: ya tienes la pista del principio **S**.

## Paso 2 · Anotar los olores
Un olor es algo que no está mal todavía, pero que va a doler. Busca estos:

| Si ves… | Probablemente es… |
| --- | --- |
| Una clase que hace varias cosas distintas | **S** (responsabilidad única) |
| Un `if/else` que crece cada vez que llega un caso nuevo | **O** (abierto/cerrado) |
| Un `new` de algo externo (base, correo, pasarela) dentro del negocio | **D** (inversión de dependencias) |
| Una clave o contraseña escrita en el código | Un problema de seguridad, aparte de SOLID |
| Una subclase que lanza «no implementado» | **L** (Liskov) |
| Una interfaz enorme que obliga a implementar métodos que no se usan | **I** (interfaces pequeñas) |

## Paso 3 · Elegir un solo olor
Empieza por el que más pesa. En este código, el orden recomendado es **S, luego D, luego O**:
1. S separa piezas y hace visible lo demás.
2. D permite cambiar y probar las piezas externas.
3. O deja de editar el `if/else` con cada medio de pago nuevo.

## Paso 4 · Pedirle un plan al agente (sin tocar código)
Ejemplo de pedido:

> Lee `saludya/src/modulos/copagos/copago-service.ts`. **No cambies nada todavía.** Dime qué principios SOLID viola y propón un plan de pasos pequeños. Después de cada paso hay que correr `npm run test:lab1`. No edites las pruebas.

Compara su plan con tu lista del paso 2. Si el agente propone algo que tú no viste, pregúntale por qué. Si te propone hacer todo de una vez, pídele que lo divida.

## Paso 5 · Un paso pequeño
Ejemplo del primer paso (S): «Extrae la validación a una función `validarCita` en otro archivo. Corre las pruebas.»

## Paso 6 · Verificar
- ¿Las pruebas siguen en verde?
- ¿Cambió solo lo que pediste? (`git diff`)
- ¿Editó alguna prueba? (si sí, recházalo)
- ¿Agregó algo que nadie pidió?

## Paso 7 · Commit
Un commit por principio corregido, con el formato `tipo(alcance): qué cambió`:
```
refactor(SRP): separa la validación del cobro
```

## Paso 8 · Repetir
Vuelve al paso 3 con el siguiente olor.

## Si te atascas
- Pregúntale al agente: «¿Por qué esto viola el principio?» y que te dé un ejemplo pequeño.
- Si el agente rompe las pruebas, pide que **deshaga el último paso** (`git restore`).
- Si no hay agente: haz el mismo ciclo a mano. Se aprende igual.

> Nunca pegues claves ni datos personales en un agente. En este repositorio todo es inventado.
