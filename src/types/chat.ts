export interface ChatMessage {
  id: string;
  type: "bot" | "user";
  content: string;
  timestamp: Date;
  quickReplies?: QuickReply[];
  diagnosis?: Diagnosis;
  nextSteps?: NextSteps;
}

export interface QuickReply {
  id: string;
  text: string;
  value: string;
}

export interface Diagnosis {
  stage: string;
  potential: string;
  specificInsights: string;
  recommendations: string[];
}

export interface NextSteps {
  message: string;
  options: string[];
  urgency: string;
}

export type ConversationStage =
  | "welcome"
  | "qualification"
  | "marketplace"
  | "products"
  | "diagnosis"
  | "result"
  | "final";

export interface UserProfile {
  companySize?: string;
  operationType?: string;
  marketplaceExperience?: string;
  productType?: string;
  concerns?: string[];
}

export interface ConversationState {
  stage: ConversationStage;
  messages: ChatMessage[];
  userProfile: UserProfile;
  isTyping: boolean;
}

export interface ConversationResponse {
  message: string;
  quickReplies?: QuickReply[];
  nextStage?: ConversationStage;
  diagnosis?: Diagnosis;
  nextSteps?: NextSteps;
}
