# Publicar la misma versión del HTML aprobado

La página pública examinada el 10 de octubre seguía sirviendo un CSS anterior sin los ajustes del PDF móvil. El proyecto de este ZIP fue compilado y comparado con el HTML: coinciden las dimensiones y posiciones de los elementos a 390 y 1440 px.

1. Descomprime este ZIP. Abre modo-creador-vercel.
2. Reemplaza el contenido del repositorio conectado a Vercel con el contenido de esa carpeta. En esta actualización debes subir tanto app/page.tsx como app/globals.css y public/release.json, además del resto del proyecto. Cambiar solo el CSS no añade el check ni los enlaces.
3. Guarda los cambios en la rama de producción y espera el nuevo despliegue. En Vercel confirma que el despliegue está asociado al nuevo commit y figura como Production/Ready. Volver a desplegar un commit viejo no incorpora archivos nuevos.
4. Conserva GOOGLE_SCRIPT_URL y GOOGLE_SHARED_SECRET. No necesitas modificar Apps Script para esta entrega.
5. Abre tu dominio seguido de /release.json. Debe mostrar la versión mirla-2026-10-10-social-parity. Si no aparece, ese dominio aún apunta a otra versión. Revisa el proyecto y despliegue de producción antes de volver a subir archivos.

El HTML es una vista previa autónoma. Los registros, consulta y tickets funcionan en la versión publicada. Comparación visual realizada con el mismo tema, ancho y datos simulados, sin enviar registros reales. No se probó Safari físico.
