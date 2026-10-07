# MODO CREADOR · actualización para Vercel

Incluye cédula numérica, consulta de cupos, regalos GIFT, tickets PDF dorados, Poppins, gradiente pastel, transparencias, sombras y animaciones. Mantiene el registro en la página, tasa BCV, PagoMóvil, Binance, comprobantes en Drive y la hoja original de inscripciones.

## Actualizar la página que ya tienes

1. Descomprime `MODO_CREADOR_Vercel.zip`.
2. En el mismo repositorio GitHub conectado a Vercel, reemplaza los archivos con **el contenido** de `modo-creador-vercel`. Incluye `app`, `lib`, `components`, `public`, `package.json` y los archivos de configuración de la raíz. No subas solo el ZIP ni crees una subcarpeta adicional.
3. Confirma los cambios en la rama que despliega Vercel. Vercel compilará la actualización automáticamente. Si no, entra en Deployments y realiza un Redeploy de esa rama.
4. Mantén tus variables `GOOGLE_SCRIPT_URL` y `GOOGLE_SHARED_SECRET`. No necesitas nuevas variables.
5. Revisa el dominio de producción: el encabezado debe mostrar **Consulta tu cupo** y el registro **Quiero regalar mi cupo**.

La conexión de Apps Script y la hoja ya fueron actualizadas desde la cuenta Mirla Colada durante esta entrega. Se mantuvo la misma URL `/exec`, sin recrear la hoja, la carpeta de comprobantes ni los secretos. El archivo `integrations/google-apps-script.gs` contiene la versión entregada por si necesitas recuperarla.

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
