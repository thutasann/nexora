# Nexora: Modern Web Development Made Simple

A powerful yet lightweight JavaScript library that simplifies building modern web applications with a focus on performance and developer experience.

- **Component-based:** Build encapsulated, reusable UI components that manage their own state and compose them to create complex user interfaces
- **Declarative:** Design simple views for each state in your application, and Nexora will efficiently update and render the right components when your data changes
- **Simple API:** Get started quickly with an intuitive API that follows modern JavaScript patterns and best practices
- **Reactive:** Use reactive state to manage data and automatically update the UI when the state changes
- **Performant Rendering:** Utilizes a virtual DOM to optimize rendering performance and minimize DOM manipulation
- **Router:** A simple and powerful router that allows you to navigate between pages and manage routes in your application

## Installation

```bash
npm install nexora@latest
```

## Usage

### Basic Usage

```tsx
import { Nexora, reactive, render } from 'nexora';
import { Counter } from './components/counter';
import { Header } from './components/header';

function App() {
  return (
    <div>
      <Header />
      <Counter />
    </div>
  );
}

const app = document.getElementById('app');
if (app) render(<App />, app);
```

### Lifecycles

```tsx
import { Nexora, onInit } from '../../../../src';
import { fibonacci } from '../../utils';
import { fetchTodos, fetchUsers, Todos, Users } from './fetch-data';

export function OnInitSample() {
  const todos = onInit<Todos[]>(fetchTodos);
  const users = onInit<Users[]>(fetchUsers);
  const fibonacciResult = fibonacci(10);

  return (
    <div className='container'>
      <h2>OnInit</h2>
      <p>Todos Length: {todos ? todos.length : 'Loading...'}</p>
      <p>Users Length: {users ? users.length : 'Loading...'}</p>
      <p>Fibonacci Result: {fibonacciResult}</p>
    </div>
  );
}
```
