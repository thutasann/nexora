# Nexora: Modern Web Development Made Simple

A powerful yet lightweight JavaScript library that simplifies building modern web applications with a focus on performance and developer experience.

---

## 🚀 **Features**

- **Component-based:** Build encapsulated, reusable UI components that manage their own state and compose them to create complex user interfaces
- **Declarative:** Design simple views for each state in your application, and Nexora will efficiently update and render the right components when your data changes
- **Simple API:** Get started quickly with an intuitive API that follows modern JavaScript patterns and best practices
- **Reactive:** Use reactive state to manage data and automatically update the UI when the state changes
- **Performant Rendering:** Utilizes a virtual DOM to optimize rendering performance and minimize DOM manipulation
- **Lifecycle Hooks:** Simplified lifecycle methods for better developer experience

---

## 🔗 Quick Links

[![NPM Version](https://img.shields.io/npm/v/nexora.svg)](https://www.npmjs.com/package/nexora)

- 📦 [NPM Registry](https://www.npmjs.com/package/nexora)
- 💻 [GitHub Repository](https://github.com/thutasann/nexora)

---

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

- Simplified `onInit` lifecycle to perform async operations and return the result

```tsx
import { Nexora, onInit } from 'nexora';
import { fetchTodos, fetchUsers, Todos, Users } from './fetch-data';

export function OnInitSample() {
  const [todos, setTodos] = onInit<Todos[]>(fetchTodos);
  const [users, setUsers] = onInit<Users[]>(fetchUsers);

  /** handler to delete a todo */
  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  /** handler to delete a user */
  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className='container'>
      <p>Todos Length: {todos ? todos.length : 'Loading...'}</p>
      <p>Users Length: {users ? users.length : 'Loading...'}</p>
    </div>
  );
}
```
