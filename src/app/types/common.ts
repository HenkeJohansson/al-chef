export type TRecipe = {
  id?: string;
  name: string;
  ingredients: string[];
  steps: string[];
};

export type TOpenAIResponse = {
  title: string;
  ingredients: string[];
  instructions: string[];
};
