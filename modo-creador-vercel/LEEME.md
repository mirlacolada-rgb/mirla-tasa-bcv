# MODO CREADOR · diseño actualizado desde el PDF de Mirla

Fotos, título e íconos extraídos de las capas del PDF con su transparencia original. Poppins en pesos 400, 500, 600, 700 y 800. Modo noche por defecto; se conserva la elección de modo día. Teléfono del cierre estático, letras animadas, botones switch, cronograma clicable y formularios existentes. WhatsApp corporativo: 0424 414 4992.

## Actualizar la página que ya tienes

1. Descomprime `MODO_CREADOR_Vercel.zip`.
2. En el mismo repositorio GitHub conectado a Vercel, reemplaza los archivos con **el contenido** de `modo-creador-vercel`. Incluye `app`, `lib`, `components`, `public`, `package.json` y los archivos de configuración de la raíz. No subas solo el ZIP ni crees una subcarpeta adicional.
3. Confirma los cambios en la rama que despliega Vercel. Vercel compilará la actualización automáticamente. Si no, entra en Deployments y realiza un Redeploy de esa rama.
4. Mantén tus variables `GOOGLE_SCRIPT_URL` y `GOOGLE_SHARED_SECRET`. No necesitas nuevas variables.
5. Revisa el dominio de producción: el encabezado debe mostrar **Consulta tu cupo** y el registro **Quiero regalar mi cupo**.

Esta entrega actualiza la interfaz. Mantén la conexión y las variables existentes de Vercel; no requiere cambiar Apps Script ni crear una hoja nueva.

## Movimiento, cursor y modo noche

El botón Noche/Día del encabezado cambia el tema y conserva la preferencia en el navegador. Los botones principales de reserva tienen apariencia de switch: al hacer clic o tocar, animan su recorrido y abren el formulario existente de registro y pago. No realizan un pago ni omiten el registro.

En equipos con ratón y pantallas amplias, los títulos y capas decorativas mantienen movimiento al desplazarse; la animación se sincroniza con el refresco de pantalla mediante requestAnimationFrame. Se mantiene el scroll nativo, se detiene el movimiento automático del carrusel cuando hay una ventana abierta y se respeta la preferencia de movimiento reducido. El cursor es púrpura en equipos con ratón y tiene un aro suave; el aro se omite en pantallas táctiles. Todas las ventanas usan una capa de fondo desenfocada.

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

Entrada USD 100 por PagoMóvil a tasa BCV. Binance de contado: 89.99 USDT, descuento únicamente por pago completo. Reserva de 50 y saldo de 50 en puerta, sin descuento. Comprobantes JPG, PNG o PDF de hasta 4 MB. Validación de pagos hasta 24 horas y sin devoluciones.

Masterclass: 14 noviembre 2026, Supercines CC La Granja, Naguanagua; de 9:00 a. m. a 12:30 p. m., coffee break hasta 1:00 p. m. Incluye acceso, dinámicas, certificado y coffee break. Cierre de inscripciones: 13 noviembre 2026 a las 19:00, hora de Caracas; 200 cupos aprobados.

## Recuperar la conexión si fuera necesario

Solo si necesitas reinstalar el backend: abre tu proyecto Apps Script existente, reemplaza Código.gs con `integrations/google-apps-script.gs`, guarda, ejecuta `actualizarSistema` y en Implementar → Administrar las implementaciones → Editar selecciona Nueva versión y publica. Conserva el mismo acceso y la misma URL. No borres las propiedades del script ni vuelvas a crear la hoja.

## Desarrollo

Node.js 22 o superior. `npm install`; copia `.env.example` a `.env.local` y completa tu secreto privado; `npm run dev`. Para comprobar: `npm run build`. No publiques `.env.local` ni el secreto en GitHub o HTML. Poppins se sirve localmente y también se incorpora al PDF; su licencia está en `public/fonts/OFL.txt`.

Esta entrega contiene el código listo; la publicación de los archivos visuales en tu cuenta Vercel aún requiere actualizar el repositorio conectado.

## Optimización para Android, iOS y tabletas

El diseño se adapta desde 320 px, con navegación reorganizada en teléfonos pequeños, controles táctiles de al menos 44 px y carrusel con deslizamiento nativo. Las ventanas ajustan su altura y posición al área visible del navegador cuando aparece el teclado o cambia la orientación. Los campos de texto usan 16 px para evitar el zoom automático de Safari al escribir; esta versión bloquea el zoom mediante la configuración del viewport, touch-action y la cancelación de gestos con varios dedos. Se contemplan las zonas seguras del notch y la barra inferior.

En pantallas táctiles se omiten el parallax, el zoom de la fotografía y las animaciones continuas del fondo para reducir trabajo gráfico. Se mantienen las transiciones, el switch de reserva, el carrusel, el fondo desenfocado y el modo noche. El HTML incorpora fuentes e imagen y evita incluir hojas de estilo de compilaciones anteriores.

Actualiza el mismo repositorio conectado a Vercel siguiendo los pasos de arriba. Conserva las variables. Para la versión actual, actualiza Apps Script según los pasos al final. El HTML descargable sirve para revisar el diseño; registro, consulta y PDF requieren la página publicada con su servidor.

## Corrección de la estructura responsive

Se reemplazaron las reglas móviles que se sobrescribían por un conjunto único de puntos de adaptación. Las columnas usan minmax(0,1fr), con anchos fluidos: en 900 px o menos, portada, presentación, agenda, preguntas y pago se apilan; en 600 px o menos, el encabezado organiza marca y tema en una fila y consulta/reserva en otra, y el formulario pasa a una columna. Las tarjetas del carrusel se calculan según el ancho disponible. Los textos, fotos, tarjetas y márgenes cambian de tamaño sin depender del modelo de teléfono. Los radios conservan su tamaño propio y sus etiquetas tienen área táctil.

## WhatsApp flotante y ancho de pantalla

Se añadió un botón pequeño de vidrio transparente en el borde derecho, en móvil y escritorio, que abre https://wa.me/584244144992 sin enviar un mensaje automáticamente. Se oculta con la X o arrastrándolo hacia el borde; queda una pestaña discreta para recuperarlo. La preferencia de ocultarlo se conserva en ese navegador. Se muestra por debajo de las ventanas para no tapar el registro o los datos de pago.

La página limita el desbordamiento horizontal de las capas decorativas. El desplazamiento horizontal se conserva solo dentro del carrusel. El viewport fija la escala a 1 y no permite zoom; se cancelan los gestos de pellizco y los gestos de Safari sin cancelar el desplazamiento normal con un dedo. Algunos navegadores o ajustes de accesibilidad pueden imponer sus propias opciones de zoom. No requiere variables nuevas. Sigue las instrucciones de Apps Script al final para esta versión.


## Actualización de precio y Sheets
Precio: 99.99 USD. Reserva: 50.00, saldo: 49.99. Binance de contado: 89.99 USDT (10%, redondeado a dos decimales).
IMPORTANTE: reemplaza también el código de Apps Script por integrations/google-apps-script.gs y actualiza la implementación existente (nueva versión conservando su URL). El script anterior sigue guardando 100 USD. Conserva las propiedades y credenciales existentes. Los registros anteriores no se modifican.


## Ticket vertical y códigos (versión actual)
1. Reemplaza el código de Apps Script por integrations/google-apps-script.gs.
2. Ejecuta actualizarSistema una vez: agrega Codigo ticket y conserva tus filas.
3. Administrar implementaciones > Editar > Nueva versión > Implementar. Conserva la URL /exec y las propiedades del script.
4. Actualiza el proyecto de Vercel con este ZIP.
El código de tres dígitos se asigna al descargar por primera vez un ticket aprobado y se guarda permanentemente en Sheets. No se recicla; admite 001–999. El ID MC original y la verificación firmada siguen vigentes; el código corto no permite consultar datos por sí solo.
El ticket muestra titular y su cédula; para regalos sin cédula del beneficiario, indica “Por confirmar con Mirla”. Incluye GIFT y comprador si corresponde. Al aprobar el saldo final en Sheets, actualiza Abono, Saldo=0 y Estado=confirmado. Al volver a descargar se conserva el código y aparece Pago completo.
Binance muestra solo USDT; las conversiones BCV aparecen únicamente para PagoMóvil.
