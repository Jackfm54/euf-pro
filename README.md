# EUF pro · Práctica de francés

Aplicación independiente con React, TanStack Start, Tailwind CSS, Supabase (cuentas, progreso y cupos) y OpenAI Responses (evaluación y orientación del profesor).

Incluye temas y extractos oficiales en francés, guía de preparación, carga de fotos o PDF, evaluación de la redacción original según los criterios de la ÉUF, orientación de un profesor de literatura, cuentas con correo y contraseña, dos evaluaciones gratuitas por cuenta y progreso guardado en la nube. Las explicaciones aparecen en español, francés o árabe. Ni la evaluación ni el profesor entregan una redacción corregida. Los planes de pago (Básico, Avanzado, Premium) se muestran como «Próximamente»: los cobros están desactivados.

## Inicio rápido

Requisitos: Node.js 24 LTS y Bun 1.3.3.

```sh
bun install
cp .env.example .env
# Configura en .env tu proyecto de Supabase y tu clave privada de OpenAI.
bun run dev
```

La base de datos y las cuentas necesitan un proyecto de Supabase propio: ejecuta `ESQUEMA_BASE_DATOS.sql` en su editor SQL antes de crear cuentas.

## Producción

```sh
bun run build
bun run start
```

El servidor usa el puerto 3000 por defecto y acepta PORT y HOST. Para Vercel, compila con la variable `NITRO_PRESET=vercel`. No basta con subir archivos a un alojamiento estático: la evaluación y las cuentas necesitan el servidor.

Consulta `GUIA_DESPLIEGUE.md` para el despliegue paso a paso en Vercel.

## Seguridad y estado

- El paquete no incluye claves privadas, datos personales, historial Git ni dependencias instaladas.
- Las claves privadas solo se configuran como variables del servidor, nunca con prefijo VITE_.
- La evaluación consume saldo de OpenAI, facturado aparte del alojamiento.
- Los pagos están desactivados; los planes se muestran como «Próximamente».
- Vercel limita a 4,5 MB cada solicitud a sus funciones: las fotos o PDF muy grandes deben adaptarse a un almacenamiento privado antes de publicar (pendiente).
- La instalación móvil usa un manifiesto; no hay funcionamiento sin conexión.
