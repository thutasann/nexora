import { getInitResult, Nexora, onInit } from '../../../../src';
import { fetchTodos, fetchUsers } from './fetch-data';

export function OnInitSample() {
  onInit(fetchTodos);
  onInit(fetchUsers);

  const todos = getInitResult<any[]>(OnInitSample);
  const users = getInitResult<any[]>(OnInitSample);

  return (
    <div className='container'>
      <h2>OnInit (Todos)</h2>
      <p>Todos Length: {todos ? todos.length : 'Loading...'}</p>
      <p>Users Length: {users ? users.length : 'Loading...'}</p>
    </div>
  );
}
