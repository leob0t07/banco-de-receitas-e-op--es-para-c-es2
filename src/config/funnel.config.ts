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
  name: "Plano de Alimentação Personalizada",
  subtitle: "Programa de Nutrição & Variedade Sob Medida",
  price: "R$ 9,99",
  priceNumeric: 9.99,
  oldPrice: "R$ 211,00",
  checkoutUrl: "https://pay.cakto.com.br/324h63n_1149945",
  cta: "DESTRAVAR O PLANO + BÔNUS AGORA",
  description: "Kit completo de alimentação sob medida com fichas de cozinha de 3 a 5 minutos, guia de porções em colheres/xícaras, lista de supermercado e 2 bônus exclusivos."
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
    key: "dogGender",
    title: "Seu cão é Macho ou Fêmea?",
    subtext: "Queremos personalizar a forma de nos referirmos ao seu parceiro(a).",
    type: "single",
    options: [
      {
        value: "macho",
        label: "Macho",
        icon: "♂️",
        description: "Ele é um menino"
      },
      {
        value: "femea",
        label: "Fêmea",
        icon: "♀️",
        description: "Ela é uma menina"
      }
    ]
  },
  {
    id: 2,
    key: "dogName",
    title: "Como seu parceiro(a) se chama?",
    subtext: "Digite o nome para personalizarmos cada recomendação.",
    type: "text",
    placeholder: "Ex: Thor, Mel, Bob...",
    buttonText: "Avançar"
  },
  {
    id: 3,
    key: "lifeStage",
    title: "Qual é a fase da vida d${artigo} ${NOME}?",
    subtext: "Isso ajuda a selecionar os nutrientes e texturas ideais.",
    type: "single",
    options: [
      {
        value: "filhote",
        label: "Filhote",
        icon: "🐶",
        description: "Até 12 meses"
      },
      {
        value: "adulto",
        label: "Adulto",
        icon: "🐕",
        description: "1 a 7 anos"
      },
      {
        value: "senior",
        label: "Sênior",
        icon: "🐕🦺",
        description: "7+ anos"
      },
      {
        value: "indefinido",
        label: "Não tenho certeza",
        icon: "❓",
        description: "Idade aproximada ou resgatado"
      }
    ]
  },
  {
    id: 4,
    key: "dogSize",
    title: "Qual é o porte d${artigo} ${NOME}?",
    subtext: "O porte influencia diretamente as porções diárias e a textura ideal.",
    type: "single",
    options: [
      {
        value: "pequeno",
        label: "Pequeno",
        icon: "🦴",
        description: "Até 10 kg"
      },
      {
        value: "medio",
        label: "Médio",
        icon: "🥩",
        description: "10 kg a 25 kg"
      },
      {
        value: "grande",
        label: "Grande",
        icon: "🥣",
        description: "Acima de 25 kg"
      }
    ]
  },
  {
    id: 5,
    key: "dogBreed",
    title: "Qual é a raça d${artigo} ${NOME}?",
    subtext: "Digite para buscar ou selecione uma opção direta abaixo.",
    type: "breed",
    buttonText: "Continuar"
  },
  {
    id: 7,
    key: "activityLevel",
    title: "Como é a rotina e o nível de energia d${artigo}${NOME}?",
    subtext: "Isso define a necessidade calórica e o tipo de estímulo recomendado.",
    type: "single",
    microcopy: "Agora conseguimos entender melhor a rotina [DELE_DELA].",
    options: [
      {
        value: "tranquilo",
        label: "😴 Tranquilo(a)",
        description: "Passa a maior parte do tempo descansando"
      },
      {
        value: "ativo",
        label: "🐕 Ativo(a)",
        description: "Passeia diariamente e gosta de brincar"
      },
      {
        value: "muito_ativo",
        label: "⚡ Muito ativo(a)",
        description: "Inquieto(a) e com muita energia"
      },
      {
        value: "varia",
        label: "🔄 Varia bastante conforme o dia",
        description: "Dias calmos alternados com momentos intensos"
      }
    ]
  },
  {
    id: 8,
    key: "feedingType",
    title: "O que ${artigo}${NOME} come atualmente no dia a dia?",
    subtext: "A base atual nos ajuda a sugerir uma transição segura e sem estresse gástrico.",
    type: "single",
    options: [
      {
        value: "racao",
        label: "🥣 Apenas ração seca",
        description: "Dieta exclusivamente baseada em ração comercial"
      },
      {
        value: "mista",
        label: "🥗 Ração + misturas",
        description: "Mistura com sachês ou comida"
      },
      {
        value: "caseira",
        label: "🍲 Comida caseira repetida",
        description: "Preparações caseiras simples repetidas no dia a dia"
      },
      {
        value: "natural",
        label: "🥩 Alimentação Natural (AN) formulada",
        description: "Dieta natural crua ou cozida balanceada"
      },
      {
        value: "outra",
        label: "❓ Outra opção",
        description: "Outro formato ou transição em andamento"
      }
    ]
  },
  {
    id: 9,
    key: "symptoms",
    title: "Você já notou algum desses sinais n${artigo}${NOME} ultimamente?",
    subtext: "Selecione todos que se aplicam.",
    type: "multiple",
    buttonText: "CONTINUAR →",
    options: [
      {
        value: "apetite_seletivo",
        label: "🤢 Cheira a comida e vira o rosto / Demora para comer (Apetite Seletivo)",
        description: "Falta de interesse pela tigela ou recusa alimentar"
      },
      {
        value: "coceira_patas",
        label: "🐾 Lambe as patas com frequência ou se coça bastante (Inflamação/Pele)",
        description: "Sinal comum de hipersensibilidade ou inflamação alimentar"
      },
      {
        value: "fezes_moles",
        label: "💩 Fezes moles, pastosas ou com odor muito forte (Digestão/Flora)",
        description: "Dificuldade na digestão ou flora intestinal desequilibrada"
      },
      {
        value: "queda_pelo",
        label: "🦮 Pelo sem brilho, opaco ou caindo em excesso (Carência Nutricional)",
        description: "Carência de ácidos graxos essenciais e hidratação"
      },
      {
        value: "nenhum_prevencao",
        label: "✨ Nenhum — Quero apenas prevenir e garantir longevidade",
        description: "Foco total em manter a saúde, imunidade e longevidade em dia"
      }
    ]
  },
  {
    id: 10,
    key: "costOfInaction",
    title: "Quanto você costuma gastar tentando agradar ou cuidar d${artigo}${NOME} quando algo não vai bem?",
    subtext: "Compreender os gastos recorrentes ajuda a dimensionar o valor da prevenção.",
    type: "single",
    options: [
      {
        value: "saches_petiscos",
        label: "💸 Gastos frequentes com sachês e petiscos industriais",
        description: "Opções caras de supermercado que ${pronome} logo enjoa"
      },
      {
        value: "consultas_remedios",
        label: "🏥 Consultas e remédios para alergias ou digestão",
        description: "Gastos com exames, pomadas e medicamentos para coceiras ou fezes moles"
      },
      {
        value: "horas_internet",
        label: "⏳ Perco horas procurando o que dar na internet",
        description: "Dúvidas constantes sobre segurança e medo de intoxicar"
      },
      {
        value: "prevencao_gastos",
        label: "🛡️ Quero evitar todos esses gastos prevenindo a saúde d${pronome} desde já",
        description: "Prevenção diária com alimentos reais e baratos"
      }
    ]
  },
  {
    id: 11,
    key: "availableTime",
    title: "Quanto tempo você tem disponível na sua rotina para aplicar o Plano Personalizado d${artigo}${NOME}?",
    subtext: "O plano se adapta à sua disponibilidade real de tempo.",
    type: "single",
    options: [
      {
        value: "menos_5min",
        label: "⚡ Menos de 5 minutos por dia",
        description: "Toppers, caldos e misturas ultrarrápidas de adicionar na tigela"
      },
      {
        value: "5_10min",
        label: "⏱️ 5 a 10 minutos por dia",
        description: "Preparos práticos rápidos e agrados funcionais do dia a dia"
      },
      {
        value: "semanal_congelar",
        label: "📅 1 vez por semana",
        description: "Preparo prático em lote no fim de semana para congelar porções"
      }
    ]
  },
  {
    id: 12,
    key: "mainPriority",
    title: "Se você pudesse destravar HOJE a nutrição ideal d${artigo}${NOME}, qual seria a sua maior prioridade?",
    subtext: "Essa será a meta central do seu Plano de Nutrição Sob Medida.",
    type: "single",
    options: [
      {
        value: "devorar_prato",
        label: "😍 Ver ${pronome} devorar o prato em segundos",
        description: "Esbanjando alegria e prazer natural ao comer"
      },
      {
        value: "eliminar_sintomas",
        label: "🌿 Eliminar de vez coceiras, lambeduras e fezes moles",
        description: "Usando a força anti-inflamatória de ingredientes naturais e seguros"
      },
      {
        value: "longevidade",
        label: "⏳ Garantir que ${pronome} viva ao meu lado pelo maior tempo possível",
        description: "Mais anos de vida com disposição, articulações fortes e saúde plena"
      },
      {
        value: "todas_anteriores",
        label: "🔥 Todas as anteriores — Quero a máxima qualidade de vida para ${artigo}${NOME}",
        description: "Nutrição completa, apetite voraz e longevidade máxima"
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
