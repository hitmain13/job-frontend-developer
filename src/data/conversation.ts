import type {
  ConversationResponse,
  ConversationStage,
  UserProfile,
} from "../types/chat";

export const getWelcomeMessage = (): ConversationResponse => ({
  message:
    "Olá! Sou Roberto, especialista em marketplaces para empresas consolidadas. Vejo que você dirige uma operação sólida - vamos descobrir como ampliar seus canais digitais sem conflitar com sua rede atual?",
  quickReplies: [
    { id: "1", text: "Sim, quero entender melhor", value: "interested" },
    { id: "2", text: "Tenho algumas dúvidas", value: "concerns" },
    { id: "3", text: "Nunca consideramos isso", value: "new_to_topic" },
  ],
  nextStage: "qualification",
});

export const getQualificationQuestions = (
  response: string,
): ConversationResponse => {
  const responses: Record<string, ConversationResponse> = {
    interested: {
      message:
        "Perfeito! Para oferecer o melhor direcionamento, me conta: qual o faturamento anual aproximado da empresa e há quanto tempo estão no mercado?",
      quickReplies: [
        { id: "1", text: "R$ 10-30mi, 10-20 anos", value: "medium_company" },
        { id: "2", text: "R$ 30-100mi, 20+ anos", value: "large_company" },
        { id: "3", text: "R$ 100mi+, 30+ anos", value: "enterprise" },
      ],
      nextStage: "marketplace",
    },
    concerns: {
      message:
        "Entendo perfeitamente. As principais preocupações que ouço são sobre canibalização de canais e conflito com distribuidores. É isso que te preocupa também?",
      quickReplies: [
        {
          id: "1",
          text: "Sim, principalmente isso",
          value: "channel_conflict",
        },
        {
          id: "2",
          text: "Também a complexidade operacional",
          value: "operational_complexity",
        },
        {
          id: "3",
          text: "ROI e investimento necessário",
          value: "roi_concerns",
        },
      ],
      nextStage: "marketplace",
    },
    new_to_topic: {
      message:
        "Sem problema! Muitas empresas consolidadas descobrem que marketplaces podem ser um canal complementar poderoso. Vocês vendem principalmente através de que canais hoje?",
      quickReplies: [
        { id: "1", text: "Distribuidores e revendas", value: "b2b_channels" },
        { id: "2", text: "Varejo físico próprio", value: "retail_own" },
        { id: "3", text: "Mistura de canais B2B/B2C", value: "mixed_channels" },
      ],
      nextStage: "marketplace",
    },
  };

  return responses[response] || responses.interested;
};

export const getMarketplaceQuestions = (
  profile: UserProfile,
  response: string,
): ConversationResponse => {
  // Update profile based on previous responses
  const updatedProfile = { ...profile };

  if (["medium_company", "large_company", "enterprise"].includes(response)) {
    updatedProfile.companySize = response;
  }

  const responses: Record<string, ConversationResponse> = {
    enterprise: {
      message:
        "Excelente! Empresas do seu porte têm uma vantagem única. Já consideraram marketplaces como Mercado Livre, Amazon, ou B2W? Qual a principal barreira que veem?",
      quickReplies: [
        {
          id: "1",
          text: "Conflito com distribuidores",
          value: "distributor_conflict",
        },
        {
          id: "2",
          text: "Falta de conhecimento técnico",
          value: "technical_knowledge",
        },
        {
          id: "3",
          text: "Preocupação com marca/posicionamento",
          value: "brand_concerns",
        },
      ],
      nextStage: "products",
    },
    channel_conflict: {
      message:
        "Essa é a questão mais comum! A boa notícia: 87% das empresas que atendemos mantiveram seus canais tradicionais intactos. O segredo está na estratégia de segmentação. Que tipo de produtos vocês fabricam?",
      quickReplies: [
        { id: "1", text: "Bens de consumo/FMCG", value: "consumer_goods" },
        { id: "2", text: "Produtos industriais/B2B", value: "industrial" },
        { id: "3", text: "Casa e construção", value: "home_construction" },
      ],
      nextStage: "products",
    },
    b2b_channels: {
      message:
        "Canal tradicional sólido! O marketplace pode ser complementar, focando no consumidor final sem impactar seus distribuidores. Quantos SKUs aproximadamente vocês têm?",
      quickReplies: [
        { id: "1", text: "Até 100 SKUs", value: "small_catalog" },
        { id: "2", text: "100-500 SKUs", value: "medium_catalog" },
        { id: "3", text: "500+ SKUs", value: "large_catalog" },
      ],
      nextStage: "products",
    },
  };

  return (
    responses[response] || {
      message:
        "Entendi seu contexto. Para te dar o melhor direcionamento, que tipo de produtos sua empresa trabalha?",
      quickReplies: [
        { id: "1", text: "Bens de consumo", value: "consumer_goods" },
        { id: "2", text: "Produtos industriais", value: "industrial" },
        { id: "3", text: "Casa e construção", value: "home_construction" },
      ],
      nextStage: "products",
    }
  );
};

export const getProductQuestions = (
  profile: UserProfile,
  response: string,
): ConversationResponse => {
  const updatedProfile = { ...profile };
  updatedProfile.productType = response;

  return {
    message:
      "Perfeito! Agora vou fazer um diagnóstico da maturidade digital de vocês. Qual o percentual atual de vendas online da empresa?",
    quickReplies: [
      { id: "1", text: "0% - Só offline", value: "zero_digital" },
      { id: "2", text: "1-5% - Iniciando", value: "starting_digital" },
      { id: "3", text: "5-15% - Crescendo", value: "growing_digital" },
    ],
    nextStage: "diagnosis",
  };
};

export const getDiagnosisQuestions = (): ConversationResponse => {
  return {
    message:
      "Última pergunta para o diagnóstico: qual o maior desafio que vocês enfrentariam para entrar em marketplaces?",
    quickReplies: [
      { id: "1", text: "Falta de time especializado", value: "team_expertise" },
      { id: "2", text: "Gestão de estoque/logística", value: "logistics" },
      {
        id: "3",
        text: "Estratégia de precificação",
        value: "pricing_strategy",
      },
    ],
    nextStage: "result",
  };
};

export const getFinalDiagnosis = (
  profile: UserProfile,
): ConversationResponse => {
  const companySize = profile.companySize || "enterprise";

  let potentialRevenue = "R$ 10-30mi";
  let stage = "Gigante Adormecido Digital";

  if (companySize === "enterprise") {
    potentialRevenue = "R$ 20-50mi";
    stage = "Líder Tradicional com Potencial Digital Explosivo";
  } else if (companySize === "large_company") {
    potentialRevenue = "R$ 15-35mi";
    stage = "Empresa Consolidada Pronta para Expansão Digital";
  }

  return {
    message: `${profile.companySize === "enterprise" ? "Roberto" : "Perfeito"}, conversando com você fica claro uma coisa: vocês estão numa posição PRIVILEGIADA. Têm produto consolidado, operação estruturada, marca respeitada - só falta usar isso no digital. Empresas do porte de vocês que entraram nos marketplaces cresceram 40-60% sem canibalizarizar os canais tradicionais.`,
    diagnosis: {
      stage,
      potential: `Potencial de ${potentialRevenue} adicionais em 18 meses via marketplaces`,
      specificInsights: `Indústrias com faturamento similar à de vocês criaram novos canais de receita representando 15-25% do faturamento total`,
      recommendations: [
        "Estratégia de canal complementar (não concorrente)",
        "Pricing diferenciado para não conflitar com distribuidores",
        "Teste controlado em marketplace premium primeiro",
        "Estrutura dedicada para e-commerce (não impacta operação atual)",
      ],
    },
    nextSteps: {
      message:
        "Que tal uma conversa estratégica com nosso especialista em grandes contas? Ele já ajudou indústrias similares a criar canais digitais de R$ 20-50mi sem nenhum conflito. Posso agendar?",
      options: [
        "Sim, quero conversa estratégica",
        "Manda um case similar primeiro",
      ],
      urgency:
        "Seus concorrentes já estão se movimentando - quem sair na frente vai dominar o digital no seu segmento",
    },
    nextStage: "final",
  };
};

export const getFinalDoladoMessage = (): ConversationResponse => ({
  message:
    "Antes de finalizarmos, quero que conheça a Dolado - somos especialistas em ajudar empresas consolidadas como a sua a expandir para marketplaces de forma estratégica e sem conflitos. Já acompanhamos mais de 200 empresas nessa jornada, criando canais digitais de milhões sem canibalizarizar operações tradicionais. Que tal descobrir como podemos acelerar seus resultados digitais?",
  quickReplies: [
    { id: "1", text: "Quero conhecer a Dolado", value: "know_dolado" },
    { id: "2", text: "Enviar diagnóstico por email", value: "send_email" },
    { id: "3", text: "Finalizar conversa", value: "finish" },
  ],
});

export const processUserResponse = (
  stage: ConversationStage,
  userResponse: string,
  profile: UserProfile,
): ConversationResponse => {
  switch (stage) {
    case "welcome":
      return getQualificationQuestions(userResponse);
    case "qualification":
      return getMarketplaceQuestions(profile, userResponse);
    case "marketplace":
      return getProductQuestions(profile, userResponse);
    case "products":
      return getDiagnosisQuestions();
    case "diagnosis":
      return getFinalDiagnosis(profile);
    case "result":
      return getFinalDoladoMessage();
    default:
      return getWelcomeMessage();
  }
};
