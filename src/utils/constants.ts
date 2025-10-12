/**
 * TrivIAndo Constants
 * Constantes de texto, mensajes y configuración de la aplicación
 */

// ===== TEXTOS DE LA APLICACIÓN =====
export const APP_TEXTS = {
  // Nombre de la aplicación
  appName: 'TrivIAndo',
  appDescription:
    'La plataforma de trivia inteligente que convierte el aprendizaje en una aventura',

  // Navegación
  nav: {
    topics: 'Temas',
    profile: 'Perfil',
    leaderboard: 'Rankings',
    results: 'Resultados',
    logout: 'Cerrar Sesión',
  },

  // Autenticación
  auth: {
    login: {
      title: 'Iniciar Sesión',
      subtitle: 'Ingresa a tu cuenta para continuar aprendiendo',
      email: 'Email o Usuario',
      password: 'Contraseña',
      loginButton: 'Iniciar Sesión',
      forgotPassword: '¿Olvidaste tu contraseña?',
      noAccount: '¿No tienes cuenta?',
      registerLink: 'Regístrate aquí',
      loginWithGoogle: 'Continuar con Google',
    },
    register: {
      title: 'Crear Cuenta',
      subtitle: 'Únete a la comunidad de aprendizaje',
      firstName: 'Nombre',
      lastName: 'Apellido',
      email: 'Email',
      username: 'Nombre de Usuario',
      password: 'Contraseña',
      confirmPassword: 'Confirmar Contraseña',
      registerButton: 'Crear Cuenta',
      hasAccount: '¿Ya tienes cuenta?',
      loginLink: 'Inicia sesión',
      terms: 'Al registrarte, aceptas nuestros',
      termsLink: 'Términos y Condiciones',
      and: 'y',
      privacyLink: 'Política de Privacidad',
    },
  },

  // Temas
  topics: {
    title: 'Explora Temas',
    subtitle: 'Elige un tema para comenzar tu aventura de aprendizaje',
    generateTopic: 'Crear Nuevo Tema',
    searchPlaceholder: 'Buscar temas...',
    noTopics: 'No hay temas disponibles',
    createFirst: 'Crea tu primer tema para comenzar',
    loading: 'Cargando temas...',
    difficulty: {
      easy: 'Fácil',
      medium: 'Intermedio',
      hard: 'Difícil',
    },
  },

  // Quiz
  quiz: {
    title: 'Quiz',
    question: 'Pregunta {current} de {total}',
    timeRemaining: 'Tiempo restante',
    timeUp: '¡Tiempo agotado!',
    nextQuestion: 'Siguiente',
    finish: 'Finalizar',
    loading: 'Generando preguntas...',
    noQuestions: 'No se pudieron generar preguntas para este tema',
    tryAgain: 'Intentar de nuevo',
    correct: '¡Correcto!',
    incorrect: 'Incorrecto',
    explanation: 'Explicación:',
  },

  // Resultados
  results: {
    title: 'Resultados del Quiz',
    score: 'Puntuación: {score}%',
    correctAnswers: 'Respuestas correctas: {correct} de {total}',
    timeSpent: 'Tiempo: {time}',
    excellent: '¡Excelente trabajo!',
    good: '¡Buen trabajo!',
    needImprovement: 'Puedes mejorar',
    tryAgain: 'Intentar de nuevo',
    newTopic: 'Nuevo tema',
    shareResults: 'Compartir resultados',
    viewDetails: 'Ver detalles',
  },

  // Perfil
  profile: {
    title: 'Mi Perfil',
    editProfile: 'Editar Perfil',
    changeAvatar: 'Cambiar Avatar',
    statistics: 'Estadísticas',
    totalQuizzes: 'Quizzes realizados',
    averageScore: 'Puntuación promedio',
    totalTime: 'Tiempo total',
    favoriteTopics: 'Temas favoritos',
    achievements: 'Logros',
    streak: 'Racha actual',
    level: 'Nivel',
  },

  // Rankings
  leaderboard: {
    title: 'Tabla de Posiciones',
    global: 'Global',
    weekly: 'Semanal',
    monthly: 'Mensual',
    topicSpecific: 'Por Tema',
    position: 'Posición',
    player: 'Jugador',
    score: 'Puntuación',
    noData: 'No hay datos disponibles',
  },

  // Errores
  errors: {
    generic: 'Ha ocurrido un error inesperado',
    network: 'Error de conexión. Verifica tu internet',
    unauthorized: 'No tienes permisos para realizar esta acción',
    notFound: 'Página no encontrada',
    server: 'Error del servidor. Intenta más tarde',
    validation: 'Por favor, revisa los datos ingresados',
    timeout: 'La operación tardó demasiado tiempo',
  },

  // Mensajes de éxito
  success: {
    profileUpdated: 'Perfil actualizado correctamente',
    topicCreated: 'Tema creado exitosamente',
    quizCompleted: 'Quiz completado',
    login: 'Inicio de sesión exitoso',
    register: 'Cuenta creada exitosamente',
    logout: 'Sesión cerrada correctamente',
  },

  // Botones comunes
  buttons: {
    save: 'Guardar',
    cancel: 'Cancelar',
    edit: 'Editar',
    delete: 'Eliminar',
    confirm: 'Confirmar',
    back: 'Volver',
    next: 'Siguiente',
    previous: 'Anterior',
    close: 'Cerrar',
    reload: 'Recargar',
    share: 'Compartir',
    copy: 'Copiar',
    download: 'Descargar',
    upload: 'Subir',
    search: 'Buscar',
    filter: 'Filtrar',
    sort: 'Ordenar',
    reset: 'Restablecer',
    submit: 'Enviar',
    loading: 'Cargando...',
  },

  // Estados de carga
  loading: {
    default: 'Cargando...',
    topics: 'Cargando temas...',
    quiz: 'Preparando quiz...',
    results: 'Calculando resultados...',
    profile: 'Cargando perfil...',
    leaderboard: 'Cargando rankings...',
    saving: 'Guardando...',
    uploading: 'Subiendo...',
  },
} as const;

// ===== CONFIGURACIÓN DE LA APLICACIÓN =====
export const APP_CONFIG = {
  // Configuración de quiz
  quiz: {
    defaultQuestions: 10,
    defaultTimePerQuestion: 30, // segundos
    minQuestions: 5,
    maxQuestions: 50,
    difficulties: ['easy', 'medium', 'hard'] as const,
  },

  // Configuración de paginación
  pagination: {
    defaultPageSize: 12,
    topicsPerPage: 12,
    resultsPerPage: 10,
    leaderboardPerPage: 20,
  },

  // Límites
  limits: {
    topicNameLength: 100,
    descriptionLength: 500,
    usernameLength: 30,
    maxFileSize: 5 * 1024 * 1024, // 5MB
  },

  // URLs
  urls: {
    terms: '/terms',
    privacy: '/policy',
    support: '/support',
    contact: '/contact',
  },

  // Configuración de animaciones
  animations: {
    defaultDuration: 300,
    fastDuration: 150,
    slowDuration: 500,
    staggerDelay: 100,
  },
} as const;

// ===== REGEX PATTERNS =====
export const PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  username: /^[a-zA-Z0-9_-]{3,30}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  phoneNumber: /^\+?[\d\s\-\(\)]{10,}$/,
} as const;

// ===== NIVELES Y LOGROS =====
export const GAMIFICATION = {
  levels: [
    { level: 1, name: 'Novato', minScore: 0, color: '#94a3b8' },
    { level: 2, name: 'Aprendiz', minScore: 100, color: '#22d3ee' },
    { level: 3, name: 'Conocedor', minScore: 300, color: '#14b8a6' },
    { level: 4, name: 'Experto', minScore: 600, color: '#10b981' },
    { level: 5, name: 'Maestro', minScore: 1000, color: '#f59e0b' },
    { level: 6, name: 'Genio', minScore: 1500, color: '#ef4444' },
    { level: 7, name: 'Leyenda', minScore: 2500, color: '#8b5cf6' },
  ],

  achievements: [
    {
      id: 'first_quiz',
      name: 'Primer Paso',
      description: 'Completa tu primer quiz',
      icon: '🎯',
      condition: 'quizzes_completed >= 1',
    },
    {
      id: 'perfect_score',
      name: 'Perfección',
      description: 'Obtén una puntuación perfecta',
      icon: '⭐',
      condition: 'perfect_scores >= 1',
    },
    {
      id: 'speed_demon',
      name: 'Demonio de Velocidad',
      description: 'Completa un quiz en menos de 5 minutos',
      icon: '⚡',
      condition: 'fastest_quiz_time <= 300',
    },
    {
      id: 'streak_master',
      name: 'Maestro de Rachas',
      description: 'Mantén una racha de 7 días',
      icon: '🔥',
      condition: 'longest_streak >= 7',
    },
  ],
} as const;

// ===== HELPERS PARA TEXTOS =====
export const formatText = {
  question: (current: number, total: number) =>
    APP_TEXTS.quiz.question
      .replace('{current}', current.toString())
      .replace('{total}', total.toString()),

  score: (score: number) => APP_TEXTS.results.score.replace('{score}', score.toString()),

  correctAnswers: (correct: number, total: number) =>
    APP_TEXTS.results.correctAnswers
      .replace('{correct}', correct.toString())
      .replace('{total}', total.toString()),

  timeSpent: (time: string) => APP_TEXTS.results.timeSpent.replace('{time}', time),
};
