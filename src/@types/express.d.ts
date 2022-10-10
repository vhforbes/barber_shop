// Adiciona novos tipos a uma biblioteca existente

declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
