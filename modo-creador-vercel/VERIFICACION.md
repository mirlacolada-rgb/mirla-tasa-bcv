# Verificación de la actualización

- Compilación Next.js de producción y TypeScript: correctas.
- Página `/`: HTTP 200. Tasa `/api/rate`: HTTP 200, con importe y fecha de actualización del proveedor.
- Datos inválidos, cédula con letras y token PDF fabricado: rechazados por las rutas del servidor.
- Prueba del backend con hoja simulada: conserva registros al migrar, encuentra cédulas antiguas, identifica beneficiarios, mantiene el descuento solo de contado y omite tokens/datos de contacto en la consulta.
- Prueba de las rutas reales con respuesta de Google simulada: pendientes sin enlace PDF; aprobados con enlace firmado; PDF generado; token manipulado rechazado; se vuelve a consultar el estado antes de descargar y se bloquea si fue rechazado después.
- Dos PDF generados con el mismo motor que usará la página, renderizados e inspeccionados visualmente: normal y GIFT. Tipografía Poppins incorporada, nombres con tildes, resumen del evento y saldo.
- Se ejecutó la migración en el proyecto Apps Script existente. El registro de ejecución confirmó su finalización correcta.
- Publicación Apps Script versión 3 confirmada en la misma URL. Prueba de conexión real: `/api/event` HTTP 200 con `connected: true`; `/api/lookup` HTTP 200, sin escribir registros.
- No se enviaron registros, pagos ni comprobantes ficticios a la hoja real.
- La publicación final en Vercel y una inscripción real con aprobación deben comprobarse después de reemplazar los archivos del repositorio. No se verificó el dominio Vercel porque no se proporcionó su dirección ni el repositorio.
