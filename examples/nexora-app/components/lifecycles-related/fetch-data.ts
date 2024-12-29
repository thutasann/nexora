export type Todos = any[];
export type Users = any[];

export async function fetchTodos() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
    cache: 'force-cache',
  });
  const json = await res.json();
  return json;
}

export async function fetchUsers() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users', {
    cache: 'force-cache',
  });
  const json = await res.json();
  return json;
}
