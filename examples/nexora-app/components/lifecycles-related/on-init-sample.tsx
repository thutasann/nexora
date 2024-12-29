import { freeze, Nexora, onInit } from '../../../../src';
import { fetchTodos, fetchUsers, Todos, Users } from './fetch-data';

function Item({ id, title, handleDelete }: { id: number; title: string; handleDelete: (id: number) => void }) {
  return (
    <div className='card w-full' key={id}>
      <span style={{ marginRight: '2rem' }}>
        ({id}) {title}
      </span>
      <button className='danger sm' onClick={() => handleDelete(id)}>
        delete
      </button>
    </div>
  );
}

const FreezedItem = freeze(Item);

export function OnInitSample() {
  const [todos, setTodos] = onInit<Todos[]>(fetchTodos);
  const [users, setUsers] = onInit<Users[]>(fetchUsers);

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className='container'>
      <h2>OnInit</h2>
      <p>Todos Length: {todos ? todos.length : 'Loading...'}</p>
      <p>Users Length: {users ? users.length : 'Loading...'}</p>
      <section style='display: flex; gap: 2rem; width: 100%; border: 1px solid #ccc; padding: 2rem;'>
        <div style='flex: 1'>
          {todos &&
            todos.map((todo) => <FreezedItem id={todo.id} title={todo.title} handleDelete={handleDeleteTodo} />)}
        </div>
        <div style='flex: 1'>
          {users && users.map((user) => <FreezedItem id={user.id} title={user.name} handleDelete={handleDeleteUser} />)}
        </div>
      </section>
    </div>
  );
}
