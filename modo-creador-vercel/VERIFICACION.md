# Verificación de la adaptación

- Compilación de producción de Next.js 16.3.4: correcta.
- Verificación de TypeScript durante compilación: correcta.
- Página principal: HTTP 200 y componente del monto en bolívares presente.
- `/api/rate`: HTTP 200, tasa 872.3927 Bs./USD, fecha de la fuente 2026-10-06.
- `/api/event`: HTTP 200, conexión configurada y consulta de Sheets correcta: 0% reservado, sin cupos agotados.
- Registro con datos incompletos: rechazado con HTTP 400.

Estas pruebas se realizaron localmente con las credenciales privadas existentes, que no están incluidas en este ZIP. No se creó un registro ficticio ni se cargó un comprobante. Falta la publicación y una prueba completa de registro/pago en tu cuenta de Vercel.
