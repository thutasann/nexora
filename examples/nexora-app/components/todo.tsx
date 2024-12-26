import { createState, Nexora } from '../../../src';

/** TODO: not working properly */
export const Todo = () => {
  const [getTodos, setTodos] = createState<string[]>([]);
  const [getNewTodo, setNewTodo] = createState('');
  console.log('getNewTodo() -> ', getNewTodo());
  console.log('getTodos() -> ', getTodos());

  const addTodo = (e: Event) => {
    e.preventDefault();
    if (getNewTodo().trim()) {
      setTodos((prev) => [...prev, getNewTodo().trim()]);
      setNewTodo('');
    }
  };

  return (
    <section>
      <h2>Todo List</h2>

      <form onsubmit={addTodo}>
        <input
          type='text'
          value={getNewTodo()}
          onchange={(e: any) => setNewTodo(e.target.value)}
          placeholder='Add a new todo'
        />
        <button type='submit'>Add</button>
      </form>
    </section>
  );
};
