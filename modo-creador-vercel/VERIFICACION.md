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

## Diseño con carrusel

Compilación de producción y TypeScript correctas después de incorporar el carrusel. Los módulos conservan su contenido y ventanas. El carrusel tiene flechas, indicadores, arrastre de ratón, desplazamiento táctil y teclado; su movimiento automático se pausa al interactuar y respeta la preferencia de movimiento reducido. Se añadió desenfoque en la capa de fondo de todos los diálogos y animación de apertura/cierre. No se modificó el backend en esta actualización. La interacción visual en un navegador real queda pendiente de comprobar en la publicación.

## Movimiento y modo noche

Compilación de producción y TypeScript correctas. Pruebas de interacción en DOM simulado con el HTML exportado: carga del tema guardado, alternancia y persistencia día/noche, animación del switch antes de abrir el formulario, campos de registro y regalo conservados, reset del switch al cerrar y apertura de módulos con la misma capa de fondo. Sin errores JavaScript durante esas pruebas.

Las animaciones usan tiempos dependientes del refresco y transformaciones; no se midieron los FPS reales ni se hizo una revisión visual del HTML en un navegador real. La fluidez depende del dispositivo. La inspección del HTML local quedó bloqueada por la política de protocolos del navegador de revisión. El backend y las condiciones de pago permanecen como en la versión anterior.

## Optimización móvil

TypeScript y compilación de producción correctos. Pruebas en DOM simulado para anchos de 320, 375, 390, 430 y 768 px: modo táctil sin parallax, viewport con zonas seguras, apertura y cierre de registro, cédula numérica, campos de regalo y consulta de cupos. Se simula la aparición del teclado y se comprueban las variables de altura y centro utilizadas por las ventanas. Se repiten las pruebas anteriores del modo noche, switch y módulos sobre el HTML exportado.

Estas pruebas verifican lógica e interacción, no el cálculo visual del layout de Safari/Chrome ni los FPS en hardware real. Queda pendiente una revisión visual en Android/iOS, con teclado, giro de pantalla y una inscripción real, una vez desplegado el proyecto en Vercel. El backend no se modificó.

## Corrección responsive posterior

Se eliminaron 12 grupos anteriores de media queries de ancho que generaban superposiciones. Compilación y TypeScript correctos. Se comprobaron las declaraciones CSS aplicables a 320, 360, 375, 390, 430, 600, 601, 768, 900, 901, 1000, 1024, 1200 y 1440 px: columnas de portada/pago, campos del formulario y disposición del encabezado. Estas comprobaciones revisan reglas y límites de los breakpoints; no sustituyen una medición visual en un navegador real. Se repitieron las pruebas de interacción del HTML en DOM simulado.

## WhatsApp y contención del viewport

Compilación de producción y TypeScript correctos. Pruebas en DOM simulado: destino correcto de WhatsApp, apertura prevista en una pestaña externa, ocultación con botón y arrastre, restauración y persistencia. Se comprobó la cancelación de touchmove con varios dedos y gesturestart, conservando touchmove con un dedo; también los límites de escala del viewport y las reglas de contención horizontal. Pasan las pruebas responsive y de interacción anteriores.

No se envió ningún mensaje. La captura adjunta no estaba disponible en su ruta local. No se midió el desbordamiento en un navegador real ni se comprobó el bloqueo efectivo del zoom en hardware iOS/Android; las preferencias del navegador pueden prevalecer. Hace falta desplegar el ZIP en Vercel para que los cambios lleguen a la página publicada.

## Estilo de botones basado en referencias

Se inspeccionaron las tres referencias adjuntas. El dial oscuro y la iluminación inferior se adaptaron al botón de WhatsApp; el vidrio reflectante, los bordes luminosos y las cápsulas se aplicaron a los controles con los colores de Mirla. La referencia es estática: sus animaciones no se podían observar; se implementó un reflejo suave, reacción al hover/pulsación y halo de WhatsApp.

TypeScript y compilación correctos. Se repitieron pruebas del HTML exportado: registro, regalos, consulta, modo noche, apertura/cierre de ventanas, ocultación y recuperación de WhatsApp, persistencia y bloqueo de gestos. También se mantienen las comprobaciones de los breakpoints. No se hizo una revisión visual en navegador real ni medición de FPS. El servidor y las condiciones del evento no cambiaron.

## Cápsulas y legibilidad

Se inspeccionaron la nueva imagen y fotogramas del video. Los botones usan cápsulas planas y el selector de tema y reserva deslizan su pieza interior. Se aumentó la tipografía del cuerpo, botones, formularios, condiciones y datos de pago. El encabezado se reorganiza a partir de 760 px para conservar botones de 14 px. Los campos continúan a 16 px.

Compilación de producción, TypeScript y pruebas de interacción en DOM simulado correctos después del cambio. Se comprueban los breakpoints y la persistencia del tema con el nuevo selector. No se comprobó la disposición visual en Safari/Chrome reales; la verificación de reglas y medidas tipográficas no sustituye esa revisión. No cambió el backend.
