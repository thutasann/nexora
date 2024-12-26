# Nexora: Modern Web Development Made Simple

A powerful yet lightweight JavaScript library that simplifies building modern web applications with a focus on performance and developer experience.

- **Component-based:** Build encapsulated, reusable UI components that manage their own state and compose them to create complex user interfaces
- **Declarative:** Design simple views for each state in your application, and Nexora will efficiently update and render the right components when your data changes
- **Simple API:** Get started quickly with an intuitive API that follows modern JavaScript patterns and best practices

## Installation

```bash
npm install nexora
```

## Usage

```tsx
import { Nexora, reactive, render } from 'nexora';
import { Counter } from './components/counter';

function App() {
  return (
    <div>
      <h1>Nexora App</h1>
      <Counter />
    </div>
  );
}

const app = document.getElementById('app');
if (app) render(reactive.renderComponent(App), app);
```
