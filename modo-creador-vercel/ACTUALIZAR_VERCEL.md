# Actualizar MODO CREADOR en Vercel

1. Descomprime este ZIP.
2. En el mismo repositorio de GitHub conectado a Vercel, reemplaza los archivos con los de esta carpeta. El archivo package.json debe quedar en la raíz del proyecto configurada en Vercel.
3. Incluye app, components, lib, public e integrations y los archivos de configuración. No basta con reemplazar el CSS: las guías incluyen 22 imágenes en public/guides.
4. Guarda los cambios (commit) y espera a que Vercel marque el despliegue como Ready.
5. Conserva tus variables GOOGLE_SCRIPT_URL y GOOGLE_SHARED_SECRET en Vercel. No hay variables nuevas ni cambios necesarios de Apps Script para las guías.
6. Abre tu dominio y verifica la sección Guías.

## Enlaces para compartir después de publicar

Añade estas terminaciones a tu dominio:
- /#guias/camara
- /#guias/hooks
- /#guias/marcas

Cada enlace abre únicamente esa guía. Todas las guías permite regresar al catálogo. Las guías son públicas: quien navegue voluntariamente al catálogo podrá ver las tres.

Se mantienen el registro, consulta de cupos, tickets y pagos del proyecto previo. Comprueba estas funciones tras desplegar con tus variables habituales.
