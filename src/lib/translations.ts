export type Language = 'pt' | 'en' | 'es';

export const translations = {
  pt: {
    welcome: {
      tagline: 'GlowUpZ – Seu estilo, sua vibe.',
      start: 'Começar'
    },
    login: {
      title: 'Entrar',
      email: 'E-mail',
      password: 'Senha',
      forgotPassword: 'Esqueci minha senha',
      login: 'Entrar',
      noAccount: 'Não tem conta?',
      createAccount: 'Criar conta',
      createTitle: 'Criar Conta',
      confirmPassword: 'Confirmar Senha',
      create: 'Criar',
      hasAccount: 'Já tem conta?',
      backToLogin: 'Voltar para login'
    },
    menu: {
      avatar: 'Avatar',
      wardrobe: 'Meu Guarda-Roupa',
      looks: 'Looks Sugeridos',
      subscription: 'Assinatura',
      settings: 'Configurações',
      share: 'Compartilhar'
    },
    avatar: {
      title: 'Personalize seu Avatar',
      gender: 'Sexo',
      male: 'Masculino',
      female: 'Feminino',
      bodyType: 'Tipo de Corpo',
      slim: 'Magro',
      athletic: 'Atlético',
      curvy: 'Curvilíneo',
      plus: 'Plus Size',
      height: 'Altura',
      skinTone: 'Tom de Pele',
      light: 'Claro',
      medium: 'Médio',
      tan: 'Moreno',
      dark: 'Escuro',
      save: 'Salvar Avatar',
      rotate: 'Girar 360°'
    },
    wardrobe: {
      title: 'Meu Guarda-Roupa',
      upload: 'Adicionar Roupa',
      categories: {
        all: 'Todas',
        tops: 'Camisas/Blusas',
        bottoms: 'Calças/Saias',
        dresses: 'Vestidos',
        shoes: 'Sapatos',
        accessories: 'Acessórios'
      },
      uploadTitle: 'Enviar Foto da Roupa',
      selectImage: 'Selecionar Imagem',
      processing: 'Processando...',
      aiAnalyzing: 'IA analisando sua peça...'
    },
    looks: {
      title: 'Looks Sugeridos',
      generate: 'Gerar Novo Look',
      save: 'Salvar Look',
      share: 'Compartilhar',
      occasion: 'Ocasião',
      casual: 'Casual',
      work: 'Trabalho',
      party: 'Festa',
      event: 'Evento',
      weather: 'Clima',
      hot: 'Calor',
      cold: 'Frio',
      rain: 'Chuva',
      phrases: [
        'Ooh honey, esse look tá arrasando! 💅',
        'Perfeito! Você vai virar todas as cabeças! ✨',
        'Essa combinação é puro fogo! 🔥',
        'Amei! Tá muito fashion! 👗',
        'Esse look é tudo e mais um pouco! 💖'
      ]
    },
    subscription: {
      title: 'Escolha seu Plano',
      weekly: 'Semanal',
      monthly: 'Mensal',
      semester: 'Semestral',
      perWeek: '/semana',
      perMonth: '/mês',
      total: 'Total',
      save: 'Economize',
      benefits: 'Benefícios',
      benefit1: 'Looks ilimitados com IA',
      benefit2: 'Avatar animado 3D',
      benefit3: 'Guarda-roupa sem limites',
      benefit4: 'Sugestões personalizadas',
      benefit5: 'Compartilhamento social',
      subscribe: 'Assinar Agora',
      mostPopular: 'Mais Popular'
    },
    settings: {
      title: 'Configurações',
      language: 'Idioma',
      notifications: 'Notificações',
      weeklyLooks: 'Sugestões semanais de looks',
      weatherAlerts: 'Alertas de clima',
      avatarSettings: 'Configurações do Avatar',
      editAvatar: 'Editar Avatar',
      logout: 'Sair'
    },
    share: {
      title: 'Compartilhar GlowUpZ',
      message: 'Descobri o GlowUpZ! O app perfeito para criar looks incríveis! 💅✨',
      copy: 'Copiar Link',
      copied: 'Link copiado!'
    }
  },
  en: {
    welcome: {
      tagline: 'GlowUpZ – Your style, your vibe.',
      start: 'Get Started'
    },
    login: {
      title: 'Sign In',
      email: 'Email',
      password: 'Password',
      forgotPassword: 'Forgot password',
      login: 'Sign In',
      noAccount: "Don't have an account?",
      createAccount: 'Create account',
      createTitle: 'Create Account',
      confirmPassword: 'Confirm Password',
      create: 'Create',
      hasAccount: 'Already have an account?',
      backToLogin: 'Back to login'
    },
    menu: {
      avatar: 'Avatar',
      wardrobe: 'My Wardrobe',
      looks: 'Suggested Looks',
      subscription: 'Subscription',
      settings: 'Settings',
      share: 'Share'
    },
    avatar: {
      title: 'Customize your Avatar',
      gender: 'Gender',
      male: 'Male',
      female: 'Female',
      bodyType: 'Body Type',
      slim: 'Slim',
      athletic: 'Athletic',
      curvy: 'Curvy',
      plus: 'Plus Size',
      height: 'Height',
      skinTone: 'Skin Tone',
      light: 'Light',
      medium: 'Medium',
      tan: 'Tan',
      dark: 'Dark',
      save: 'Save Avatar',
      rotate: 'Rotate 360°'
    },
    wardrobe: {
      title: 'My Wardrobe',
      upload: 'Add Clothing',
      categories: {
        all: 'All',
        tops: 'Tops',
        bottoms: 'Bottoms',
        dresses: 'Dresses',
        shoes: 'Shoes',
        accessories: 'Accessories'
      },
      uploadTitle: 'Upload Clothing Photo',
      selectImage: 'Select Image',
      processing: 'Processing...',
      aiAnalyzing: 'AI analyzing your item...'
    },
    looks: {
      title: 'Suggested Looks',
      generate: 'Generate New Look',
      save: 'Save Look',
      share: 'Share',
      occasion: 'Occasion',
      casual: 'Casual',
      work: 'Work',
      party: 'Party',
      event: 'Event',
      weather: 'Weather',
      hot: 'Hot',
      cold: 'Cold',
      rain: 'Rain',
      phrases: [
        'Ooh honey, that outfit slays! 💅',
        'Perfect! You\'ll turn all heads! ✨',
        'This combo is pure fire! 🔥',
        'Love it! So fashion! 👗',
        'This look is everything! 💖'
      ]
    },
    subscription: {
      title: 'Choose your Plan',
      weekly: 'Weekly',
      monthly: 'Monthly',
      semester: 'Semester',
      perWeek: '/week',
      perMonth: '/month',
      total: 'Total',
      save: 'Save',
      benefits: 'Benefits',
      benefit1: 'Unlimited AI looks',
      benefit2: '3D animated avatar',
      benefit3: 'Unlimited wardrobe',
      benefit4: 'Personalized suggestions',
      benefit5: 'Social sharing',
      subscribe: 'Subscribe Now',
      mostPopular: 'Most Popular'
    },
    settings: {
      title: 'Settings',
      language: 'Language',
      notifications: 'Notifications',
      weeklyLooks: 'Weekly look suggestions',
      weatherAlerts: 'Weather alerts',
      avatarSettings: 'Avatar Settings',
      editAvatar: 'Edit Avatar',
      logout: 'Logout'
    },
    share: {
      title: 'Share GlowUpZ',
      message: 'I discovered GlowUpZ! The perfect app to create amazing looks! 💅✨',
      copy: 'Copy Link',
      copied: 'Link copied!'
    }
  },
  es: {
    welcome: {
      tagline: 'GlowUpZ – Tu estilo, tu vibe.',
      start: 'Comenzar'
    },
    login: {
      title: 'Iniciar Sesión',
      email: 'Correo',
      password: 'Contraseña',
      forgotPassword: 'Olvidé mi contraseña',
      login: 'Entrar',
      noAccount: '¿No tienes cuenta?',
      createAccount: 'Crear cuenta',
      createTitle: 'Crear Cuenta',
      confirmPassword: 'Confirmar Contraseña',
      create: 'Crear',
      hasAccount: '¿Ya tienes cuenta?',
      backToLogin: 'Volver al login'
    },
    menu: {
      avatar: 'Avatar',
      wardrobe: 'Mi Guardarropa',
      looks: 'Looks Sugeridos',
      subscription: 'Suscripción',
      settings: 'Configuración',
      share: 'Compartir'
    },
    avatar: {
      title: 'Personaliza tu Avatar',
      gender: 'Sexo',
      male: 'Masculino',
      female: 'Femenino',
      bodyType: 'Tipo de Cuerpo',
      slim: 'Delgado',
      athletic: 'Atlético',
      curvy: 'Curvilíneo',
      plus: 'Talla Grande',
      height: 'Altura',
      skinTone: 'Tono de Piel',
      light: 'Claro',
      medium: 'Medio',
      tan: 'Moreno',
      dark: 'Oscuro',
      save: 'Guardar Avatar',
      rotate: 'Girar 360°'
    },
    wardrobe: {
      title: 'Mi Guardarropa',
      upload: 'Agregar Ropa',
      categories: {
        all: 'Todas',
        tops: 'Camisas/Blusas',
        bottoms: 'Pantalones/Faldas',
        dresses: 'Vestidos',
        shoes: 'Zapatos',
        accessories: 'Accesorios'
      },
      uploadTitle: 'Subir Foto de Ropa',
      selectImage: 'Seleccionar Imagen',
      processing: 'Procesando...',
      aiAnalyzing: 'IA analizando tu prenda...'
    },
    looks: {
      title: 'Looks Sugeridos',
      generate: 'Generar Nuevo Look',
      save: 'Guardar Look',
      share: 'Compartir',
      occasion: 'Ocasión',
      casual: 'Casual',
      work: 'Trabajo',
      party: 'Fiesta',
      event: 'Evento',
      weather: 'Clima',
      hot: 'Calor',
      cold: 'Frío',
      rain: 'Lluvia',
      phrases: [
        '¡Ooh cariño, este look es increíble! 💅',
        '¡Perfecto! ¡Vas a girar todas las cabezas! ✨',
        '¡Esta combinación es puro fuego! 🔥',
        '¡Me encantó! ¡Muy fashion! 👗',
        '¡Este look es todo y más! 💖'
      ]
    },
    subscription: {
      title: 'Elige tu Plan',
      weekly: 'Semanal',
      monthly: 'Mensual',
      semester: 'Semestral',
      perWeek: '/semana',
      perMonth: '/mes',
      total: 'Total',
      save: 'Ahorra',
      benefits: 'Beneficios',
      benefit1: 'Looks ilimitados con IA',
      benefit2: 'Avatar animado 3D',
      benefit3: 'Guardarropa sin límites',
      benefit4: 'Sugerencias personalizadas',
      benefit5: 'Compartir en redes',
      subscribe: 'Suscribirse Ahora',
      mostPopular: 'Más Popular'
    },
    settings: {
      title: 'Configuración',
      language: 'Idioma',
      notifications: 'Notificaciones',
      weeklyLooks: 'Sugerencias semanales de looks',
      weatherAlerts: 'Alertas de clima',
      avatarSettings: 'Configuración del Avatar',
      editAvatar: 'Editar Avatar',
      logout: 'Salir'
    },
    share: {
      title: 'Compartir GlowUpZ',
      message: '¡Descubrí GlowUpZ! ¡La app perfecta para crear looks increíbles! 💅✨',
      copy: 'Copiar Enlace',
      copied: '¡Enlace copiado!'
    }
  }
};
