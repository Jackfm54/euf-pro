# EUF pro — copia completa (20 de octubre de 2026)

Esta copia incluye todos los cambios y mejoras de la aplicación actual:

- Cuentas con correo y contraseña, perfiles y rol de administrador.
- Dos evaluaciones gratuitas por cuenta, con cupos individuales ampliables y reserva atómica: una evaluación fallida no consume intentos.
- Progreso guardado en la nube por cuenta: historial de ensayos, borradores y orientaciones del profesor.
- Evaluación por fotos o PDF en Redactar según el tema y los dos textos oficiales; en Revisión, cualquier disertación.
- Profesor de literatura con orientación (sin correcciones ni notas), con acceso de pago verificado en el servidor.
- Planes Básico (US$20), Avanzado (US$50) y Premium (US$100) visibles como «Próximamente»: los pagos están desactivados.
- Interfaz en español, francés y árabe; material oficial del examen siempre en francés.
- Instalación en la pantalla de inicio del móvil (manifiesto, sin funcionamiento sin conexión).
- Nombre EUF pro e iconos propios en pestañas e instalación.

Diferencias de servicio respecto a la aplicación actual: la IA usa OpenAI directo con tu propia clave (OPENAI_API_KEY) y las cuentas y la base de datos usan un proyecto Supabase propio (estructura en ESQUEMA_BASE_DATOS.sql). La copia no contiene claves, datos de usuarios ni referencias a la plataforma anterior.

Pendiente antes de recibir usuarios (ver GUIA_DESPLIEGUE.md):

1. Crear el proyecto Supabase externo, ejecutar ESQUEMA_BASE_DATOS.sql y comprobar registro, correo de confirmación y recuperación de contraseña.
2. Desplegar en Vercel con NITRO_PRESET=vercel y verificar el arranque; la copia ya compila con la configuración independiente y sus 26 pruebas pasan, pero el despliegue en Vercel aún no se ha ejecutado.
3. Adaptar la carga de fotos y PDF grandes a un almacenamiento privado: Vercel limita cada solicitud a sus funciones a 4,5 MB.
4. Probar una evaluación real con saldo de OpenAI y confirmar que una falla no descuenta intentos.
5. Los datos de los usuarios actuales no se trasladan con esta copia; la migración de cuentas existente sigue pendiente.

## Versión 2
- Las fotos se reducen en el navegador antes de enviarse (máx. 1600 px), para no superar el límite de 4,5 MB por envío de Vercel. PDF hasta 3 MB; si es más grande, se piden fotos de cada página.
- Las opciones de razonamiento solo se envían a modelos que las aceptan (gpt-5…, o1/o3/o4…). Con `AI_MODEL=gpt-4o-mini` ya no se rechaza la solicitud.
- `ESQUEMA_BASE_DATOS.sql` se puede ejecutar varias veces y crea el perfil de cuentas registradas antes de instalarlo.
