// Configurações Centrais do Funil Comercial
// Todas as opções de produto, preço, bumps, garantia e copy do quiz estão centralizadas aqui.

export interface ProductConfig {
  name: string;
  subtitle: string;
  price: string;
  priceNumeric: number;
  oldPrice: string;
  checkoutUrl: string; // Se preenchido, redireciona para plataforma externa (Hotmart, Kiwify, Eduzz, etc.)
  cta: string;
  description: string;
}

export interface GuaranteeConfig {
  enabled: boolean;
  days: number;
  title: string;
  description: string;
}

export interface BumpItem {
  id: string;
  enabled: boolean;
  name: string;
  tag: string;
  description: string;
  price: string;
  priceNumeric: number;
  checkoutParameter: string;
}

export interface TestimonialItem {
  name: string;
  dogName: string;
  dogBreed?: string;
  text: string;
  avatarUrl?: string;
}

export const PRODUCT_CONFIG: ProductConfig = {
  name: "4 Patas - Receitas e Opções para Cães",
  subtitle: "Uma biblioteca organizada de receitas, petiscos e opções para o dia a dia",
  price: "R$ 9,99",
  priceNumeric: 9.99,
  oldPrice: "R$ 97,00",
  checkoutUrl: "https://pay.cakto.com.br/324h63n_1149945",
  cta: "Quero acessar o 4 Patas",
  description: "Biblioteca digital com dezenas de receitas práticas, opções de petiscos caseiros e ideias organizadas para variar a alimentação do seu cão com segurança e praticidade."
};

export const GUARANTEE_CONFIG: GuaranteeConfig = {
  enabled: true,
  days: 7,
  title: "Garantia incondicional de 7 dias",
  description: "Acesse todo o acervo do 4 Patas, navegue pelas categorias e confira as receitas no seu ritmo. Se achar que o material não facilitou a sua rotina ou não atendeu às suas expectativas, basta nos enviar um e-mail para receber 100% do seu dinheiro de volta."
};

export const BUMP_CONFIG: BumpItem[] = [
  {
    id: "bump_alimentos_permitidos",
    enabled: true,
    name: "Guia Rápido: Alimentos Permitidos e Proibidos",
    tag: "Oferta especial de checkout",
    description: "Tabela de bolso para consulta imediata sobre quais frutas, legumes e alimentos comuns são seguros ou tóxicos para cães.",
    price: "R$ 19,90",
    priceNumeric: 19.90,
    checkoutParameter: "bump_seguranca"
  },
  {
    id: "bump_picoles_refrescantes",
    enabled: true,
    name: "Coleção de Petiscos Refrescantes & Picolés Caninos",
    tag: "Mais pedido",
    description: "15 receitas fáceis de picolés e agrados gelados com ingredientes simples, ideais para dias quentes e enriquecimento ambiental.",
    price: "R$ 17,90",
    priceNumeric: 17.90,
    checkoutParameter: "bump_gelados"
  },
  {
    id: "bump_planner_semanal",
    enabled: true,
    name: "Planner Imprimível de Rotina & Congelamento",
    tag: "Organização prática",
    description: "Folhas práticas para planejar as porções da semana, etiquetas de potes e controle de validade no freezer.",
    price: "R$ 14,90",
    priceNumeric: 14.90,
    checkoutParameter: "bump_planner"
  }
];

// Per Seção 42 & 43: Se não houver depoimentos reais auditados, a seção não deve exibir provas sociais fictícias.
export const TESTIMONIALS_CONFIG: TestimonialItem[] = [
  // Deixe vazio ou preencha exclusivamente com relatos autorizados por clientes reais
];

export interface QuizQuestionOption {
  value: string;
  label: string;
  description?: string;
  icon?: string;
}

export interface QuizQuestionConfig {
  id: number;
  key: string;
  title: string;
  subtext?: string;
  type: "text" | "breed" | "single" | "multiple";
  placeholder?: string;
  buttonText?: string;
  microcopy?: string;
  options?: QuizQuestionOption[];
}

export const QUIZ_CONFIG: QuizQuestionConfig[] = [
  {
    id: 1,
    key: "dogName",
    title: "Como ele se chama?",
    subtext: "Digite o nome do seu cachorro",
    type: "text",
    placeholder: "Ex.: Thor",
    buttonText: "Continuar"
  },
  {
    id: 2,
    key: "dogBreed",
    title: "Qual é a raça do [NOME]?",
    subtext: "Digite para buscar ou selecione uma opção direta.",
    type: "breed",
    buttonText: "Continuar"
  },
  {
    id: 3,
    key: "dogSize",
    title: "Qual é o porte do [NOME]?",
    type: "single",
    microcopy: "Mais uma informação sobre o [NOME].",
    options: [
      {
        value: "pequeno",
        label: "Pequeno",
        description: "Até aproximadamente 10 kg"
      },
      {
        value: "medio",
        label: "Médio",
        description: "Entre aproximadamente 10 e 25 kg"
      },
      {
        value: "grande",
        label: "Grande",
        description: "Acima de aproximadamente 25 kg"
      }
    ]
  },
  {
    id: 4,
    key: "lifeStage",
    title: "Em qual fase da vida [ELE_ELA] está?",
    type: "single",
    options: [
      {
        value: "filhote",
        label: "Filhote",
        description: "Em fase de desenvolvimento e muita energia"
      },
      {
        value: "adulto",
        label: "Adulto",
        description: "Fase de manutenção e rotina estabilizada"
      },
      {
        value: "senior",
        label: "Sênior",
        description: "Ritmo mais calmo e cuidados específicos"
      },
      {
        value: "indefinido",
        label: "Não tenho certeza",
        description: "Idade aproximada ou resgatado"
      }
    ]
  },
  {
    id: 5,
    key: "dogGender",
    title: "O [NOME] é macho ou fêmea?",
    subtext: "Queremos personalizar a forma de nos referirmos a [ELE_ELA].",
    type: "single",
    options: [
      {
        value: "macho",
        label: "Macho",
        description: "Ele é um menino"
      },
      {
        value: "femea",
        label: "Fêmea",
        description: "Ela é uma menina"
      }
    ]
  },
  {
    id: 6,
    key: "activityLevel",
    title: "Como é a rotina [DELE_DELA]?",
    type: "single",
    microcopy: "Agora conseguimos entender melhor a rotina [DELE_DELA].",
    options: [
      {
        value: "tranquilo",
        label: "Mais tranquilo",
        description: "Passa boa parte do dia descansando"
      },
      {
        value: "ativo",
        label: "Ativo",
        description: "Gosta de passear e brincar"
      },
      {
        value: "muito_ativo",
        label: "Muito ativo",
        description: "Está sempre correndo, brincando ou se movimentando"
      },
      {
        value: "varia",
        label: "Varia bastante",
        description: "Dias calmos alternados com momentos intensos"
      }
    ]
  },
  {
    id: 7,
    key: "feedingType",
    title: "O que [ELE_ELA] come atualmente?",
    type: "single",
    options: [
      {
        value: "racao",
        label: "Ração",
        description: "Dieta baseada em ração seca ou úmida"
      },
      {
        value: "mista",
        label: "Ração + comida caseira",
        description: "Mistura com complementos preparados em casa"
      },
      {
        value: "caseira",
        label: "Principalmente comida caseira",
        description: "Preparações cozidas do dia a dia"
      },
      {
        value: "natural",
        label: "Alimentação natural",
        description: "Alimentos naturais balanceados"
      },
      {
        value: "outra",
        label: "Outra opção",
        description: "Outros formatos de alimentação"
      }
    ]
  },
  {
    id: 8,
    key: "mainGoal",
    title: "O que você mais gostaria de melhorar na alimentação [DELE_DELA]?",
    subtext: "Essa resposta define o foco principal do seu acervo.",
    type: "single",
    microcopy: "Estamos quase lá. Seu resultado está ficando mais específico.",
    options: [
      {
        value: "variedade",
        label: "Ter mais opções para variar",
        description: "Evitar a mesmice e trazer novos sabores seguros"
      },
      {
        value: "receitas",
        label: "Preparar receitas caseiras",
        description: "Aprender pratos e misturas fáceis de fazer"
      },
      {
        value: "petiscos",
        label: "Ter opções de petiscos e agrados",
        description: "Biscoitos, recompensas e agrados saudáveis"
      },
      {
        value: "organizar",
        label: "Organizar melhor a alimentação",
        description: "Ter um método claro sem perda de tempo"
      },
      {
        value: "praticidade",
        label: "Encontrar opções práticas para a rotina",
        description: "Preparo rápido com ingredientes acessíveis"
      }
    ]
  },
  {
    id: 9,
    key: "painPoints",
    title: "Qual dessas situações mais parece com você?",
    subtext: "Você pode marcar mais de uma opção.",
    type: "multiple",
    buttonText: "Ver meu resultado",
    options: [
      {
        value: "sem_ideias",
        label: "Fico sem ideias do que preparar"
      },
      {
        value: "mesmas_coisas",
        label: "Acabo oferecendo sempre as mesmas coisas"
      },
      {
        value: "perde_tempo",
        label: "Perco muito tempo procurando receitas"
      },
      {
        value: "desorganizado",
        label: "Tenho dificuldade para encontrar opções organizadas"
      },
      {
        value: "quer_variar",
        label: "Gostaria de variar mais a alimentação"
      },
      {
        value: "opcoes_prontas",
        label: "Quero ter opções prontas para consultar quando precisar"
      }
    ]
  }
];

export interface ResultProfileDetails {
  id: string;
  title: string;
  tagline: string;
  summary: string;
  focusText: string;
  categories: {
    title: string;
    description: string;
    iconName: string;
  }[];
}

export const RESULT_PROFILES: Record<string, ResultProfileDetails> = {
  variedade: {
    id: "variedade",
    title: "Variedade na rotina",
    tagline: "Novas opções e combinações para sair da mesmice sem complicação",
    summary: "Seu foco principal é ter mais variedade na rotina do cão. Isso significa que o mais interessante para você é ter diferentes opções organizadas para consultar quando quiser, sem precisar começar uma nova pesquisa toda vez.",
    focusText: "Para quem quer alternar sabores e texturas no dia a dia com opções seguras e práticas de encontrar.",
    categories: [
      {
        title: "Opções para variar a tigela",
        description: "Combinações simples de vegetais, caldos nutritivos e complementos para enriquecer a comida habitual.",
        iconName: "Carrot"
      },
      {
        title: "Receitas caseiras completas",
        description: "Preparações acolhedoras com ingredientes simples que você encontra em qualquer supermercado ou feira.",
        iconName: "Utensils"
      },
      {
        title: "Petiscos e agrados naturais",
        description: "Biscoitos e petiscos crocantes para recompensar no adestramento ou momentos de carinho.",
        iconName: "Bone"
      },
      {
        title: "Ideias rápidas de montagem",
        description: "Sugestões de preparo em menos de 10 minutos para quem tem o dia a dia corrido.",
        iconName: "Zap"
      }
    ]
  },
  receitas: {
    id: "receitas",
    title: "Receitas e preparos",
    tagline: "Preparações simples, nutritivas e fáceis de fazer em casa",
    summary: "Seu foco principal é preparar receitas caseiras de verdade. O mais útil para você é ter fichas claras com medidas, lista de ingredientes acessíveis e o passo a passo exato do cozimento.",
    focusText: "Para quem gosta de colocar a mão na massa e preparar alimentos frescos com carinho para o cachorro.",
    categories: [
      {
        title: "Pratos caseiros principais",
        description: "Receitas cozidas balanceando proteínas magras, carboidratos seguros e legumes selecionados.",
        iconName: "Utensils"
      },
      {
        title: "Caldos e enriquecedores",
        description: "Caldos de ossos e legumes cozidos lentamente para hidratação e aroma irresistível.",
        iconName: "Soup"
      },
      {
        title: "Petiscos artesanais",
        description: "Opções assadas para armazenar em potes e servir ao longo da semana.",
        iconName: "Bone"
      },
      {
        title: "Guia de congelamento e porções",
        description: "Como guardar porções individuais no freezer para otimizar o tempo na cozinha.",
        iconName: "Package"
      }
    ]
  },
  petiscos: {
    id: "petiscos",
    title: "Petiscos e agrados",
    tagline: "Recompensas saudáveis, seguras e muito mais econômicas",
    summary: "Seu foco principal é encontrar petiscos e agrados saudáveis. O acervo permite substituir produtos ultraprocessados cheios de corantes por petiscos caseiros fáceis e crocantes.",
    focusText: "Para quem busca recompensas deliciosas para treinos, passeios ou para demonstrar afeto no cotidiano.",
    categories: [
      {
        title: "Biscoitos assados e crocantes",
        description: "Opções fáceis de aveia, abóbora, cenoura e maçã que duram até 2 semanas em pote fechado.",
        iconName: "Bone"
      },
      {
        title: "Petiscos macios para adestramento",
        description: "Pedaços pequenos e rápidos de mastigar ideais para recompensar comandos.",
        iconName: "Award"
      },
      {
        title: "Agrados funcionais de mastigação",
        description: "Ideias que ocupam e entretêm o cão enquanto limpam os dentes naturalmente.",
        iconName: "Smile"
      },
      {
        title: "Petiscos gelados e picolés",
        description: "Agrados refrescantes feitos com frutas e iogurte natural para dias quentes.",
        iconName: "Sun"
      }
    ]
  },
  praticidade: {
    id: "praticidade",
    title: "Praticidade",
    tagline: "Soluções rápidas para quem não quer perder tempo na cozinha",
    summary: "Seu foco principal é facilitar a rotina e economizar tempo. Você não quer passar horas cozinhando ou navegando na internet: precisa de opções diretas ao ponto, com ingredientes simples.",
    focusText: "Para quem tem uma rotina corrida e quer opções diretas e eficientes para alimentar bem o cachorro.",
    categories: [
      {
        title: "Preparos de até 15 minutos",
        description: "Receitas expressas com poucos ingredientes para quando o tempo estiver apertado.",
        iconName: "Zap"
      },
      {
        title: "Opções práticas de congelamento",
        description: "Cozinhe uma vez a cada 15 dias e tenha tudo pronto em porções individuais.",
        iconName: "Clock"
      },
      {
        title: "Complementos rápidos para a ração",
        description: "Como enriquecer a tigela em menos de 2 minutos usando itens que você já tem na geladeira.",
        iconName: "Sparkles"
      },
      {
        title: "Petiscos de 3 ingredientes",
        description: "Apenas misturar e levar ao forno ou forno elétrico sem sujeira.",
        iconName: "CheckCircle"
      }
    ]
  }
};
