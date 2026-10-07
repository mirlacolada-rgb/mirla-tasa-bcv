# MODO CREADOR · actualización para Vercel

Incluye cédula numérica, consulta de cupos, regalos GIFT, tickets PDF dorados, Poppins, gradiente pastel, transparencias, sombras y animaciones. La versión nueva añade un recorrido editorial inspirado en la referencia, carrusel horizontal con arrastre y flechas, movimiento automático suave que se pausa al interactuar, fondo desenfocado en ventanas y animación de apertura tipo app. Mantiene el registro en la página, tasa BCV, PagoMóvil, Binance, comprobantes en Drive y la hoja original de inscripciones.

## Actualizar la página que ya tienes

1. Descomprime `MODO_CREADOR_RESPONSIVE_VERCEL.zip`.
2. En el mismo repositorio GitHub conectado a Vercel, reemplaza los archivos con **el contenido** de `modo-creador-responsive`. Incluye `app`, `lib`, `components`, `public`, `package.json` y los archivos de configuración de la raíz. No subas solo el ZIP ni crees una subcarpeta adicional.
3. Confirma los cambios en la rama que despliega Vercel. Vercel compilará la actualización automáticamente. Si no, entra en Deployments y realiza un Redeploy de esa rama.
4. Mantén tus variables `GOOGLE_SCRIPT_URL` y `GOOGLE_SHARED_SECRET`. No necesitas nuevas variables.
5. Revisa el dominio de producción: el encabezado debe mostrar **Consulta tu cupo** y el registro **Quiero regalar mi cupo**.

La conexión de Apps Script y la hoja ya fueron actualizadas desde la cuenta Mirla Colada durante esta entrega. Se mantuvo la misma URL `/exec`, sin recrear la hoja, la carpeta de comprobantes ni los secretos. El archivo `integrations/google-apps-script.gs` contiene la versión entregada por si necesitas recuperarla.

## Movimiento, cursor y modo noche

El botón Noche/Día del encabezado cambia el tema y conserva la preferencia en el navegador. Los botones principales de reserva tienen apariencia de switch: al hacer clic o tocar, animan su recorrido y abren el formulario existente de registro y pago. No realizan un pago ni omiten el registro.

En equipos con ratón y pantallas amplias, las imágenes, títulos y capas decorativas usan parallax y zoom vinculados al scroll; la animación se sincroniza con el refresco de pantalla mediante requestAnimationFrame. Se mantiene el scroll nativo, se detiene el movimiento automático del carrusel cuando hay una ventana abierta y se respeta la preferencia de movimiento reducido. El cursor es púrpura en equipos con ratón y tiene un aro suave; el aro se omite en pantallas táctiles. Todas las ventanas usan una capa de fondo desenfocada.

## Uso de la consulta y los tickets

- Registro: cédula de 5 a 9 dígitos, sin V/E ni guiones. La consulta también encuentra registros antiguos con prefijo.
- Consulta: muestra todos los cupos asociados a la cédula del comprador. Si se indicó la cédula del beneficiario, este también puede consultar su regalo.
- Regalo: nombre y apellido del beneficiario obligatorios; su cédula es opcional. El pago y contacto se mantienen asociados al comprador. El beneficiario es quien asistirá y figura en el PDF.
- En Sheets, las nuevas columnas son **Gift**, **Beneficiario** y **Cedula beneficiario**. La columna **Token** permanece oculta.
- Mirla revisa el comprobante y cambia **Estado** a `reservado` si aprobó el abono del 50%, o a `confirmado` si aprobó el pago completo. Solo esos dos estados permiten descargar el PDF.
- Al recibir el saldo de una reserva, actualiza **Saldo** a `0` y **Estado** a `confirmado`. El ticket muestra el saldo que figura en la hoja; no lo borra automáticamente.
- `pendiente_pago`, `en_revision` y `rechazado` muestran su estado sin habilitar la descarga.
- Los enlaces de descarga caducan a los 15 minutos. Si vencen, vuelve a consultar. El servidor verifica otra vez el estado antes de generar el PDF.
- Los tickets en `previews` son ejemplos con nombres ficticios, sin validez para asistir.

## Condiciones conservadas

Entrada USD 100 por PagoMóvil a tasa BCV. Binance de contado: 90 USDT, descuento únicamente por pago completo. Reserva de 50 y saldo de 50 en puerta, sin descuento. Comprobantes JPG, PNG o PDF de hasta 4 MB. Validación de pagos hasta 24 horas y sin devoluciones.

Masterclass: 14 noviembre 2026, Supercines CC La Granja, Naguanagua; de 9:00 a. m. a 12:30 p. m., coffee break hasta 1:00 p. m. Incluye acceso, dinámicas, certificado y coffee break. Cierre de inscripciones: 13 noviembre 2026 a las 19:00, hora de Caracas; 200 cupos aprobados.

## Recuperar la conexión si fuera necesario

Solo si necesitas reinstalar el backend: abre tu proyecto Apps Script existente, reemplaza Código.gs con `integrations/google-apps-script.gs`, guarda, ejecuta `actualizarSistema` y en Implementar → Administrar las implementaciones → Editar selecciona Nueva versión y publica. Conserva el mismo acceso y la misma URL. No borres las propiedades del script ni vuelvas a crear la hoja.

## Desarrollo

Node.js 22 o superior. `npm install`; copia `.env.example` a `.env.local` y completa tu secreto privado; `npm run dev`. Para comprobar: `npm run build`. No publiques `.env.local` ni el secreto en GitHub o HTML. Poppins se sirve localmente y también se incorpora al PDF; su licencia está en `public/fonts/OFL.txt`.

Esta entrega contiene el código listo; la publicación de los archivos visuales en tu cuenta Vercel aún requiere actualizar el repositorio conectado.

## Optimización para Android, iOS y tabletas

El diseño se adapta desde 320 px, con navegación reorganizada en teléfonos pequeños, controles táctiles de al menos 44 px y carrusel con deslizamiento nativo. Las ventanas ajustan su altura y posición al área visible del navegador cuando aparece el teclado o cambia la orientación. Los campos de texto usan 16 px para evitar el zoom automático de Safari al escribir; esta versión bloquea el zoom mediante la configuración del viewport, touch-action y la cancelación de gestos con varios dedos. Se contemplan las zonas seguras del notch y la barra inferior.

En pantallas táctiles se omiten el parallax, el zoom de la fotografía y las animaciones continuas del fondo para reducir trabajo gráfico. Se mantienen las transiciones, el switch de reserva, el carrusel, el fondo desenfocado y el modo noche. El HTML incorpora fuentes e imagen y evita incluir hojas de estilo de compilaciones anteriores.

Actualiza el mismo repositorio conectado a Vercel siguiendo los pasos de arriba. No cambies las variables ni vuelvas a publicar Apps Script para esta mejora. El HTML descargable sirve para revisar el diseño; registro, consulta y PDF requieren la página publicada con su servidor.

## Corrección de la estructura responsive

Se reemplazaron las reglas móviles que se sobrescribían por un conjunto único de puntos de adaptación. Las columnas usan minmax(0,1fr), con anchos fluidos: en 900 px o menos, portada, presentación, agenda, preguntas y pago se apilan; en 600 px o menos, el encabezado organiza marca y tema en una fila y consulta/reserva en otra, y el formulario pasa a una columna. Las tarjetas del carrusel se calculan según el ancho disponible. Los textos, fotos, tarjetas y márgenes cambian de tamaño sin depender del modelo de teléfono. Los radios conservan su tamaño propio y sus etiquetas tienen área táctil.

## WhatsApp flotante y ancho de pantalla

Se añadió un botón pequeño de vidrio transparente en el borde derecho, en móvil y escritorio, que abre https://wa.me/584243315783 sin enviar un mensaje automáticamente. Se oculta con la X o arrastrándolo hacia el borde; queda una pestaña discreta para recuperarlo. La preferencia de ocultarlo se conserva en ese navegador. Se muestra por debajo de las ventanas para no tapar el registro o los datos de pago.

La página limita el desbordamiento horizontal de las capas decorativas. El desplazamiento horizontal se conserva solo dentro del carrusel. El viewport fija la escala a 1 y no permite zoom; se cancelan los gestos de pellizco y los gestos de Safari sin cancelar el desplazamiento normal con un dedo. Algunos navegadores o ajustes de accesibilidad pueden imponer sus propias opciones de zoom. Esta actualización no modifica Apps Script ni requiere variables nuevas.

## MODO CREADOR RESPONSIVE · botones cápsula

La interfaz usa botones planos y cápsulas de alto contraste en púrpura y rosa, según las referencias de imagen y video. La reserva tiene una pieza interior rosa que se desliza al pulsar; el selector día/noche tiene sol y luna con un círculo móvil. Se retiró el acabado de vidrio reflectante de los botones de la interfaz. El botón flotante de WhatsApp conserva su halo púrpura/rosa, su posición elevada y la ocultación con recuperación desde el borde.

Tipografía Poppins: controles principales a 14–15 px, campos a 16 px, etiquetas de formulario a 14 px y texto principal a 15–16 px según el ancho. El encabezado pasa a dos filas de marca/tema y acciones en 760 px o menos para mantener etiquetas legibles. La reserva del encabezado dice «Reservar» y usa «Abriendo…» durante la animación; «Consulta tu cupo» puede ocupar dos líneas en teléfonos estrechos. Se mantienen las áreas táctiles y la preferencia de movimiento reducido.

Entrega: MODO_CREADOR_RESPONSIVE.html y MODO_CREADOR_RESPONSIVE_VERCEL.zip. El HTML permite revisar el diseño; registro, consulta y PDF requieren el servidor publicado en Vercel.
