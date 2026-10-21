# Guía paso a paso: desplegar EUF pro por tu cuenta

## 1. Qué recibes

Descomprime el ZIP de EUF pro. Dentro encontrarás el código completo con todas las mejoras actuales, los iconos, la configuración independiente, el Dockerfile, la estructura de base de datos (`ESQUEMA_BASE_DATOS.sql`) y esta guía. No contiene claves privadas, datos de usuarios ni historial Git.

La aplicación necesita tres servicios externos tuyos: Vercel (alojamiento), OpenAI (evaluación e orientación con IA) y Supabase (cuentas y base de datos). Los pagos están desactivados: los planes se muestran como «Próximamente».

## 2. Qué necesitas

- Una cuenta de Vercel: https://vercel.com (el plan gratuito sirve para empezar).
- Una cuenta de OpenAI con una clave de API y saldo disponible. Una suscripción de ChatGPT no equivale a saldo de API.
- Una cuenta de Supabase: https://supabase.com (el plan gratuito sirve para empezar).
- Una cuenta de GitHub para conectar el repositorio con Vercel.
- Para comprobarlo en tu ordenador: Node.js 24 LTS (https://nodejs.org) y Bun 1.3.3 (https://bun.sh/docs/installation).

El alojamiento, el uso de OpenAI y una base de datos con mucho uso pueden tener costes separados.

## 3. Crea la base de datos y las cuentas (Supabase)

1. En Supabase, crea un proyecto nuevo y anota su contraseña de base de datos.
2. Abre **SQL Editor → New query**, pega el contenido completo de `ESQUEMA_BASE_DATOS.sql` y ejecútalo. Crea las tablas de perfiles, roles, progreso, cupos de evaluación y acceso del profesor, con reglas de privacidad por cuenta.
3. En **Authentication → Sign In / Providers**, deja activado el proveedor de correo. La aplicación pide confirmar el correo antes de entrar; configura los correos del proyecto en **Authentication → Emails** (el servicio gratuito limita el envío: para usuarios reales conviene un remitente SMTP propio).
4. En **Project Settings → Data API** copia la dirección del proyecto, y en **API Keys** copia la clave pública (`publishable`) y la clave privada (`secret`). La clave privada solo va en variables del servidor, nunca en el navegador ni en GitHub.

## 4. Comprueba la aplicación en tu ordenador

1. Abre una terminal dentro de la carpeta de EUF pro.
2. Instala las dependencias: `bun install`
3. Copia `.env.example` como `.env` y rellena: tu clave real de OpenAI, la dirección y las claves de tu proyecto Supabase (los valores `VITE_` y los de servidor son los mismos para URL y clave pública) y un `CRON_SECRET` largo y aleatorio. No compartas ese archivo ni lo subas a GitHub.
4. Ejecuta `bun run dev` y abre la dirección que indique la terminal.
5. Crea una cuenta con tu correo, confírmala y entra. Revisa los temas, la guía y los tres idiomas.
6. Sube una foto legible o un PDF de una redacción de prueba en Redactar y evalúala: deben aparecer notas, errores con su regla y recomendaciones, sin versión corregida. Recarga y confirma que el resultado sigue guardado y que el cupo se descontó una sola vez.
7. Entra desde otro navegador con la misma cuenta y confirma que el progreso aparece; confirma también que otra cuenta no ve tus datos.

## 5. Sube el código a un repositorio privado

1. En GitHub, crea un repositorio nuevo y privado.
2. Sube el contenido de la carpeta, incluidos `.gitignore` y `.dockerignore`.
3. No subas `.env`, `node_modules` ni `.output`.

## 6. Despliega en Vercel

1. En Vercel, elige **Add New → Project** e importa tu repositorio.
2. En las variables de entorno del proyecto, añade:

| Variable | Valor |
|---|---|
| `NITRO_PRESET` | `vercel` |
| `OPENAI_API_KEY` | Tu clave real de OpenAI |
| `AI_MODEL` | `gpt-4o-mini` |
| `SUPABASE_URL` | Dirección de tu proyecto Supabase |
| `SUPABASE_PUBLISHABLE_KEY` | Clave pública `publishable` |
| `SUPABASE_SERVICE_ROLE_KEY` | Clave privada `secret` (solo servidor) |
| `VITE_SUPABASE_URL` | La misma dirección del proyecto |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | La misma clave pública |
| `CRON_SECRET` | Un texto largo y aleatorio |

3. Despliega y espera a que termine la compilación. Revisa los registros: el despliegue debe quedar activo, no reiniciarse.
4. En tu proyecto Supabase, en **Authentication → URL Configuration**, añade la dirección HTTPS de Vercel como dirección del sitio y como dirección de redirección permitida, para que funcionen la confirmación de correo y la recuperación de contraseña.
5. Repite todas las comprobaciones del paso 4 en la dirección pública.

**Límite importante de Vercel:** cada solicitud a sus funciones admite como máximo 4,5 MB. Las fotos o PDF de varias páginas pueden superar ese límite y fallar. Antes de abrir el servicio a usuarios hay que adaptar la carga para enviar los archivos directamente a un almacenamiento privado (pendiente, ver `ESTADO_COPIA.md`). Mientras tanto, limita las pruebas a documentos pequeños.

## 7. Lista de comprobación después del despliegue

- Abren `/`, `/sujets`, `/guide`, `/regles`, `/redaction`, `/progres` y `/planes`, también al recargar cada dirección.
- Registro, confirmación de correo, entrada, salida y recuperación de contraseña funcionan.
- Los idiomas español, francés y árabe funcionan y la selección permanece tras recargar; los textos del examen siguen en francés.
- Una foto legible y un PDF pequeño reciben notas, errores y recomendaciones en el idioma elegido; no aparece una versión corregida.
- El cupo muestra dos evaluaciones gratuitas y una falla de la IA no lo descuenta.
- El profesor de literatura rechaza a cuentas sin acceso de pago activo.
- El progreso aparece igual en dos dispositivos con la misma cuenta, y otra cuenta no lo ve.
- En móvil puedes añadir la aplicación a la pantalla de inicio. Necesita conexión.
- La dirección es HTTPS y ninguna clave privada aparece en el código del navegador.

## 8. Dominio propio y móvil

1. En Vercel, añade tu dominio en **Settings → Domains** y copia los registros DNS en el proveedor donde compraste el dominio.
2. Espera a que se active HTTPS y añade el dominio nuevo en la configuración de direcciones de Supabase (paso 6.4).
3. En iPhone, abre la dirección en Safari y usa Compartir → Añadir a pantalla de inicio. En Android, abre Chrome y usa Instalar o Añadir a pantalla de inicio.

## 9. Pagos, actualizaciones y problemas

- Los cobros están desactivados. Para activarlos hará falta conectar Stripe o PayPal, verificar renovaciones y cancelaciones, y dar de alta el acceso del profesor tras cada pago. No actives los botones de compra sin completar esa integración.
- Envía los cambios a tu repositorio: Vercel despliega cada versión nueva. Vuelve a probar la evaluación tras cada cambio.
- Si OpenAI indica saldo insuficiente, recarga el saldo de API; la aplicación lo mostrará como error de créditos sin descontar el intento.
- Configura límites de presupuesto y alertas en OpenAI y vigila los registros de Vercel para detectar fallos.
