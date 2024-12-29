export type Todos = {
  id: number;
  title: string;
};

export type Users = {
  id: number;
  name: string;
};

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
