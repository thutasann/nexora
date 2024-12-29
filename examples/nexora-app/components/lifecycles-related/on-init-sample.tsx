import { Nexora, onInit } from '../../../../src';
import { fetchTodos, fetchUsers } from './fetch-data';

type Todos = any[];
type Users = any[];

export function OnInitSample() {
  const todos = onInit<Todos[]>(fetchTodos);
  const users = onInit<Users[]>(fetchUsers);

  return (
    <div className='container'>
      <h2>OnInit</h2>
      <p>Todos Length: {todos ? todos.length : 'Loading...'}</p>
      <p>Users Length: {users ? users.length : 'Loading...'}</p>
    </div>
  );
}
