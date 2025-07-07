import type { ConversationResponse } from "../types/chat";

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
