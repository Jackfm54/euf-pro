export type Language = "es" | "fr" | "ar";
export const LANGUAGE_STORAGE_KEY = "euf-interface-language";
export const LANGUAGES: { value: Language; label: string }[] = [
  { value: "fr", label: "Français" },
  { value: "es", label: "Español" },
  { value: "ar", label: "العربية" },
];
export function isLanguage(value: unknown): value is Language {
  return value === "es" || value === "fr" || value === "ar";
}
export const translations: Record<string, Record<Language, string>> = {
  "Una revision gratis": { es: "Una revision gratis", fr: "Une révision gratuite", ar: "مراجعة مجانية واحدة" },
  "Revisiones gratuitas disponibles: {count}": { es: "Revisiones gratuitas disponibles: {count}", fr: "Révisions gratuites disponibles : {count}", ar: "المراجعات المجانية المتبقية: {count}" },
  "Has utilizado tu revision gratis. Necesitas un forfait activo.": { es: "Has utilizado tu revision gratis. Necesitas un forfait activo.", fr: "Vous avez utilisé votre révision gratuites. Un forfait actif est requis.", ar: "لقد استخدمت المراجعتين المجانيتين. مراجعة مجانية واحدة." },
  "Ya hay una revisión en curso. Espera a que termine.": { es: "Ya hay una revisión en curso. Espera a que termine.", fr: "Une révision est déjà en cours. Attendez la fin.", ar: "هناك مراجعة قيد التنفيذ. انتظر حتى تنتهي." },
  "No se pudo guardar la revisión. No se descontó una consulta.": { es: "No se pudo guardar la revisión. No se descontó una consulta.", fr: "Impossible d’enregistrer la révision. Aucune consultation n’a été déduite.", ar: "تعذر حفظ المراجعة. لم تُخصم أي استشارة." },
  "Primeros pasos": { es: "Primeros pasos", fr: "Premiers pas", ar: "الخطوات الأولى" },
  "Práctica constante": { es: "Práctica constante", fr: "Pratique régulière", ar: "تدريب منتظم" },
  "Preparación intensiva": { es: "Preparación intensiva", fr: "Préparation intensive", ar: "تحضير مكثف" },
  "Ortografía y sintaxis": { es: "Ortografía y sintaxis", fr: "Orthographe et syntaxe", ar: "الإملاء وتركيب الجمل" },
  "Hola, {name}": { es: "Hola, {name}", fr: "Bonjour, {name}", ar: "مرحبًا، {name}" },
  "Progreso en tu cuenta": { es: "Progreso en tu cuenta", fr: "Progrès dans votre compte", ar: "التقدم في حسابك" },
  "Tu actividad": { es: "Tu actividad", fr: "Votre activité", ar: "نشاطك" },
  "Intentos disponibles": { es: "Intentos disponibles", fr: "Tentatives disponibles", ar: "المحاولات المتاحة" },
  "Ensayos guardados": { es: "Ensayos guardados", fr: "Rédactions enregistrées", ar: "المقالات المحفوظة" },
  "Último resultado": { es: "Último resultado", fr: "Dernier résultat", ar: "آخر نتيجة" },
  "Datos personales": { es: "Datos personales", fr: "Informations personnelles", ar: "المعلومات الشخصية" },
  "Cuenta privada": { es: "Cuenta privada", fr: "Compte privé", ar: "حساب خاص" },
  "{count} ensayos guardados en tu cuenta.": { es: "{count} ensayos guardados en tu cuenta.", fr: "{count} rédactions enregistrées dans votre compte.", ar: "عدد المقالات المحفوظة في حسابك: {count}." },
  "No se pudo cargar el progreso. Inténtalo de nuevo.": { es: "No se pudo cargar el progreso. Inténtalo de nuevo.", fr: "Impossible de charger la progression. Réessayez.", ar: "تعذر تحميل التقدم. حاول مجددًا." },
  "Reintentar": { es: "Reintentar", fr: "Réessayer", ar: "إعادة المحاولة" },
  "Orientaciones guardadas": { es: "Orientaciones guardadas", fr: "Accompagnements enregistrés", ar: "الإرشادات المحفوظة" },
  "La orientación se muestra, pero no se pudo guardar en tu cuenta.": { es: "La orientación se muestra, pero no se pudo guardar en tu cuenta.", fr: "L’accompagnement est affiché, mais n’a pas pu être enregistré dans votre compte.", ar: "يظهر الإرشاد، لكن تعذر حفظه في حسابك." },
  "Premier sujet": {"es": "Primer tema", "fr": "Premier sujet", "ar": "الموضوع الأول"},
  "Deuxième sujet": {"es": "Segundo tema", "fr": "Deuxième sujet", "ar": "الموضوع الثاني"},
  "Troisième sujet": {"es": "Tercer tema", "fr": "Troisième sujet", "ar": "الموضوع الثالث"},
  "Sujet de comparaison": {"es": "Tema de comparación", "fr": "Sujet de comparaison", "ar": "موضوع مقارنة"},
  "Sujet d'analyse": {"es": "Tema de análisis", "fr": "Sujet d'analyse", "ar": "موضوع تحليل"},
  "XXIe siècle — récits autobiographiques et écritures migrantes": {"es": "Siglo XXI — relatos autobiográficos y literatura de migración", "fr": "XXIe siècle — récits autobiographiques et écritures migrantes", "ar": "القرن الحادي والعشرون — سرد سير ذاتية وأدب الهجرة"},
  "XXe siècle — théâtre contemporain, écriture de l'intime": {"es": "Siglo XX — teatro contemporáneo, escritura de lo íntimo", "fr": "XXe siècle — théâtre contemporain, écriture de l'intime", "ar": "القرن العشرون — المسرح المعاصر والكتابة الحميمة"},
  "XXe siècle — réalisme urbain québécois": {"es": "Siglo XX — realismo urbano quebequense", "fr": "XXe siècle — réalisme urbain québécois", "ar": "القرن العشرون — الواقعية الحضرية في كيبيك"},
  "Épreuve uniforme de français — 14 décembre 2022, cahier 3": {"es": "Prueba uniforme de francés — 14 de diciembre de 2022, cuaderno 3", "fr": "Épreuve uniforme de français — 14 décembre 2022, cahier 3", "ar": "الاختبار الموحد للفرنسية — 14 ديسمبر 2022، الكراسة 3"},
  "Comparar el deseo de escuela: la insistencia de Caroline ante su familia y las trampas de Salie.": {"es": "Comparar el deseo de escuela: la insistencia de Caroline ante su familia y las trampas de Salie.", "fr": "Comparer le désir d’aller à l’école : l’insistance de Caroline auprès de sa famille et les ruses de Salie.", "ar": "قارن الرغبة في الالتحاق بالمدرسة: إصرار كارولين أمام أسرتها وحيل سالي."},
  "Analizar el papel de los adultos: los padres que ceden vs. la abuela y monsieur Ndétare.": {"es": "Analizar el papel de los adultos: los padres que ceden vs. la abuela y monsieur Ndétare.", "fr": "Analyser le rôle des adultes : les parents qui cèdent, par opposition à la grand-mère et à monsieur Ndétare.", "ar": "حلّل دور البالغين: الوالدان اللذان يرضخان مقابل الجدة والسيد نديتاري."},
  "Observar la narración autobiográfica al « je » y el tono (humor, enumeraciones, anáforas).": {"es": "Observar la narración autobiográfica al « je » y el tono (humor, enumeraciones, anáforas).", "fr": "Observer la narration autobiographique au « je » et le ton (humour, énumérations, anaphores).", "ar": "لاحظ السرد بضمير المتكلم والنبرة (الفكاهة والتعداد وتكرار بدايات الجمل)."},
  "Matizar: mismo deseo de aprender, pero contextos sociales y obstáculos muy distintos.": {"es": "Matizar: mismo deseo de aprender, pero contextos sociales y obstáculos muy distintos.", "fr": "Nuancer : un même désir d’apprendre, mais des contextes sociaux et des obstacles très différents.", "ar": "أبرز الفروق: رغبة واحدة في التعلم، لكن سياقات اجتماعية وعقبات مختلفة جدًا."},
  "Estudiar la fuga y la huida: « je me suis enfui », « courir devant la Mort ».": {"es": "Estudiar la fuga y la huida: « je me suis enfui », « courir devant la Mort ».", "fr": "Étudier la fuite : « je me suis enfui », « courir devant la Mort ».", "ar": "ادرس الفرار والهروب: « je me suis enfui » و« courir devant la Mort »."},
  "Analizar la personificación de la Mort como compañera elegante y el « à quoi bon ».": {"es": "Analizar la personificación de la Mort como compañera elegante y el « à quoi bon ».", "fr": "Analyser la personnification de la Mort en compagne élégante et le « à quoi bon ».", "ar": "حلّل تشخيص الموت بوصفه رفيقة أنيقة وعبارة « à quoi bon »."},
  "Observar el juego de máscaras: « je faisais semblant », « je faisais juste mine de ».": {"es": "Observar el juego de máscaras: « je faisais semblant », « je faisais juste mine de ».", "fr": "Observer le jeu des masques : « je faisais semblant », « je faisais juste mine de ».", "ar": "لاحظ لعبة الأقنعة: « je faisais semblant » و« je faisais juste mine de »."},
  "Matizar: aceptación aparente (« je me tiendrai tranquille ») frente a la angustia confesada.": {"es": "Matizar: aceptación aparente (« je me tiendrai tranquille ») frente a la angustia confesada.", "fr": "Nuancer : une acceptation apparente (« je me tiendrai tranquille ») face à l’angoisse avouée.", "ar": "أبرز الفرق بين القبول الظاهري (« je me tiendrai tranquille ») والقلق المعلن."},
  "Comparar el conflicto interior de los dos hombres frente a la diferencia de clase social.": {"es": "Comparar el conflicto interior de los dos hombres frente a la diferencia de clase social.", "fr": "Comparer le conflit intérieur des deux hommes face à la différence de classe sociale.", "ar": "قارن الصراع الداخلي لدى الرجلين أمام اختلاف الطبقة الاجتماعية."},
  "Analizar el retrato de Jacqueline y de Florentine a través de la mirada masculina.": {"es": "Analizar el retrato de Jacqueline y de Florentine a través de la mirada masculina.", "fr": "Analyser le portrait de Jacqueline et de Florentine à travers le regard masculin.", "ar": "حلّل تصوير جاكلين وفلورنتين من خلال النظرة الذكورية."},
  "Estudiar el narrador omnisciente y el discours indirect libre en ambos extractos.": {"es": "Estudiar el narrador omnisciente y el discours indirect libre en ambos extractos.", "fr": "Étudier le narrateur omniscient et le discours indirect libre dans les deux extraits.", "ar": "ادرس الراوي العليم والخطاب غير المباشر الحر في المقتطفين."},
  "Matizar: atracción compartida, pero ternura admirativa en Gilbert vs. violencia y desprecio en Jean.": {"es": "Matizar: atracción compartida, pero ternura admirativa en Gilbert vs. violencia y desprecio en Jean.", "fr": "Nuancer : une attirance partagée, mais une tendresse admirative chez Gilbert, contre la violence et le mépris chez Jean.", "ar": "أبرز الفروق: انجذاب مشترك، لكن حنانًا وإعجابًا لدى جيلبير مقابل العنف والاحتقار لدى جان."},
  "Resultado del examen": { es: "Resultado del examen", fr: "Résultat de l’examen", ar: "نتيجة الامتحان" },
  "Cualquier disertación, independiente del tema y los textos del examen.": { es: "Cualquier disertación, independiente del tema y los textos del examen.", fr: "Toute dissertation, indépendamment du sujet et des textes de l’examen.", ar: "أي مقالة، بشكل مستقل عن موضوع الامتحان ونصوصه." },
  "Abriendo tu sesión…": { es: "Abriendo tu sesión…", fr: "Ouverture de votre session…", ar: "جارٍ فتح جلستك…" },
  "Profesor de literatura": { es: "Profesor de literatura", fr: "Professeur de littérature", ar: "أستاذ الأدب" },
  "Plan de pago": { es: "Plan de pago", fr: "Forfait payant", ar: "خطة مدفوعة" },
  "Disponible con un plan mensual o anual activo.": { es: "Disponible con un plan mensual o anual activo.", fr: "Disponible avec un forfait mensuel ou annuel actif.", ar: "متاح مع خطة شهرية أو سنوية نشطة." },
  "No se pudo comprobar el acceso al profesor.": { es: "No se pudo comprobar el acceso al profesor.", fr: "Impossible de vérifier l’accès au professeur.", ar: "تعذر التحقق من الوصول إلى الأستاذ." },
  "Archivos para el profesor": { es: "Archivos para el profesor", fr: "Fichiers pour le professeur", ar: "ملفات للأستاذ" },
  "Pedir orientación": { es: "Pedir orientación", fr: "Demander un accompagnement", ar: "طلب إرشاد" },
  "El profesor está revisando…": { es: "El profesor está revisando…", fr: "Le professeur examine le travail…", ar: "الأستاذ يراجع النص…" },
  "No se pudo obtener la orientación del profesor.": { es: "No se pudo obtener la orientación del profesor.", fr: "Impossible d’obtenir l’accompagnement du professeur.", ar: "تعذر الحصول على إرشاد الأستاذ." },
  "La orientación se muestra, pero no se pudo guardar en este dispositivo.": { es: "La orientación se muestra, pero no se pudo guardar en este dispositivo.", fr: "L’accompagnement est affiché, mais n’a pas pu être enregistré sur cet appareil.", ar: "يظهر الإرشاد، لكن تعذر حفظه على هذا الجهاز." },
  "Máximo 8 fotos o PDF de 10 MB cada uno.": { es: "Máximo 8 fotos o PDF de 10 MB cada uno.", fr: "Maximum 8 photos ou PDF de 10 Mo chacun.", ar: "بحد أقصى 8 صور أو ملفات PDF، بحجم 10 ميغابايت لكل ملف." },
  "Puntos fuertes": { es: "Puntos fuertes", fr: "Points forts", ar: "نقاط القوة" },
  "Observaciones del profesor": { es: "Observaciones del profesor", fr: "Observations du professeur", ar: "ملاحظات الأستاذ" },
  "Prioridades de revisión": { es: "Prioridades de revisión", fr: "Priorités de révision", ar: "أولويات المراجعة" },
  "Ejercicio propuesto": { es: "Ejercicio propuesto", fr: "Exercice proposé", ar: "تمرين مقترح" },
  "El resultado aparece abajo, pero no se pudo confirmar su guardado. No se ha descontado otra evaluación.": { es: "El resultado aparece abajo, pero no se pudo confirmar su guardado. No se ha descontado otra evaluación.", fr: "Le résultat est affiché ci-dessous, mais son enregistrement n’a pas pu être confirmé. Aucune autre évaluation n’a été déduite.", ar: "تظهر النتيجة أدناه، لكن تعذر تأكيد حفظها. لم يُخصم تقييم آخر." },
  "Contraseña actualizada.": {"es": "Contraseña actualizada.", "fr": "Mot de passe mis à jour.", "ar": "تم تحديث كلمة المرور."},
  "No se pudo cambiar la contraseña.": {"es": "No se pudo cambiar la contraseña.", "fr": "Impossible de modifier le mot de passe.", "ar": "تعذر تغيير كلمة المرور."},
  "Abre el enlace de recuperación recibido por correo.": {"es": "Abre el enlace de recuperación recibido por correo.", "fr": "Ouvrez le lien de récupération reçu par courriel.", "ar": "افتح رابط الاستعادة المستلم بالبريد."},
  "Introduce un correo válido y una contraseña de al menos 8 caracteres.": {"es": "Introduce un correo válido y una contraseña de al menos 8 caracteres.", "fr": "Saisissez un courriel valide et un mot de passe d’au moins 8 caractères.", "ar": "أدخل بريدًا صالحًا وكلمة مرور من 8 أحرف على الأقل."},
  "Correo o contraseña incorrectos, o cuenta sin confirmar.": {"es": "Correo o contraseña incorrectos, o cuenta sin confirmar.", "fr": "Courriel ou mot de passe incorrect, ou compte non confirmé.", "ar": "البريد أو كلمة المرور غير صحيحة، أو الحساب غير مؤكد."},
  "Si la cuenta existe, recibirás un enlace para recuperar la contraseña.": {"es": "Si la cuenta existe, recibirás un enlace para recuperar la contraseña.", "fr": "Si le compte existe, vous recevrez un lien de récupération.", "ar": "إذا كان الحساب موجودًا فستتلقى رابط استعادة."},
  "No se pudo enviar el correo. Inténtalo de nuevo.": {"es": "No se pudo enviar el correo. Inténtalo de nuevo.", "fr": "Impossible d’envoyer le courriel. Réessayez.", "ar": "تعذر إرسال البريد. حاول مجددًا."},
  "No se pudo crear la cuenta. Inténtalo de nuevo.": {"es": "No se pudo crear la cuenta. Inténtalo de nuevo.", "fr": "Impossible de créer le compte. Réessayez.", "ar": "تعذر إنشاء الحساب. حاول مجددًا."},
  "No se pudo guardar.": {"es": "No se pudo guardar.", "fr": "Enregistrement impossible.", "ar": "تعذر الحفظ."},
  "Perfil guardado.": {"es": "Perfil guardado.", "fr": "Profil enregistré.", "ar": "تم حفظ الملف الشخصي."},
  "Ya hay una evaluación en curso. Espera a que termine.": {"es": "Ya hay una evaluación en curso. Espera a que termine.", "fr": "Une évaluation est déjà en cours. Attendez la fin.", "ar": "هناك تقييم جارٍ. انتظر حتى ينتهي."},
  "Has utilizado tu evaluacion gratis. Los planes de pago todavía no están disponibles.": {"es": "Has agotado tus evaluaciones disponibles. Los planes de pago todavía no están disponibles.", "fr": "Vous avez épuisé vos évaluations disponibles. Les forfaits payants ne sont pas encore disponibles.", "ar": "لقد استنفدت التقييمات المتاحة. الخطط المدفوعة غير متاحة بعد."},
  "Revisa tu correo para confirmar tu cuenta.": {"es": "Revisa tu correo para confirmar tu cuenta.", "fr": "Consultez votre courriel pour confirmer votre compte.", "ar": "تحقق من بريدك لتأكيد حسابك."},
  "Evaluaciones gratis restantes: {count}": {"es": "Evaluaciones gratis restantes: {count}", "fr": "Évaluations gratuites restantes : {count}", "ar": "التقييمات المجانية المتبقية: {count}"},
  "Enviar enlace": {"es": "Enviar enlace", "fr": "Envoyer le lien", "ar": "إرسال الرابط"},
  "Procesando…": {"es": "Procesando…", "fr": "Traitement…", "ar": "جارٍ المعالجة…"},
  "Fecha": {"es": "Fecha", "fr": "Date", "ar": "التاريخ"},
  "Acceso no autorizado": {"es": "Acceso no autorizado", "fr": "Accès non autorisé", "ar": "وصول غير مصرح به"},
  "Administración": {"es": "Administración", "fr": "Administration", "ar": "الإدارة"},
  "Usuario": {"es": "Usuario", "fr": "Utilisateur", "ar": "مستخدم"},
  "Administrador": {"es": "Administrador", "fr": "Administrateur", "ar": "مسؤول"},
  "Cerrar sesión": {"es": "Cerrar sesión", "fr": "Se déconnecter", "ar": "تسجيل الخروج"},
  "Mi cuenta": {"es": "Mi cuenta", "fr": "Mon compte", "ar": "حسابي"},
  "Los pagos todavía no están disponibles.": {"es": "Los pagos todavía no están disponibles.", "fr": "Les paiements ne sont pas encore disponibles.", "ar": "المدفوعات غير متاحة بعد."},
  "evaluaciones por cuenta": {"es": "evaluaciones por cuenta", "fr": "évaluations par compte", "ar": "تقييمات لكل حساب"},
  "Próximamente": {"es": "Próximamente", "fr": "Bientôt", "ar": "قريبًا"},
  "por año": {"es": "por año", "fr": "par an", "ar": "سنويًا"},
  "por mes": {"es": "por mes", "fr": "par mois", "ar": "شهريًا"},
  "Anual": {"es": "Anual", "fr": "Annuel", "ar": "سنوي"},
  "Mensual": {"es": "Mensual", "fr": "Mensuel", "ar": "شهري"},
  "Básico": {"es": "Básico", "fr": "Basique", "ar": "أساسي"},
  "Avanzado": {"es": "Avanzado", "fr": "Avancé", "ar": "متقدم"},
  "Premium": {"es": "Premium", "fr": "Premium", "ar": "بريميوم"},
  "o": {"es": "o", "fr": "ou", "ar": "أو"},
  "evaluaciones de examen por mes": {"es": "evaluaciones de examen por mes", "fr": "évaluations d'examen par mois", "ar": "تقييمات اختبار شهريًا"},
  "consultas al profesor por mes": {"es": "consultas al profesor por mes", "fr": "consultations au professeur par mois", "ar": "استشارات مع الأستاذ شهريًا"},
  "Gratis": {"es": "Gratis", "fr": "Gratuit", "ar": "مجاني"},
  "Planes": {"es": "Planes", "fr": "Forfaits", "ar": "الخطط"},
  "Guardar": {"es": "Guardar", "fr": "Enregistrer", "ar": "حفظ"},
  "Nombre": {"es": "Nombre", "fr": "Nom", "ar": "الاسم"},
  "Nueva contraseña": {"es": "Nueva contraseña", "fr": "Nouveau mot de passe", "ar": "كلمة مرور جديدة"},
  "Contraseña": {"es": "Contraseña", "fr": "Mot de passe", "ar": "كلمة المرور"},
  "Correo electrónico": {"es": "Correo electrónico", "fr": "Adresse courriel", "ar": "البريد الإلكتروني"},
  "Recuperar contraseña": {"es": "Recuperar contraseña", "fr": "Récupérer le mot de passe", "ar": "استعادة كلمة المرور"},
  "Crear cuenta": {"es": "Crear cuenta", "fr": "Créer un compte", "ar": "إنشاء حساب"},
  "Iniciar sesión": {"es": "Iniciar sesión", "fr": "Se connecter", "ar": "تسجيل الدخول"},
  "Instalar aplicación": { es: "Instalar aplicación", fr: "Installer l’application", ar: "تثبيت التطبيق" },
  "ÉUF en tu móvil": { es: "ÉUF en tu móvil", fr: "ÉUF sur votre mobile", ar: "ÉUF على هاتفك" },
  "Abre la aplicación publicada en el navegador de tu móvil para añadirla a la pantalla de inicio.": { es: "Abre la aplicación publicada en el navegador de tu móvil para añadirla a la pantalla de inicio.", fr: "Ouvrez l’application publiée dans le navigateur de votre mobile pour l’ajouter à l’écran d’accueil.", ar: "افتح التطبيق المنشور في متصفح هاتفك لإضافته إلى الشاشة الرئيسية." },
  "En iPhone o iPad": { es: "En iPhone o iPad", fr: "Sur iPhone ou iPad", ar: "على iPhone أو iPad" },
  "En Safari, pulsa Compartir y selecciona Añadir a pantalla de inicio; confirma con Añadir.": { es: "En Safari, pulsa Compartir y selecciona Añadir a pantalla de inicio; confirma con Añadir.", fr: "Dans Safari, touchez Partager puis Sur l’écran d’accueil et confirmez avec Ajouter.", ar: "في Safari، اضغط على مشاركة ثم إضافة إلى الشاشة الرئيسية وأكّد بالإضافة." },
  "En Android": { es: "En Android", fr: "Sur Android", ar: "على Android" },
  "En Chrome, abre el menú ⋮ y selecciona Instalar aplicación o Añadir a pantalla de inicio.": { es: "En Chrome, abre el menú ⋮ y selecciona Instalar aplicación o Añadir a pantalla de inicio.", fr: "Dans Chrome, ouvrez le menu ⋮ puis Installer l’application ou Ajouter à l’écran d’accueil.", ar: "في Chrome، افتح قائمة ⋮ ثم اختر تثبيت التطبيق أو إضافة إلى الشاشة الرئيسية." },
  "Necesita conexión a internet. No es una descarga de App Store o Google Play.": { es: "Necesita conexión a internet. No es una descarga de App Store o Google Play.", fr: "Une connexion internet est nécessaire. Ce n’est pas un téléchargement depuis l’App Store ou Google Play.", ar: "يتطلب اتصالًا بالإنترنت. ليس تنزيلًا من App Store أو Google Play." },
  "Instalar ahora": { es: "Instalar ahora", fr: "Installer maintenant", ar: "التثبيت الآن" },
  "Entendido": { es: "Entendido", fr: "Compris", ar: "فهمت" },
  "Inicio": {
    "es": "Inicio",
    "fr": "Accueil",
    "ar": "الرئيسية"
  },
  "Sujets": {
    "es": "Sujets",
    "fr": "Sujets",
    "ar": "المواضيع"
  },
  "Redactar": {
    "es": "Redactar",
    "fr": "Rédiger",
    "ar": "الكتابة"
  },
  "Ayuda": {
    "es": "Ayuda",
    "fr": "Aide",
    "ar": "المساعدة"
  },
  "Progreso": {
    "es": "Progreso",
    "fr": "Progrès",
    "ar": "التقدم"
  },
  "Reglas": {
    "es": "Reglas",
    "fr": "Règles",
    "ar": "القواعد"
  },
  "Dissertation critique · Montréal": {
    "es": "Dissertation critique · Montréal",
    "fr": "Dissertation critique · Montréal",
    "ar": "المقالة النقدية · مونتريال"
  },
  "Idioma": {
    "es": "Idioma",
    "fr": "Langue",
    "ar": "اللغة"
  },
  "Prepara tu dissertation critique con las reglas oficiales": {
    "es": "Prepara tu dissertation critique con las reglas oficiales",
    "fr": "Préparez votre dissertation critique selon les règles officielles",
    "ar": "استعد للمقالة النقدية وفق القواعد الرسمية"
  },
  "900 palabras, 4 h 30, tres criterios que debes aprobar con cote C (60 %). Escribe con cronómetro, autoevalúate con la grille de correction y sigue tu progreso ensayo tras ensayo.": {
    "es": "900 palabras, 4 h 30, tres criterios que debes aprobar con cote C (60 %). Escribe con cronómetro, autoevalúate con la grille de correction y sigue tu progreso ensayo tras ensayo.",
    "fr": "900 mots, 4 h 30 et trois critères à réussir avec une cote C (60 %). Rédigez avec un chronomètre, évaluez-vous avec la grille de correction et suivez vos progrès.",
    "ar": "٩٠٠ كلمة، و٤ ساعات و٣٠ دقيقة، وثلاثة معايير يجب اجتيازها بدرجة C ‏(٦٠٪). اكتب مع المؤقت، وقيّم عملك باستخدام شبكة التصحيح، وتابع تقدمك."
  },
  "Empezar una redacción": {
    "es": "Empezar una redacción",
    "fr": "Commencer une rédaction",
    "ar": "بدء الكتابة"
  },
  "Ver los sujets": {
    "es": "Ver los sujets",
    "fr": "Voir les sujets",
    "ar": "عرض المواضيع"
  },
  "Últimos ensayos": {
    "es": "Últimos ensayos",
    "fr": "Dernières rédactions",
    "ar": "آخر المقالات"
  },
  "Tus tres redacciones más recientes.": {
    "es": "Tus tres redacciones más recientes.",
    "fr": "Vos trois rédactions les plus récentes.",
    "ar": "آخر ثلاث مقالات كتبتها."
  },
  "Todavía no hay ensayos. Empieza con un sujet y tu primera dissertation.": {
    "es": "Todavía no hay ensayos. Empieza con un sujet y tu primera dissertation.",
    "fr": "Aucune rédaction pour le moment. Choisissez un sujet pour commencer.",
    "ar": "لا توجد مقالات بعد. اختر موضوعًا وابدأ مقالتك الأولى."
  },
  "Ver todo el progreso": {
    "es": "Ver todo el progreso",
    "fr": "Voir tous les progrès",
    "ar": "عرض كل التقدم"
  },
  "Sujet sugerido": {
    "es": "Sujet sugerido",
    "fr": "Sujet suggéré",
    "ar": "موضوع مقترح"
  },
  "Redactar este sujet": {
    "es": "Redactar este sujet",
    "fr": "Rédiger sur ce sujet",
    "ar": "الكتابة حول هذا الموضوع"
  },
  "Sujets de rédaction": {
    "es": "Sujets de rédaction",
    "fr": "Sujets de rédaction",
    "ar": "مواضيع الكتابة"
  },
  "Los tres sujets del cahier oficial del 14 de diciembre de 2022, con sus textos completos. Elige uno y redacta 900 palabras en 4 h 30.": {
    "es": "Los tres sujets del cahier oficial del 14 de diciembre de 2022, con sus textos completos. Elige uno y redacta 900 palabras en 4 h 30.",
    "fr": "Les trois sujets du cahier officiel du 14 décembre 2022, avec leurs textes complets. Choisissez-en un et rédigez 900 mots en 4 h 30.",
    "ar": "المواضيع الثلاثة من كتيب الامتحان الرسمي بتاريخ ١٤ ديسمبر ٢٠٢٢، مع النصوص الكاملة. اختر موضوعًا واكتب ٩٠٠ كلمة في ٤ ساعات و٣٠ دقيقة."
  },
  "Reglas de la épreuve": {
    "es": "Reglas de la épreuve",
    "fr": "Règles de l’épreuve",
    "ar": "قواعد الامتحان"
  },
  "Resumen basado en la página oficial del gouvernement du Québec sobre la épreuve uniforme de français, obligatoria para obtener el DEC.": {
    "es": "Resumen basado en la página oficial del gouvernement du Québec sobre la épreuve uniforme de français, obligatoria para obtener el DEC.",
    "fr": "Résumé basé sur la page officielle du gouvernement du Québec sur l’épreuve uniforme de français, obligatoire pour obtenir le DEC.",
    "ar": "ملخص مستند إلى الصفحة الرسمية لحكومة كيبيك عن الامتحان الموحد للغة الفرنسية، الإلزامي للحصول على DEC."
  },
  "Material permitido (máx. 3 obras)": {
    "es": "Material permitido (máx. 3 obras)",
    "fr": "Ouvrages permis (3 maximum)",
    "ar": "المراجع المسموح بها (٣ كحد أقصى)"
  },
  "Prohibido": {
    "es": "Prohibido",
    "fr": "Interdit",
    "ar": "ممنوع"
  },
  "Su uso puede considerarse plagio o fraude.": {
    "es": "Su uso puede considerarse plagio o fraude.",
    "fr": "Leur utilisation peut être considérée comme du plagiat ou de la fraude.",
    "ar": "قد يُعتبر استخدامها انتحالًا أو غشًا."
  },
  "Próximas fechas oficiales": {
    "es": "Próximas fechas oficiales",
    "fr": "Prochaines dates officielles",
    "ar": "المواعيد الرسمية القادمة"
  },
  "La épreuve se realiza tres veces al año.": {
    "es": "La épreuve se realiza tres veces al año.",
    "fr": "L’épreuve a lieu trois fois par an.",
    "ar": "يُجرى الامتحان ثلاث مرات في السنة."
  },
  ". La inscripción se hace en tu collège.": {
    "es": ". La inscripción se hace en tu collège.",
    "fr": ". L’inscription se fait à votre collège.",
    "ar": ". يتم التسجيل في كليتك."
  },
  "Duración": {
    "es": "Duración",
    "fr": "Durée",
    "ar": "المدة"
  },
  "Extensión": {
    "es": "Extensión",
    "fr": "Longueur",
    "ar": "عدد الكلمات"
  },
  "Errores máximos": {
    "es": "Errores máximos",
    "fr": "Nombre maximal de fautes",
    "ar": "الحد الأقصى للأخطاء"
  },
  "Umbral": {
    "es": "Umbral",
    "fr": "Seuil",
    "ar": "حد النجاح"
  },
  "Cote C en los 3 criterios": {
    "es": "Cote C en los 3 criterios",
    "fr": "Cote C aux 3 critères",
    "ar": "درجة C في المعايير الثلاثة"
  },
  "Simulación de examen": {
    "es": "Simulación de examen",
    "fr": "Simulation d’examen",
    "ar": "محاكاة الامتحان"
  },
  "Reiniciar tiempo": {
    "es": "Reiniciar tiempo",
    "fr": "Réinitialiser le chronomètre",
    "ar": "إعادة ضبط المؤقت"
  },
  "Terminar y evaluar": {
    "es": "Terminar y evaluar",
    "fr": "Terminer et évaluer",
    "ar": "الإنهاء والتقييم"
  },
  "Palabras": {
    "es": "Palabras",
    "fr": "Mots",
    "ar": "الكلمات"
  },
  "Pistas del sujet": {
    "es": "Pistas del sujet",
    "fr": "Pistes de réflexion",
    "ar": "أفكار حول الموضوع"
  },
  "Notas personales": {
    "es": "Notas personales",
    "fr": "Notes personnelles",
    "ar": "ملاحظات شخصية"
  },
  "Corrección automática": { "es": "Corrección automática", "fr": "Correction automatique", "ar": "التصحيح التلقائي" },
  "La IA califica cada criterio, señala tus errores con la regla infringida y te da recomendaciones, sin corregir el texto por ti.": {
    "es": "La IA califica cada criterio, señala tus errores con la regla infringida y te da recomendaciones, sin corregir el texto por ti.",
    "fr": "L'IA attribue une cote à chaque critère, relève tes fautes avec la règle enfreinte et te donne des recommandations, sans corriger le texte à ta place.",
    "ar": "يقيّم الذكاء الاصطناعي كل معيار ويحدد أخطاءك مع القاعدة المخالفة ويقدم توصيات، دون تصحيح النص نيابة عنك."
  },
  "Recomendaciones": { "es": "Recomendaciones", "fr": "Recommandations", "ar": "توصيات" },
  "Corrigiendo tu redacción… puede tardar un minuto.": {
    "es": "Corrigiendo tu redacción… puede tardar un minuto.",
    "fr": "Correction en cours… cela peut prendre une minute.",
    "ar": "جارٍ تصحيح نصك… قد يستغرق ذلك دقيقة."
  },
  "Corregir de nuevo": { "es": "Corregir de nuevo", "fr": "Corriger à nouveau", "ar": "التصحيح مجددًا" },
  "Corregir con IA": { "es": "Corregir con IA", "fr": "Corriger avec l'IA", "ar": "التصحيح بالذكاء الاصطناعي" },
  "Evaluar desde una foto": { "es": "Evaluar desde una foto", "fr": "Évaluer depuis une photo", "ar": "التقييم من صورة" },
  "¿Escribiste a mano? Sube fotos claras de tu redacción (una por página) y la IA las leerá, transcribirá y evaluará.": { "es": "¿Escribiste a mano? Sube fotos claras de tu redacción (una por página) y la IA las leerá, transcribirá y evaluará.", "fr": "Vous avez écrit à la main ? Téléversez des photos claires de votre rédaction (une par page) et l'IA les lira, les transcrira et les évaluera.", "ar": "كتبتَ بخط اليد؟ ارفع صورًا واضحة لمقالتك (صورة لكل صفحة) وسيقرأها الذكاء الاصطناعي وينسخها ويقيّمها." },
  "Foto de la redacción": { "es": "Foto de la redacción", "fr": "Photo de la rédaction", "ar": "صورة المقالة" },
  "Elegir o tomar una foto": { "es": "Elegir o tomar una foto", "fr": "Choisir ou prendre une photo", "ar": "اختيار صورة أو التقاطها" },
  "Cambiar la foto": { "es": "Cambiar la foto", "fr": "Changer la photo", "ar": "تغيير الصورة" },
  "Evaluar la foto": { "es": "Evaluar la foto", "fr": "Évaluer la photo", "ar": "تقييم الصورة" },
  "Leyendo la foto…": { "es": "Leyendo la foto…", "fr": "Lecture de la photo…", "ar": "جارٍ قراءة الصورة…" },
  "Evaluar las fotos": { "es": "Evaluar las fotos", "fr": "Évaluer les photos", "ar": "تقييم الصور" },
  "Leyendo las fotos…": { "es": "Leyendo las fotos…", "fr": "Lecture des photos…", "ar": "جارٍ قراءة الصور…" },
  "Evaluar desde fotos o PDF": { "es": "Evaluar desde fotos o PDF", "fr": "Évaluer depuis des photos ou un PDF", "ar": "التقييم من صور أو PDF" },
  "Subir fotos o PDF": { "es": "Subir fotos o PDF", "fr": "Téléverser des photos ou un PDF", "ar": "رفع صور أو PDF" },
  "Añadir otro archivo": { "es": "Añadir otro archivo", "fr": "Ajouter un autre fichier", "ar": "إضافة ملف آخر" },
  "Evaluar los archivos": { "es": "Evaluar los archivos", "fr": "Évaluer les fichiers", "ar": "تقييم الملفات" },
  "Leyendo los archivos…": { "es": "Leyendo los archivos…", "fr": "Lecture des fichiers…", "ar": "جارٍ قراءة الملفات…" },
  "Un archivo por página, en orden (página 1, 2, 3…), en foto o en PDF.": { "es": "Un archivo por página, en orden (página 1, 2, 3…), en foto o en PDF.", "fr": "Un fichier par page, dans l'ordre (page 1, 2, 3…), en photo ou en PDF.", "ar": "ملف واحد لكل صفحة، بالترتيب (صفحة 1، 2، 3…)، صورة أو PDF." },
  "Escribe tu redacción a mano o en el ordenador y súbela abajo en fotos o en PDF para evaluarla.": { "es": "Escribe tu redacción a mano o en el ordenador y súbela abajo en fotos o en PDF para evaluarla.", "fr": "Écrivez votre rédaction à la main ou à l'ordinateur et téléversez-la ci-dessous en photos ou en PDF pour l'évaluer.", "ar": "اكتب مقالتك بخط اليد أو على الحاسوب وارفعها أدناه كصور أو PDF لتقييمها." },
  "Añadir otra foto": { "es": "Añadir otra foto", "fr": "Ajouter une autre photo", "ar": "إضافة صورة أخرى" },
  "Quitar esta foto": { "es": "Quitar esta foto", "fr": "Retirer cette photo", "ar": "إزالة هذه الصورة" },
  "Una foto por página, en orden (página 1, 2, 3…).": { "es": "Una foto por página, en orden (página 1, 2, 3…).", "fr": "Une photo par page, dans l'ordre (page 1, 2, 3…).", "ar": "صورة واحدة لكل صفحة، بالترتيب (صفحة 1، 2، 3…)." },
  "Buena luz, sin sombras, con la hoja plana y de frente.": { "es": "Buena luz, sin sombras, con la hoja plana y de frente.", "fr": "Bonne lumière, sans ombres, feuille à plat et de face.", "ar": "إضاءة جيدة، بلا ظلال، والورقة مستوية ومقابلة للكاميرا." },
  "Que se lean todas las líneas completas, sin cortar los bordes.": { "es": "Que se lean todas las líneas completas, sin cortar los bordes.", "fr": "Toutes les lignes doivent être lisibles, sans couper les bords.", "ar": "يجب أن تكون جميع الأسطر مقروءة بالكامل دون قصّ الحواف." },
  "No se pudo leer una redacción en las fotos. Sube solo fotos de tu texto, con buena luz y de frente.": { "es": "No se pudo leer una redacción en las fotos. Sube solo fotos de tu texto, con buena luz y de frente.", "fr": "Aucune dissertation lisible dans les photos. Envoyez uniquement des photos de votre texte, bien éclairées et de face.", "ar": "تعذّرت قراءة مقال في الصور. ارفع فقط صورًا لنصّك بإضاءة جيدة وبشكل مستقيم." },
  "La foto es demasiado grande (máximo 10 MB).": { "es": "La foto es demasiado grande (máximo 10 MB).", "fr": "La photo est trop grande (10 Mo maximum).", "ar": "الصورة كبيرة جدًا (الحد الأقصى 10 ميغابايت)." },
  "El archivo no es una imagen válida.": { "es": "El archivo no es una imagen válida.", "fr": "Le fichier n'est pas une image valide.", "ar": "الملف ليس صورة صالحة." },
  "El archivo no es una imagen ni un PDF válido.": { "es": "El archivo no es una imagen ni un PDF válido.", "fr": "Le fichier n'est ni une image ni un PDF valide.", "ar": "الملف ليس صورة أو PDF صالحًا." },
  "No se pudo leer el texto en la foto. Tómala con buena luz y de frente.": { "es": "No se pudo leer el texto en la foto. Tómala con buena luz y de frente.", "fr": "Impossible de lire le texte sur la photo. Prenez-la avec une bonne lumière et de face.", "ar": "تعذّرت قراءة النص في الصورة. التقطها بإضاءة جيدة وبشكل مستقيم." },
  "Los archivos superan el tamaño permitido. Envía menos páginas o fotos más ligeras.": { "es": "Los archivos superan el tamaño permitido. Envía menos páginas o fotos más ligeras.", "fr": "Les fichiers dépassent la taille permise. Envoyez moins de pages ou des photos plus légères.", "ar": "تتجاوز الملفات الحجم المسموح به. أرسل صفحات أقل أو صورًا أخف." },
  "El PDF es demasiado grande (máximo 3 MB). Envía una foto de cada página.": { "es": "El PDF es demasiado grande (máximo 3 MB). Envía una foto de cada página.", "fr": "Le PDF est trop volumineux (3 Mo maximum). Envoyez une photo de chaque page.", "ar": "ملف PDF كبير جدًا (الحد الأقصى 3 ميغابايت). أرسل صورة لكل صفحة." },
  "La IA no está configurada: revisa la clave de OpenAI en Vercel y vuelve a publicar.": { "es": "La IA no está configurada: revisa la clave de OpenAI en Vercel y vuelve a publicar.", "fr": "L'IA n'est pas configurée : vérifiez la clé OpenAI dans Vercel et republiez.", "ar": "الذكاء الاصطناعي غير مُعدّ: تحقّق من مفتاح OpenAI في Vercel ثم أعد النشر." },
  "No se pudo reservar tu evaluación. Revisa la base de datos e inténtalo de nuevo.": { "es": "No se pudo reservar tu evaluación. Revisa la base de datos e inténtalo de nuevo.", "fr": "Impossible de réserver votre évaluation. Vérifiez la base de données et réessayez.", "ar": "تعذّر حجز تقييمك. تحقّق من قاعدة البيانات وحاول مرة أخرى." },
  "No se pudo guardar el resultado. Revisa la clave de servicio de la base de datos en Vercel.": { "es": "No se pudo guardar el resultado. Revisa la clave de servicio de la base de datos en Vercel.", "fr": "Impossible d'enregistrer le résultat. Vérifiez la clé de service de la base de données dans Vercel.", "ar": "تعذّر حفظ النتيجة. تحقّق من مفتاح خدمة قاعدة البيانات في Vercel." },
  "No se pudo corregir la foto. Inténtalo de nuevo.": { "es": "No se pudo corregir la foto. Inténtalo de nuevo.", "fr": "Impossible de corriger la photo. Réessayez.", "ar": "تعذّر تصحيح الصورة. حاول مرة أخرى." },
  "Criterio": { "es": "Criterio", "fr": "Critère", "ar": "المعيار" },
  "Consejos": { "es": "Consejos", "fr": "Conseils", "ar": "نصائح" },
  "Errores detectados": { "es": "Errores detectados", "fr": "Fautes relevées", "ar": "الأخطاء المكتشفة" },
  "Corrección automática lista": { "es": "Corrección automática lista", "fr": "Correction automatique terminée", "ar": "اكتمل التصحيح التلقائي" },
  "No se pudo corregir el texto. Inténtalo de nuevo.": {
    "es": "No se pudo corregir el texto. Inténtalo de nuevo.",
    "fr": "Impossible de corriger le texte. Réessaie.",
    "ar": "تعذّر تصحيح النص. حاول مرة أخرى."
  },
  "El texto es demasiado corto para corregirlo (mínimo 50 palabras).": {
    "es": "El texto es demasiado corto para corregirlo (mínimo 50 palabras).",
    "fr": "Le texte est trop court pour être corrigé (minimum 50 mots).",
    "ar": "النص قصير جدًا للتصحيح (50 كلمة على الأقل)."
  },
  "Demasiadas correcciones seguidas. Espera un minuto e inténtalo de nuevo.": {
    "es": "Demasiadas correcciones seguidas. Espera un minuto e inténtalo de nuevo.",
    "fr": "Trop de corrections d'affilée. Attends une minute et réessaie.",
    "ar": "طلبات تصحيح كثيرة متتالية. انتظر دقيقة ثم حاول مجددًا."
  },
  "La corrección automática no está disponible ahora (créditos de IA agotados).": {
    "es": "La corrección automática no está disponible ahora (créditos de IA agotados).",
    "fr": "La correction automatique est indisponible pour le moment (crédits d'IA épuisés).",
    "ar": "التصحيح التلقائي غير متاح حاليًا (نفدت أرصدة الذكاء الاصطناعي)."
  },
  "Guardar ensayo": {
    "es": "Guardar ensayo",
    "fr": "Enregistrer la rédaction",
    "ar": "حفظ المقالة"
  },
  "Volver al texto": {
    "es": "Volver al texto",
    "fr": "Revenir au texte",
    "ar": "العودة إلى النص"
  },
  "Ver mi progreso": {
    "es": "Ver mi progreso",
    "fr": "Voir mes progrès",
    "ar": "عرض تقدمي"
  },
  "Pausar": {
    "es": "Pausar",
    "fr": "Mettre en pause",
    "ar": "إيقاف مؤقت"
  },
  "Iniciar": {
    "es": "Iniciar",
    "fr": "Démarrer",
    "ar": "بدء"
  },
  "cronómetro": {
    "es": "cronómetro",
    "fr": "chronomètre",
    "ar": "المؤقت"
  },
  "palabras": {
    "es": "palabras",
    "fr": "mots",
    "ar": "كلمات"
  },
  "guardado automático": {
    "es": "guardado automático",
    "fr": "enregistrement automatique",
    "ar": "حفظ تلقائي"
  },
  "Mínimo tolerado: {count} palabras. Menos implica penalización.": {
    "es": "Mínimo tolerado: {count} palabras. Menos implica penalización.",
    "fr": "Minimum toléré : {count} mots. Un texte plus court est pénalisé.",
    "ar": "الحد الأدنى المقبول: {count} كلمة. تُطبق عقوبة إذا كان النص أقصر."
  },
  "Errores de lengua tolerados para {count} palabras:": {
    "es": "Errores de lengua tolerados para {count} palabras:",
    "fr": "Fautes de langue tolérées pour {count} mots :",
    "ar": "أخطاء اللغة المسموح بها لـ {count} كلمة:"
  },
  "Borrador recuperado": {
    "es": "Borrador recuperado",
    "fr": "Brouillon récupéré",
    "ar": "تم استعادة المسودة"
  },
  "Continúa donde lo dejaste.": {
    "es": "Continúa donde lo dejaste.",
    "fr": "Reprenez là où vous en étiez.",
    "ar": "تابع من حيث توقفت."
  },
  "Relevé enregistré": {
    "es": "Relevé enregistré",
    "fr": "Relevé enregistré",
    "ar": "تم حفظ النتيجة"
  },
  "Qué mejorar la próxima vez…": {
    "es": "Qué mejorar la próxima vez…",
    "fr": "Que faut-il améliorer la prochaine fois ?",
    "ar": "ما الذي يجب تحسينه في المرة القادمة؟"
  },
  "Mi progreso": {
    "es": "Mi progreso",
    "fr": "Mes progrès",
    "ar": "تقدمي"
  },
  "Borrar todo": {
    "es": "Borrar todo",
    "fr": "Tout effacer",
    "ar": "حذف الكل"
  },
  "Aún no hay datos": {
    "es": "Aún no hay datos",
    "fr": "Aucune donnée pour le moment",
    "ar": "لا توجد بيانات بعد"
  },
  "Escribe tu primera dissertation critique para empezar a medir tu evolución.": {
    "es": "Escribe tu primera dissertation critique para empezar a medir tu evolución.",
    "fr": "Rédigez votre première dissertation critique pour suivre votre évolution.",
    "ar": "اكتب مقالتك النقدية الأولى لتبدأ متابعة تطورك."
  },
  "Empezar ahora": {
    "es": "Empezar ahora",
    "fr": "Commencer maintenant",
    "ar": "ابدأ الآن"
  },
  "Evolución por criterio": {
    "es": "Evolución por criterio",
    "fr": "Évolution par critère",
    "ar": "التطور حسب المعيار"
  },
  "La línea punteada marca el umbral de 60 % (cote C).": {
    "es": "La línea punteada marca el umbral de 60 % (cote C).",
    "fr": "La ligne pointillée indique le seuil de 60 % (cote C).",
    "ar": "يشير الخط المنقط إلى حد ٦٠٪ (درجة C)."
  },
  "Global": {
    "es": "Global",
    "fr": "Global",
    "ar": "الإجمالي"
  },
  "Argumentación": {
    "es": "Argumentación",
    "fr": "Argumentation",
    "ar": "الحجاج"
  },
  "Estructura": {
    "es": "Estructura",
    "fr": "Structure",
    "ar": "البنية"
  },
  "Lengua": {
    "es": "Lengua",
    "fr": "Langue",
    "ar": "اللغة"
  },
  "{count} ensayos registrados en este dispositivo.": {
    "es": "{count} ensayos registrados en este dispositivo.",
    "fr": "{count} rédactions enregistrées sur cet appareil.",
    "ar": "عدد المقالات المحفوظة على هذا الجهاز: {count}."
  },
  "Guía completa de la dissertation critique": {
    "es": "Guía completa de la dissertation critique",
    "fr": "Guide complet de la dissertation critique",
    "ar": "الدليل الكامل للمقالة النقدية"
  },
  "Todo el contenido del guide préparatoire, incluidas sus tablas: informaciones generales, gestión del tiempo, las siete etapas de redacción, la estructura de cada parte y los nueve anexos.": {
    "es": "Todo el contenido del guide préparatoire, incluidas sus tablas: informaciones generales, gestión del tiempo, las siete etapas de redacción, la estructura de cada parte y los nueve anexos.",
    "fr": "Tout le contenu du guide préparatoire et ses tableaux : informations générales, gestion du temps, sept étapes de rédaction, structure et neuf annexes.",
    "ar": "محتوى الدليل التحضيري كاملًا مع الجداول: معلومات عامة، وتنظيم الوقت، ومراحل الكتابة السبع، والبنية، والملاحق التسعة."
  },
  "Informaciones": {
    "es": "Informaciones",
    "fr": "Informations",
    "ar": "معلومات"
  },
  "Tiempo": {
    "es": "Tiempo",
    "fr": "Temps",
    "ar": "الوقت"
  },
  "Etapas": {
    "es": "Etapas",
    "fr": "Étapes",
    "ar": "المراحل"
  },
  "Sujet": {
    "es": "Sujet",
    "fr": "Sujet",
    "ar": "الموضوع"
  },
  "Plan": {
    "es": "Plan",
    "fr": "Plan",
    "ar": "الخطة"
  },
  "Marcadores": {
    "es": "Marcadores",
    "fr": "Marqueurs",
    "ar": "الروابط"
  },
  "Citas y procédés": {
    "es": "Citas y procédés",
    "fr": "Citations et procédés",
    "ar": "الاقتباسات والأساليب"
  },
  "Corrientes": {
    "es": "Corrientes",
    "fr": "Courants",
    "ar": "التيارات"
  },
  "Revisión": {
    "es": "Revisión",
    "fr": "Révision",
    "ar": "المراجعة"
  },
  "Anexos": {
    "es": "Anexos",
    "fr": "Annexes",
    "ar": "الملاحق"
  },
  "Textes du cahier": {
    "es": "Textes du cahier",
    "fr": "Textes du cahier",
    "ar": "نصوص الكتيب"
  },
  "Los dos textos del dossier. Es obligatorio tener en cuenta ambos en tu dissertation.": {
    "es": "Los dos textos del dossier. Es obligatorio tener en cuenta ambos en tu dissertation.",
    "fr": "Les deux textes du dossier. Il faut tenir compte des deux dans votre dissertation.",
    "ar": "نصّا الكتيب. يجب مراعاة كليهما في مقالتك."
  },
  "El texto del dossier. Léelo y marca las citas antes de redactar.": {
    "es": "El texto del dossier. Léelo y marca las citas antes de redactar.",
    "fr": "Le texte du dossier. Lisez-le et repérez les citations avant de rédiger.",
    "ar": "نص الكتيب. اقرأه وحدد الاقتباسات قبل الكتابة."
  },
  "Épreuve officielle": {
    "es": "Épreuve officielle",
    "fr": "Épreuve officielle",
    "ar": "امتحان رسمي"
  },
  "Présentation": {
    "es": "Présentation",
    "fr": "Présentation",
    "ar": "تقديم"
  },
  "Texte 1": {
    "es": "Texte 1",
    "fr": "Texte 1",
    "ar": "النص ١"
  },
  "Texte 2": {
    "es": "Texte 2",
    "fr": "Texte 2",
    "ar": "النص ٢"
  },
  "Texte unique": {
    "es": "Texte unique",
    "fr": "Texte unique",
    "ar": "النص الوحيد"
  },
  "Promedio:": {
    "es": "Promedio:",
    "fr": "Moyenne :",
    "ar": "المتوسط:"
  },
  "sin datos": {
    "es": "sin datos",
    "fr": "aucune donnée",
    "ar": "لا توجد بيانات"
  },
  "· aprobado": {
    "es": "· aprobado",
    "fr": "· réussi",
    "ar": "· ناجح"
  },
  "· bajo el umbral": {
    "es": "· bajo el umbral",
    "fr": "· sous le seuil",
    "ar": "· دون الحد"
  },
  "de examen": {
    "es": "de examen",
    "fr": "d’examen",
    "ar": "للامتحان"
  },
  "máx.": {
    "es": "máx.",
    "fr": "max.",
    "ar": "حد أقصى"
  },
  "errores de lengua": {
    "es": "errores de lengua",
    "fr": "fautes de langue",
    "ar": "أخطاء لغوية"
  },
  "próxima épreuve en {count} días": {
    "es": "próxima épreuve en {count} días",
    "fr": "prochaine épreuve dans {count} jours",
    "ar": "الامتحان القادم بعد {count} يومًا"
  },
  "Elegido entre {count} sujets.": {
    "es": "Elegido entre {count} sujets.",
    "fr": "Choisi parmi {count} sujets.",
    "ar": "مختار من بين {count} مواضيع."
  },
  "errores": {
    "es": "errores",
    "fr": "fautes",
    "ar": "أخطاء"
  },
  "Eliminar ensayo": {
    "es": "Eliminar ensayo",
    "fr": "Supprimer la rédaction",
    "ar": "حذف المقالة"
  },
  "Réussite": {
    "es": "Réussite",
    "fr": "Réussite",
    "ar": "نجاح"
  },
  "Échec": {
    "es": "Échec",
    "fr": "Échec",
    "ar": "رسوب"
  },
  "Critère I": {
    "es": "Critère I",
    "fr": "Critère I",
    "ar": "المعيار I"
  },
  "Critère II": {
    "es": "Critère II",
    "fr": "Critère II",
    "ar": "المعيار II"
  },
  "Critère III": {
    "es": "Critère III",
    "fr": "Critère III",
    "ar": "المعيار III"
  },
  "Compréhension et qualité de l'argumentation": {
    "es": "Compréhension et qualité de l'argumentation",
    "fr": "Compréhension et qualité de l'argumentation",
    "ar": "الفهم وجودة الحجاج"
  },
  "Structure du texte de l'élève": {
    "es": "Structure du texte de l'élève",
    "fr": "Structure du texte de l'élève",
    "ar": "بنية نص الطالب"
  },
  "Maîtrise de la langue": {
    "es": "Maîtrise de la langue",
    "fr": "Maîtrise de la langue",
    "ar": "إتقان اللغة"
  },
  "Cote globale obtenue par l'addition de la valeur des cotes des trois sous-critères.": {
    "es": "Cote globale obtenue par l'addition de la valeur des cotes des trois sous-critères.",
    "fr": "Cote globale obtenue par l’addition des valeurs des trois sous-critères.",
    "ar": "تُحسب الدرجة الإجمالية بجمع قيم درجات المعايير الفرعية الثلاثة."
  },
  "Cote globale obtenue par l'addition de la valeur des cotes des deux sous-critères.": {
    "es": "Cote globale obtenue par l'addition de la valeur des cotes des deux sous-critères.",
    "fr": "Cote globale obtenue par l’addition des valeurs des deux sous-critères.",
    "ar": "تُحسب الدرجة الإجمالية بجمع قيم درجتي المعيارين الفرعيين."
  },
  "Cote globale obtenue par l'addition du nombre de fautes des trois sous-critères (1 faute par tranche de 30 mots = seuil de la cote C).": {
    "es": "Cote globale obtenue par l'addition du nombre de fautes des trois sous-critères (1 faute par tranche de 30 mots = seuil de la cote C).",
    "fr": "Cote globale obtenue par l’addition des fautes des trois sous-critères (1 faute pour 30 mots = seuil C).",
    "ar": "تُحسب الدرجة الإجمالية بجمع أخطاء المعايير الفرعية الثلاثة (خطأ واحد لكل ٣٠ كلمة هو حد الدرجة C)."
  },
  "Respeto del tema de redacción": {
    "es": "Respeto del tema de redacción",
    "fr": "Respect du sujet de rédaction",
    "ar": "الالتزام بموضوع الكتابة"
  },
  "Calidad de la argumentación": {
    "es": "Calidad de la argumentación",
    "fr": "Qualité de l’argumentation",
    "ar": "جودة الحجاج"
  },
  "Comprensión de los textos e integración de conocimientos literarios": {
    "es": "Comprensión de los textos e integración de conocimientos literarios",
    "fr": "Compréhension des textes et intégration de connaissances littéraires",
    "ar": "فهم النصوص وإدماج المعارف الأدبية"
  },
  "Introducción y conclusión": {
    "es": "Introducción y conclusión",
    "fr": "Introduction et conclusion",
    "ar": "المقدمة والخاتمة"
  },
  "Desarrollo": {
    "es": "Desarrollo",
    "fr": "Développement",
    "ar": "العرض"
  },
  "Vocabulario": {
    "es": "Vocabulario",
    "fr": "Vocabulaire",
    "ar": "المفردات"
  },
  "Sintaxis y puntuación": {
    "es": "Sintaxis y puntuación",
    "fr": "Syntaxe et ponctuation",
    "ar": "النحو وعلامات الترقيم"
  },
  "Ortografía de uso y gramatical": {
    "es": "Ortografía de uso y gramatical",
    "fr": "Orthographe d’usage et grammaticale",
    "ar": "الإملاء والقواعد"
  },
  "La tesis responde exactamente al sujet posé; se abordan todos los elementos esenciales.": {
    "es": "La tesis responde exactamente al sujet posé; se abordan todos los elementos esenciales.",
    "fr": "La thèse répond exactement au sujet posé ; tous les éléments essentiels sont abordés.",
    "ar": "تجيب الأطروحة بدقة عن الموضوع وتتناول جميع العناصر الأساسية."
  },
  "Argumentos pertinentes, desarrollados, con pruebas del texto explicadas.": {
    "es": "Argumentos pertinentes, desarrollados, con pruebas del texto explicadas.",
    "fr": "Arguments pertinents et développés, appuyés sur des preuves textuelles expliquées.",
    "ar": "حجج ملائمة ومفصلة مدعومة بأدلة نصية مشروحة."
  },
  "Sin contrasentidos; corriente, época y procedimientos usados con pertinencia.": {
    "es": "Sin contrasentidos; corriente, época y procedimientos usados con pertinencia.",
    "fr": "Aucun contresens ; emploi pertinent du courant, de l’époque et des procédés.",
    "ar": "دون سوء فهم؛ استخدام مناسب للتيار والعصر والأساليب الأدبية."
  },
  "Sujet amené, posé, divisé · conclusión con síntesis y apertura.": {
    "es": "Sujet amené, posé, divisé · conclusión con síntesis y apertura.",
    "fr": "Sujet amené, posé et divisé ; conclusion avec synthèse et ouverture.",
    "ar": "تمهيد وطرح وتقسيم الموضوع؛ خاتمة مع تلخيص وانفتاح."
  },
  "Párrafos completos y ordenados, transiciones y organisateurs textuels.": {
    "es": "Párrafos completos y ordenados, transiciones y organisateurs textuels.",
    "fr": "Paragraphes complets et ordonnés, transitions et organisateurs textuels.",
    "ar": "فقرات كاملة ومنظمة مع انتقالات وروابط نصية."
  },
  "Impropiedades, anglicismos, registro familiar.": {
    "es": "Impropiedades, anglicismos, registro familiar.",
    "fr": "Impropriétés, anglicismes et registre familier.",
    "ar": "استخدامات غير ملائمة وألفاظ إنجليزية ولغة عامية."
  },
  "Frases incompletas, subordinadas incorrectas, comas y comillas.": {
    "es": "Frases incompletas, subordinadas incorrectas, comas y comillas.",
    "fr": "Phrases incomplètes, subordonnées incorrectes, virgules et guillemets.",
    "ar": "جمل ناقصة وجمل فرعية غير صحيحة وفواصل وعلامات اقتباس."
  },
  "Acuerdos, participios, homófonos, acentos.": {
    "es": "Acuerdos, participios, homófonos, acentos.",
    "fr": "Accords, participes, homophones et accents.",
    "ar": "المطابقة وأسماء المفعول والكلمات المتجانسة صوتيًا واللكنات."
  },
  "Document officiel (simulation)": {
    "es": "Document officiel (simulation)",
    "fr": "Document officiel (simulation)",
    "ar": "وثيقة رسمية (محاكاة)"
  },
  "Relevé des résultats": {
    "es": "Relevé des résultats",
    "fr": "Relevé des résultats",
    "ar": "كشف النتائج"
  },
  "Critères": {
    "es": "Critères",
    "fr": "Critères",
    "ar": "المعايير"
  },
  "Cote globale": {
    "es": "Cote globale",
    "fr": "Cote globale",
    "ar": "الدرجة الإجمالية"
  },
  "Verdict": {
    "es": "Verdict",
    "fr": "Verdict",
    "ar": "النتيجة"
  },
  "Nombre total de fautes :": {
    "es": "Nombre total de fautes :",
    "fr": "Nombre total de fautes :",
    "ar": "إجمالي الأخطاء:"
  },
  "Total de fautes :": {
    "es": "Total de fautes :",
    "fr": "Total de fautes :",
    "ar": "إجمالي الأخطاء:"
  },
  "Moins de 600 mots : aucune cote n'est attribuée, verdict d'échec automatique.": {
    "es": "Moins de 600 mots : aucune cote n'est attribuée, verdict d'échec automatique.",
    "fr": "Moins de 600 mots : aucune cote n’est attribuée, échec automatique.",
    "ar": "أقل من ٦٠٠ كلمة: لا تُمنح درجة وتكون النتيجة رسوبًا تلقائيًا."
  },
  "Fuente:": {
    "es": "Fuente:",
    "fr": "Source :",
    "ar": "المصدر:"
  },
  "Page not found": {
    "es": "Page not found",
    "fr": "Page introuvable",
    "ar": "الصفحة غير موجودة"
  },
  "The page you're looking for doesn't exist or has been moved.": {
    "es": "The page you're looking for doesn't exist or has been moved.",
    "fr": "La page recherchée n’existe pas ou a été déplacée.",
    "ar": "الصفحة المطلوبة غير موجودة أو تم نقلها."
  },
  "Go home": {
    "es": "Go home",
    "fr": "Accueil",
    "ar": "الرئيسية"
  },
  "This page didn't load": {
    "es": "This page didn't load",
    "fr": "Cette page n’a pas chargé",
    "ar": "تعذر تحميل الصفحة"
  },
  "Something went wrong on our end. You can try refreshing or head back home.": {
    "es": "Something went wrong on our end. You can try refreshing or head back home.",
    "fr": "Une erreur est survenue. Réessayez ou revenez à l’accueil.",
    "ar": "حدث خطأ. أعد المحاولة أو عد إلى الرئيسية."
  },
  "Try again": {
    "es": "Try again",
    "fr": "Réessayer",
    "ar": "إعادة المحاولة"
  }
};
export function translate(language: Language, text: string, values: Record<string, string | number> = {}) {
  const result = translations[text]?.[language] ?? text;
  return result.replace(/\{(\w+)\}/g, (match, key: string) => String(values[key] ?? match));
}
