# AL Chef 🧑‍🍳

An AI-powered recipe generator that creates personalized recipes based on your preferences and available ingredients.

## Features

- Generate custom recipes using AI
- Save favorite recipes locally
- Browse recipe history
- Responsive mobile-first design
- iOS-style UI components

### Usage

- Enter your desired recipe requirements or ingredients
- Click "Generate Recipe" to create a custom recipe
- Save interesting recipes for later reference
- Browse your saved recipes in the recipe list

## Tech Stack

- Angular 17+
- OpenAI API (GPT-3.5 Turbo)
- TypeScript
- SCSS
- LocalStorage for data persistence

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/al-chef.git
cd al-chef
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

- Create a environments.ts file in /environments dir
- Add your OpenAI API key:

```typescript
export const environment = {
  production: false,
  openaiApiKey: "KEY_HERE",
};
```

### Development

```bash
npm run start
```

### Building for production

```bash
ng build --configuration production
```
