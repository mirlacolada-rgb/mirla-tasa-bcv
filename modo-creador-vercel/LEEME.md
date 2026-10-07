# MODO CREADOR · Vercel

Proyecto Next.js con el diseño de Mirla, registro dentro de la página, PagoMóvil y Binance, comprobantes privados en Drive y registros en la hoja original de Apps Script. No usa Google Forms.

## Publicar

1. Descomprime este ZIP.
2. Crea un repositorio privado en GitHub. Sube **el contenido** de `modo-creador-vercel`, incluyendo `app`, `components`, `lib`, `public` y `package.json`. No subas el ZIP como archivo.
3. En Vercel selecciona **Add New → Project** e importa ese repositorio. Framework: **Next.js**. La carpeta raíz debe contener `package.json`.
4. En **Environment Variables** agrega para **Production**:
   - `GOOGLE_SCRIPT_URL`: el enlace de `.env.example`, terminado en `/exec`.
   - `GOOGLE_SHARED_SECRET`: el mismo secreto configurado en las propiedades de tu Apps Script. No es tu contraseña de Google. No lo pongas en HTML, GitHub ni variables `NEXT_PUBLIC_`.
5. Pulsa **Deploy**. Si cambias variables después, realiza **Redeploy**.
6. Abre el dominio de producción. Comprueba el monto en bolívares y su fecha. Regístrate, revisa la hoja original `MODO CREADOR - Inscripciones 2026`, adjunta un comprobante y comprueba que el estado cambie a `en_revision`.
7. Mirla cambia el estado a `reservado` o `confirmado` después de revisar el pago. Esos estados actualizan el porcentaje de cupos.

Apps Script debe seguir publicado para ejecutar como Mirla y con acceso `Cualquiera`. El secreto se comparte únicamente entre los servidores. No hay que recrear la hoja ni el formulario.

## Comportamiento

- USD 100 por PagoMóvil a tasa BCV; Binance de contado: 90 USDT.
- Reserva: 50 y saldo de 50 en puerta, sin descuento.
- Comprobantes JPG, PNG o PDF de hasta **4 MB**.
- Tasa consultada desde el servidor con su fecha de actualización. Si no hay tasa válida, se evita calcular el pago.
- Cierre: 13 de noviembre de 2026 a las 19:00, hora de Caracas. Capacidad: 200 pagos aprobados.
- No incluye contraseñas, secretos ni datos de inscritas. La publicación en tu cuenta Vercel sigue pendiente.

## Desarrollo local

Instala Node.js 22 o superior. Ejecuta `npm install`. Copia `.env.example` a `.env.local` y completa el secreto. Ejecuta `npm run dev`. Para comprobar la compilación: `npm run build`.
